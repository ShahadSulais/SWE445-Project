const {
  patients,
  doctors,
  appointments,
  appointmentRequestLogs
} = require("./appointmentData");

const rateLimitStore = {};
const patientRateLimitStore = {};
const patientBlockStore = {};
const VALID_APPOINTMENT_AUTHORIZATION_PIN = "1234";
const APPOINTMENT_RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const APPOINTMENT_MAX_REQUESTS = 5;
const PATIENT_BLOCKED_MESSAGE = "This patient is temporarily blocked from making appointments. Please try again later.";

function logRequest(userId, patientId, outcomeStatus) {
  appointmentRequestLogs.push({
    request_log_id: appointmentRequestLogs.length + 1,
    user_id: userId,
    patient_id: patientId,
    action_type: "Schedule Appointment",
    request_time: new Date().toISOString(),
    outcome_status: outcomeStatus
  });
}

function checkRateLimit(userId) {
  const now = Date.now();

  if (!rateLimitStore[userId]) {
    rateLimitStore[userId] = [];
  }

  rateLimitStore[userId] = rateLimitStore[userId].filter(
    requestTime => now - requestTime < APPOINTMENT_RATE_LIMIT_WINDOW
  );

  if (rateLimitStore[userId].length >= APPOINTMENT_MAX_REQUESTS) {
    return false;
  }

  rateLimitStore[userId].push(now);
  return true;
}

function getPatientRateLimitStatus(patientId) {
  const now = Date.now();

  if (!patientRateLimitStore[patientId]) {
    patientRateLimitStore[patientId] = [];
  }

  patientRateLimitStore[patientId] = patientRateLimitStore[patientId].filter(
    requestTime => now - requestTime < APPOINTMENT_RATE_LIMIT_WINDOW
  );

  if (patientBlockStore[patientId] && now >= patientBlockStore[patientId].blockedUntil) {
    delete patientBlockStore[patientId];
  }

  const oldestRequest = patientRateLimitStore[patientId][0] || now;
  const retryAfterSeconds = Math.max(
    0,
    Math.ceil((APPOINTMENT_RATE_LIMIT_WINDOW - (now - oldestRequest)) / 1000)
  );

  return {
    blocked: patientRateLimitStore[patientId].length >= APPOINTMENT_MAX_REQUESTS,
    blockedByUserId: patientBlockStore[patientId]?.blockedByUserId || null,
    remainingAttempts: Math.max(APPOINTMENT_MAX_REQUESTS - patientRateLimitStore[patientId].length, 0),
    retryAfterSeconds
  };
}

function checkPatientRateLimit(patientId, userId) {
  const status = getPatientRateLimitStatus(patientId);

  if (status.blocked) {
    if (!patientBlockStore[patientId]) {
      patientBlockStore[patientId] = {
        blockedByUserId: userId,
        blockedUntil: Date.now() + status.retryAfterSeconds * 1000
      };
    }

    return {
      ...status,
      blockedByUserId: patientBlockStore[patientId].blockedByUserId
    };
  }

  if (!checkRateLimit(userId)) {
    return {
      userBlocked: true,
      blocked: false,
      message: "Too many appointment requests. Please wait before trying again."
    };
  }

  const now = Date.now();
  patientRateLimitStore[patientId].push(now);

  if (patientRateLimitStore[patientId].length >= APPOINTMENT_MAX_REQUESTS) {
    patientBlockStore[patientId] = {
      blockedByUserId: userId,
      blockedUntil: now + APPOINTMENT_RATE_LIMIT_WINDOW
    };
  }

  if (patientRateLimitStore[patientId].length > APPOINTMENT_MAX_REQUESTS) {
    return status;
  }

  return {
    ...getPatientRateLimitStatus(patientId),
    blocked: false
  };
}

