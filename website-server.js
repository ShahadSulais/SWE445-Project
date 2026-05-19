const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const appointmentData = require("./backend-source/appointment/appointmentData");
const {
  PATIENT_BLOCKED_MESSAGE,
  getPatientRateLimitStatus,
  scheduleAppointment
} = require("./backend-source/appointment/scheduleAppointment");

const root = __dirname;
let port = Number(process.env.PORT) || 5500;
const viewRecordModulePromise = import(pathToFileURL(path.join(root, "backend-source/viewRecord/viewMedicalRecord.js")).href);
const shareRecordModulePromise = import(pathToFileURL(path.join(root, "backend-source/shareRecord/shareMedicalRecord.js")).href);
const shareRecordDataModulePromise = import(pathToFileURL(path.join(root, "backend-source/shareRecord/shareData.js")).href);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function normalizeAppointmentUser(user) {
  if (!user) {
    return null;
  }

  const roleMap = {
    patient: "Patient",
    receptionist: "Receptionist",
    doctor: "Doctor"
  };
  const normalizedRole = roleMap[user.role] || user.role;
  const backendUser = appointmentData.users.find((item) => item.role === normalizedRole);

  return {
    user_id: backendUser ? backendUser.user_id : user.user_id,
    username: user.username,
    role: normalizedRole
  };
}

function normalizeAppointmentPatient(patientId) {
  if (typeof patientId === "number") {
    return patientId;
  }

  const normalizedPatientId = String(patientId || "").trim().toUpperCase();
  const patientMap = {
    "PT-1029": 1029,
    P1: 1029,
    "PT-1101": 1101,
    P3: 1101
  };

  return patientMap[normalizedPatientId] || Number(normalizedPatientId.replace(/^PT-/, ""));
}

function normalizeAppointmentDoctor(doctor) {
  if (typeof doctor === "number") {
    return doctor;
  }

  if (Number.isFinite(Number(doctor))) {
    return Number(doctor);
  }

  const doctorText = String(doctor || "").toLowerCase();

  if (doctorText.includes("reem")) {
    return 202;
  }

  return 201;
}

function toAppointmentDateTime(value) {
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    return value;
  }

  const timeMatch = String(value).match(/(\d{1,2}):(\d{2})/);
  const monthMatch = String(value).match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})/i);

  if (!timeMatch || !monthMatch) {
    return value;
  }

  const monthIndex = new Date(`${monthMatch[1]} 1, 2000`).getMonth();
  const date = new Date(Number(monthMatch[3]), monthIndex, Number(monthMatch[2]), Number(timeMatch[1]), Number(timeMatch[2]));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

function getDoctorAvailability(doctor) {
  const doctorId = normalizeAppointmentDoctor(doctor);
  const doctorRecord = appointmentData.doctors.find((item) => item.doctor_id === doctorId);

  if (!doctorRecord) {
    return {
      status: "error",
      message: "Doctor does not exist."
    };
  }

  if (!doctorRecord.available) {
    return {
      status: "error",
      message: "Doctor is unavailable."
    };
  }

  return {
    status: "success",
    message: "Doctor is available.",
    doctor: doctorRecord
  };
}

function validateAppointmentPatient(patientId, user) {
  const normalizedPatientId = normalizeAppointmentPatient(patientId);
  const normalizedUser = normalizeAppointmentUser(user);
  const patient = appointmentData.patients.find((item) => item.patient_id === normalizedPatientId);

  if (!patient) {
    return {
      status: "error",
      message: "Patient does not exist."
    };
  }

  const patientRateLimit = getPatientRateLimitStatus(normalizedPatientId);

  if (patientRateLimit.blocked) {
    if (normalizedUser?.user_id && patientRateLimit.blockedByUserId === normalizedUser.user_id) {
      return {
        status: "success",
        message: "Patient verified.",
        patient
      };
    }

    return {
      status: "error",
      message: PATIENT_BLOCKED_MESSAGE,
      patientBlocked: true,
      retryAfterSeconds: patientRateLimit.retryAfterSeconds,
      patient
    };
  }

  return {
    status: "success",
    message: "Patient verified.",
    patient
  };
}

function normalizeViewRecordPatient(patientId) {
  const patientMap = {
    "PT-1029": "P1",
    "PT-1027": "P2",
    "PT-1101": "P3",
    "PT-1025": "P4",
    "PT-1024": "P5"
  };

  return patientMap[patientId] || patientId;
}

function normalizeShareRecordPatient(patientId) {
  const patientMap = {
    "PT-1029": "P1",
    "PT-1027": "P2",
    "PT-1101": "P3",
    "PT-1025": "P4",
    "PT-1024": "P5"
  };

  return patientMap[patientId] || patientId || "P1";
}

function toShareDurationHours(duration) {
  if (typeof duration === "number") {
    return duration;
  }

  const durationMap = {
    "1h": 1,
    "24h": 24,
    "7d": 168
  };

  return durationMap[duration] || Number(duration) || 24;
}

