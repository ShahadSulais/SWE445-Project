(function () {
  const appointmentUsers = [
    { user_id: 1, username: "patient1", role: "Patient" },
    { user_id: 2, username: "receptionist1", role: "Receptionist" },
    { user_id: 3, username: "doctor1", role: "Doctor" },
    { user_id: 4, username: "doctor2", role: "Doctor" },
    { user_id: 5, username: "patient3", role: "Patient" }
  ];

  const appointmentPatients = [
    { patient_id: 1029, user_id: 1, full_name: "Nora Alkuwaihes" },
    { patient_id: 1101, user_id: 5, full_name: "Ali Sulais" }
  ];

  const appointmentDoctors = [
    { doctor_id: 201, user_id: 3, full_name: "Dr. Shahad Sulais", specialization: "Cardiology", available: true },
    { doctor_id: 202, user_id: 4, full_name: "Dr. Reem Abdelgawad", specialization: "Dermatology", available: false }
  ];

  const appointments = [
    {
      appointment_id: 1,
      patient_id: 1029,
      doctor_id: 201,
      scheduled_by_user_id: 2,
      appointment_datetime: "2026-04-20T10:00:00",
      reason: "Regular checkup",
      status: "Confirmed"
    }
  ];

  const appointmentRequestLogs = [
    {
      request_log_id: 1,
      user_id: 2,
      patient_id: 1029,
      action_type: "Schedule Appointment",
      outcome_status: "Success"
    }
  ];

  const viewPatients = [
    { patientId: "P1", name: "Nora Alkuwaihes" },
    { patientId: "P2", name: "Ali Hassan" },
    { patientId: "P3", name: "Sara Ahmed" }
  ];

  const viewMedicalRecords = [
    { recordId: "R1", patientId: "P1", type: "Medical History", data: "Hypertension" },
    { recordId: "R2", patientId: "P1", type: "Lab Results", data: "Normal" },
    { recordId: "R3", patientId: "P2", type: "Medication", data: "Metformin" }
  ];

  const prescriptions = [
    { recordId: "R1", medication: "Amlodipine" }
  ];

  const testResults = [
    { recordId: "R2", result: "Blood test normal" }
  ];

  const viewAuditLogs = [];

  const sharePatients = [
    { patientId: "P1", name: "Nora Alkuwaihes" },
    { patientId: "P2", name: "Ali Hassan" },
    { patientId: "P3", name: "Sara Ahmed" }
  ];

  const providers = [
    { providerId: "D1", name: "Dr. Ahmed", type: "Cardiology" },
    { providerId: "D2", name: "Dr. Fatima", type: "Dermatology" },
    { providerId: "D3", name: "Dr. Khalid", type: "General Medicine" }
  ];

  const shareMedicalRecords = [
    { recordId: "R1", patientId: "P1", type: "Medical History", data: "Hypertension, Asthma" },
    { recordId: "R2", patientId: "P1", type: "Lab Results", data: "Blood Test Normal" },
    { recordId: "R3", patientId: "P2", type: "Medication", data: "Metformin" },
    { recordId: "R4", patientId: "P3", type: "Lab Results", data: "Cholesterol High" }
  ];

  const sharingConsents = [
    {
      consentId: "C1",
      patientId: "P2",
      recordId: "R3",
      providerId: "D1",
      consentStatus: "approved",
      consentedAt: "2026-05-01T10:00:00Z",
      expiresAt: "2026-05-02T10:00:00Z"
    }
  ];

  const shareAuditLogs = [
    {
      action: "SHARE_RECORD",
      user: "ali",
      recordId: "R3",
      providerId: "D1",
      time: "2026-05-01T10:00:00Z"
    }
  ];

  const rateLimitStore = {};
  const patientRateLimitStore = {};
  const appointmentRateLimitWindow = 10 * 60 * 1000;
  const appointmentMaxRequests = 5;
  const patientBlockedMessage = "This patient is temporarily blocked from making appointments. Please try again later.";
  const uiPatientMap = {
    "PT-1029": "P1",
    "PT-1027": "P2",
    "PT-1101": "P3"
  };

  function toResult(result) {
    return {
      ...result,
      status: result.success || result.status === "success" ? "success" : "error"
    };
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
    const existing = appointmentUsers.find((item) => item.role === normalizedRole);

    return {
      user_id: existing ? existing.user_id : user.user_id,
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

  function normalizeDoctorId(doctor) {
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

  window.checkAppointmentDoctorAvailability = function checkAppointmentDoctorAvailability(doctor) {
    const backendDoctorId = normalizeDoctorId(doctor);
    const doctorRecord = appointmentDoctors.find((item) => item.doctor_id === backendDoctorId);

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
  };

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

    while (date <= new Date()) {
      date.setFullYear(date.getFullYear() + 1);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  function logAppointmentRequest(userId, patientId, outcomeStatus) {
    appointmentRequestLogs.push({
      request_log_id: appointmentRequestLogs.length + 1,
      user_id: userId,
      patient_id: patientId,
      action_type: "Schedule Appointment",
      request_time: new Date().toISOString(),
      outcome_status: outcomeStatus
    });
  }

  function checkAppointmentRateLimit(userId) {
    const now = Date.now();

    if (!rateLimitStore[userId]) {
      rateLimitStore[userId] = [];
    }

    rateLimitStore[userId] = rateLimitStore[userId].filter((requestTime) => now - requestTime < appointmentRateLimitWindow);

    if (rateLimitStore[userId].length >= appointmentMaxRequests) {
      return false;
    }

    rateLimitStore[userId].push(now);
    return true;
  }

  function getPatientAppointmentRateLimitStatus(patientId) {
    const now = Date.now();

    if (!patientRateLimitStore[patientId]) {
      patientRateLimitStore[patientId] = [];
    }

    patientRateLimitStore[patientId] = patientRateLimitStore[patientId].filter((requestTime) => {
      return now - requestTime < appointmentRateLimitWindow;
    });

    const oldestRequest = patientRateLimitStore[patientId][0] || now;

    return {
      blocked: patientRateLimitStore[patientId].length >= appointmentMaxRequests,
      remainingAttempts: Math.max(appointmentMaxRequests - patientRateLimitStore[patientId].length, 0),
      retryAfterSeconds: Math.max(0, Math.ceil((appointmentRateLimitWindow - (now - oldestRequest)) / 1000))
    };
  }

  function checkPatientAppointmentRateLimit(patientId) {
    const status = getPatientAppointmentRateLimitStatus(patientId);

    if (status.blocked) {
      return status;
    }

    patientRateLimitStore[patientId].push(Date.now());

    return {
      ...getPatientAppointmentRateLimitStatus(patientId),
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

    if (Number.isNaN(appointmentDate.getTime())) {
      return "Invalid appointment date and time.";
    }

    if (appointmentDate <= new Date()) {
      return "Appointment date and time must be in the future.";
    }

    return null;
  }

  window.scheduleAppointment = function scheduleAppointment(user, patientId, doctorId, appointmentDateTime, reason) {
    const backendUser = normalizeAppointmentUser(user);
    const backendPatientId = normalizeAppointmentPatient(patientId);
    const backendDoctorId = normalizeDoctorId(doctorId);
    const backendDateTime = toAppointmentDateTime(appointmentDateTime);

    if (!backendUser) {
      logAppointmentRequest(null, backendPatientId, "Failed - Not Authenticated");
      return toResult({ success: false, message: "User must be logged in." });
    }

    if (backendUser.role !== "Patient" && backendUser.role !== "Receptionist") {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Unauthorized Role");
      return toResult({ success: false, message: "Access denied. Only patients or receptionists can schedule appointments." });
    }

    const validationError = validateAppointmentData(backendPatientId, backendDoctorId, backendDateTime, reason);

    if (validationError) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Invalid Input");
      return toResult({ success: false, message: validationError });
    }

    if (!appointmentPatients.some((patient) => patient.patient_id === backendPatientId)) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Invalid Patient");
      return toResult({ success: false, message: "Patient does not exist." });
    }

    const doctor = appointmentDoctors.find((item) => item.doctor_id === backendDoctorId);

    if (!doctor) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Invalid Doctor");
      return toResult({ success: false, message: "Doctor does not exist." });
    }

    if (!doctor.available) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Doctor Unavailable");
      return toResult({ success: false, message: "Doctor is unavailable." });
    }

    const duplicateAppointment = appointments.find((appointment) => {
      return appointment.doctor_id === backendDoctorId && appointment.appointment_datetime === backendDateTime;
    });

    if (duplicateAppointment) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Time Slot Booked");
      return toResult({ success: false, message: "Appointment time already booked." });
    }

    const patientRateLimit = checkPatientAppointmentRateLimit(backendPatientId);

    if (patientRateLimit.blocked) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Patient Appointment Blocked");
      return toResult({
        success: false,
        message: patientBlockedMessage,
        patientBlocked: true,
        retryAfterSeconds: patientRateLimit.retryAfterSeconds
      });
    }

    if (!checkAppointmentRateLimit(backendUser.user_id)) {
      logAppointmentRequest(backendUser.user_id, backendPatientId, "Failed - Rate Limit Exceeded");
      return toResult({ success: false, message: "Too many appointment requests. Please wait before trying again." });
    }

    const newAppointment = {
      appointment_id: appointments.length + 1,
      patient_id: backendPatientId,
      doctor_id: backendDoctorId,
      scheduled_by_user_id: backendUser.user_id,
      appointment_datetime: backendDateTime,
      reason,
      status: "Confirmed",
      created_at: new Date().toISOString()
    };

    appointments.push(newAppointment);
    logAppointmentRequest(backendUser.user_id, backendPatientId, "Success");

    return toResult({
      success: true,
      message: "Appointment scheduled successfully.",
      appointment: newAppointment
    });
  };

  function mapPatientId(patientId) {
    return uiPatientMap[patientId] || patientId;
  }

  function logViewAction(user, patientId, result) {
    viewAuditLogs.push({
      action: "VIEW_RECORD",
      user: user.username,
      patientId,
      result,
      time: new Date().toISOString()
    });
  }

  window.viewMedicalRecord = function viewMedicalRecord(user, patientId, reason, otp) {
    const backendPatientId = mapPatientId(patientId);

    if (!user || !backendPatientId || !reason || !otp) {
      return { status: "error", message: "Invalid input" };
    }

    if (user.role !== "doctor") {
      logViewAction(user, backendPatientId, "DENIED_ROLE");
      return { status: "error", message: "Access denied (RBAC)" };
    }

    if (!viewPatients.some((patient) => patient.patientId === backendPatientId)) {
      logViewAction(user, backendPatientId, "PATIENT_NOT_FOUND");
      return { status: "error", message: "Patient not found" };
    }

    if (reason.length < 3) {
      logViewAction(user, backendPatientId, "INVALID_REASON");
      return { status: "error", message: "Invalid access reason" };
    }

    if (otp !== "123456") {
      logViewAction(user, backendPatientId, "OTP_FAILED");
      return { status: "error", message: "OTP failed" };
    }

    const records = viewMedicalRecords.filter((record) => record.patientId === backendPatientId);
    const pres = prescriptions.filter((prescription) => records.some((record) => record.recordId === prescription.recordId));
    const tests = testResults.filter((test) => records.some((record) => record.recordId === test.recordId));

    logViewAction(user, backendPatientId, "SUCCESS");

    return {
      status: "success",
      message: "Medical record access granted.",
      data: { records, prescriptions: pres, testResults: tests }
    };
  };

  function normalizeProviderId(providerId) {
    const providerMap = {
      "DR-8829": "D1",
      "DR-4412": "D2",
      "DR-9921": "D3",
      "FAC-1021": "D1",
      "FAC-2045": "D2",
      "FAC-3302": "D3"
    };

    return providerMap[providerId] || providerId || "D1";
  }

  function durationToHours(duration) {
    if (typeof duration === "number") {
      return duration;
    }

    if (duration === "1h") {
      return 1;
    }

    if (duration === "7d") {
      return 168;
    }

    return 24;
  }

  window.shareMedicalRecord = function shareMedicalRecord(user, patientId, recordId, providerId, consent, otpCode, durationHours, digitalSignature) {
    const backendPatientId = mapPatientId(patientId);
    const backendRecordId = recordId || "R1";
    const backendProviderId = normalizeProviderId(providerId);
    const backendDurationHours = durationToHours(durationHours);

    if (!user || !backendPatientId || !backendRecordId || !backendProviderId) {
      return { status: "error", message: "Invalid input" };
    }

    if (user.role !== "patient") {
      return { status: "error", message: "Only patient can share" };
    }

    if (!providers.some((provider) => provider.providerId === backendProviderId)) {
      return { status: "error", message: "Provider not found" };
    }

    if (!shareMedicalRecords.some((record) => record.recordId === backendRecordId && record.patientId === backendPatientId)) {
      return { status: "error", message: "Invalid record" };
    }

    if (otpCode !== "123456") {
      return { status: "error", message: "OTP failed" };
    }

    if (!consent) {
      return { status: "error", message: "No consent" };
    }

    if (digitalSignature !== undefined) {
      const expectedSignature = "Nora Alkuwaihes";
      const submittedSignature = String(digitalSignature || "").trim().toLowerCase();

      if (!submittedSignature || submittedSignature !== expectedSignature.toLowerCase()) {
        return { status: "error", message: "Digital signature does not match patient name" };
      }
    }

    const duplicate = sharingConsents.some((sharingConsent) => {
      return sharingConsent.patientId === backendPatientId
        && sharingConsent.recordId === backendRecordId
        && sharingConsent.providerId === backendProviderId;
    });

    if (duplicate) {
      return { status: "error", message: "Duplicate sharing" };
    }

    const consentRecord = {
      consentId: `C${sharingConsents.length + 1}`,
      patientId: backendPatientId,
      recordId: backendRecordId,
      providerId: backendProviderId,
      consentStatus: "approved",
      digitalSignature: digitalSignature || null,
      consentedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + backendDurationHours * 3600000)
    };

    sharingConsents.push(consentRecord);
    shareAuditLogs.push({
      action: "SHARE_RECORD",
      user: user.username,
      recordId: backendRecordId,
      providerId: backendProviderId,
      digitalSignature: digitalSignature || null,
      time: new Date().toISOString()
    });

    return {
      status: "success",
      message: "Record shared",
      data: consentRecord
    };
  };

  window.backendStore = {
    appointments,
    appointmentRequestLogs,
    viewAuditLogs,
    sharingConsents,
    shareAuditLogs
  };

  window.appointmentBackendData = {
    users: appointmentUsers,
    patients: appointmentPatients,
    doctors: appointmentDoctors,
    appointments,
    appointmentRequestLogs
  };
})();