function validateAppointmentData(patientId, doctorId, appointmentDateTime, reason) {
  if (!patientId || !doctorId || !appointmentDateTime || !reason) {
    return "All appointment fields are required.";
  }

  if (reason.length < 3) {
    return "Reason for visit is too short.";
  }

  const appointmentDate = new Date(appointmentDateTime);

  if (isNaN(appointmentDate.getTime())) {
    return "Invalid appointment date and time.";
  }

  if (appointmentDate <= new Date()) {
    return "Appointment date and time must be in the future.";
  }

  return null;
}

function validateAuthorizationPin(authorizationPin) {
  return authorizationPin === VALID_APPOINTMENT_AUTHORIZATION_PIN;
}

function scheduleAppointment(user, patientId, doctorId, appointmentDateTime, reason, authorizationPin) {
  if (!user) {
    logRequest(null, patientId, "Failed - Not Authenticated");
    return {
      success: false,
      message: "User must be logged in."
    };
  }

  if (user.role !== "Patient" && user.role !== "Receptionist") {
    logRequest(user.user_id, patientId, "Failed - Unauthorized Role");
    return {
      success: false,
      message: "Access denied. Only patients or receptionists can schedule appointments."
    };
  }

  if (!validateAuthorizationPin(authorizationPin)) {
    logRequest(user.user_id, patientId, "Failed - Invalid Authorization PIN");
    return {
      success: false,
      message: "Invalid authorization PIN."
    };
  }

  const validationError = validateAppointmentData(
    patientId,
    doctorId,
    appointmentDateTime,
    reason
  );

  if (validationError) {
    logRequest(user.user_id, patientId, "Failed - Invalid Input");
    return {
      success: false,
      message: validationError
    };
  }

  const patient = patients.find(p => p.patient_id === patientId);

  if (!patient) {
    logRequest(user.user_id, patientId, "Failed - Invalid Patient");
    return {
      success: false,
      message: "Patient does not exist."
    };
  }

  const doctor = doctors.find(d => d.doctor_id === doctorId);

  if (!doctor) {
    logRequest(user.user_id, patientId, "Failed - Invalid Doctor");
    return {
      success: false,
      message: "Doctor does not exist."
    };
  }

  if (!doctor.available) {
    logRequest(user.user_id, patientId, "Failed - Doctor Unavailable");
    return {
      success: false,
      message: "Doctor is unavailable."
    };
  }

  const duplicateAppointment = appointments.find(
    appointment =>
      appointment.doctor_id === doctorId &&
      appointment.appointment_datetime === appointmentDateTime
  );

  if (duplicateAppointment) {
    logRequest(user.user_id, patientId, "Failed - Time Slot Booked");
    return {
      success: false,
      message: "Appointment time already booked."
    };
  }

  const patientRateLimit = checkPatientRateLimit(patientId, user.user_id);

  if (patientRateLimit.blocked) {
    if (patientRateLimit.blockedByUserId === user.user_id) {
      logRequest(user.user_id, patientId, "Failed - Rate Limit Exceeded");
      return {
        success: false,
        message: "Too many appointment requests. Please wait before trying again."
      };
    }

    logRequest(user.user_id, patientId, "Failed - Patient Appointment Blocked");
    return {
      success: false,
      message: PATIENT_BLOCKED_MESSAGE,
      patientBlocked: true,
      retryAfterSeconds: patientRateLimit.retryAfterSeconds
    };
  }

  if (patientRateLimit.userBlocked) {
    logRequest(user.user_id, patientId, "Failed - Rate Limit Exceeded");
    return {
      success: false,
      message: patientRateLimit.message
    };
  }

  const newAppointment = {
    appointment_id: appointments.length + 1,
    patient_id: patientId,
    doctor_id: doctorId,
    scheduled_by_user_id: user.user_id,
    appointment_datetime: appointmentDateTime,
    reason,
    status: "Confirmed",
    created_at: new Date().toISOString()
  };

  appointments.push(newAppointment);

  logRequest(user.user_id, patientId, "Success");

  return {
    success: true,
    message: "Appointment scheduled successfully.",
    appointment: newAppointment
  };
}

module.exports = {
  getPatientRateLimitStatus,
  PATIENT_BLOCKED_MESSAGE,
  validateAuthorizationPin,
  scheduleAppointment
};