function handleRequest(request, response) {
  const parsedUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (parsedUrl.pathname === "/api/appointment-data" && request.method === "GET") {
    sendJson(response, 200, appointmentData);
    return;
  }

  if (parsedUrl.pathname === "/api/appointment-doctor-availability" && request.method === "GET") {
    sendJson(response, 200, getDoctorAvailability(parsedUrl.searchParams.get("doctor")));
    return;
  }

  if (parsedUrl.pathname === "/api/appointment-patient-validation" && request.method === "GET") {
    let user = null;

    try {
      user = JSON.parse(parsedUrl.searchParams.get("user") || "null");
    } catch (error) {
      user = null;
    }

    sendJson(response, 200, validateAppointmentPatient(parsedUrl.searchParams.get("patientId"), user));
    return;
  }

  if (parsedUrl.pathname === "/api/schedule-appointment" && request.method === "POST") {
    readJsonBody(request)
      .then((payload) => {
        const result = scheduleAppointment(
          normalizeAppointmentUser(payload.user),
          normalizeAppointmentPatient(payload.patientId),
          normalizeAppointmentDoctor(payload.doctorId),
          toAppointmentDateTime(payload.appointmentDateTime),
          payload.reason,
          payload.authorizationPin
        );

        sendJson(response, 200, {
          ...result,
          status: result.success ? "success" : "error"
        });
      })
      .catch(() => {
        sendJson(response, 400, {
          status: "error",
          message: "Invalid request body."
        });
      });
    return;
  }

  if (parsedUrl.pathname === "/api/view-medical-record" && request.method === "POST") {
    readJsonBody(request)
      .then(async (payload) => {
        const { viewMedicalRecord } = await viewRecordModulePromise;
        const result = viewMedicalRecord(
          payload.user,
          normalizeViewRecordPatient(payload.patientId),
          payload.reason,
          payload.otp
        );

        sendJson(response, 200, {
          message: result.status === "success" ? "Medical record access granted." : result.message,
          ...result
        });
      })
      .catch(() => {
        sendJson(response, 400, {
          status: "error",
          message: "Invalid request body."
        });
      });
    return;
  }

  if (parsedUrl.pathname === "/api/view-record-patients" && request.method === "GET") {
    viewRecordModulePromise
      .then(({ getViewRecordPatients }) => {
        sendJson(response, 200, {
          status: "success",
          patients: getViewRecordPatients()
        });
      })
      .catch(() => {
        sendJson(response, 500, {
          status: "error",
          message: "Unable to load patients."
        });
      });
    return;
  }

  if (parsedUrl.pathname === "/api/request-record-access" && request.method === "POST") {
    readJsonBody(request)
      .then(async (payload) => {
        const { validateAccessRequestReason } = await viewRecordModulePromise;
        const result = validateAccessRequestReason(payload.reason);

        sendJson(response, 200, result);
      })
      .catch(() => {
        sendJson(response, 400, {
          status: "error",
          message: "Invalid request body."
        });
      });
    return;
  }

  if (parsedUrl.pathname === "/api/share-record-data" && request.method === "GET") {
    shareRecordDataModulePromise
      .then(({ patients, providers, medicalRecords, sharingConsents, auditLogs }) => {
        const patientId = normalizeShareRecordPatient(parsedUrl.searchParams.get("patientId"));

        sendJson(response, 200, {
          status: "success",
          patient: patients.find((patient) => patient.patientId === patientId) || null,
          providers,
          medicalRecords: medicalRecords.filter((record) => record.patientId === patientId),
          sharingConsents,
          auditLogs
        });
      })
      .catch(() => {
        sendJson(response, 500, {
          status: "error",
          message: "Unable to load sharing data."
        });
      });
    return;
  }

  if (parsedUrl.pathname === "/api/share-medical-record" && request.method === "POST") {
    readJsonBody(request)
      .then(async (payload) => {
        const { shareMedicalRecord } = await shareRecordModulePromise;
        const patientId = normalizeShareRecordPatient(payload.patientId);
        const recordIds = Array.isArray(payload.recordIds) && payload.recordIds.length
          ? payload.recordIds
          : [payload.recordId];
        const durationHours = toShareDurationHours(payload.durationHours || payload.duration);
        const successfulShares = [];

        for (const recordId of recordIds) {
          const result = shareMedicalRecord(
            payload.user,
            patientId,
            recordId,
            payload.providerId,
            Boolean(payload.consent),
            payload.otpCode,
            durationHours,
            payload.digitalSignature
          );

          if (result.status !== "success") {
            sendJson(response, 200, result);
            return;
          }

          successfulShares.push(result.data);
        }

        sendJson(response, 200, {
          status: "success",
          message: "Record shared",
          data: successfulShares[successfulShares.length - 1],
          sharedRecords: successfulShares
        });
      })
      .catch(() => {
        sendJson(response, 400, {
          status: "error",
          message: "Invalid request body."
        });
      });
    return;
  }

  const urlPath = request.url === "/" ? "/index.html" : request.url;
  const filePath = path.join(root, decodeURIComponent(urlPath.split("?")[0]));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "text/plain; charset=utf-8"
    });
    response.end(content);
  });
}

function startServer(nextPort) {
  const server = http.createServer(handleRequest);

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const fallbackPort = nextPort + 1;
      console.log(`Port ${nextPort} is already in use. Trying http://localhost:${fallbackPort}`);
      port = fallbackPort;
      startServer(fallbackPort);
      return;
    }

    throw error;
  });

  server.listen(nextPort, "127.0.0.1", () => {
    console.log(`Website running at http://localhost:${nextPort}`);
  });
}

startServer(port);
