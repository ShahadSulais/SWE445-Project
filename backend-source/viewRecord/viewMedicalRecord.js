import {
  patients,
  medicalRecords,
  prescriptions,
  testResults,
  auditLogs,
  accessVerificationRequests
} from "./viewData.js";

const VALID_ACCESS_CODE = "123456";

// MIT-03: RBAC
function isDoctor(user) {
  return user.role === "doctor";
}

// check patient exists
function patientExists(patientId) {
  return patients.some(p => p.patientId === patientId);
}

function getPatient(patientId) {
  return patients.find(p => p.patientId === patientId);
}

// OTP
function verifyOTP(code) {
  return code === VALID_ACCESS_CODE;
}

// log action
function logAction(user, patientId, result) {
  auditLogs.push({
    action: "VIEW_RECORD",
    user: user.username,
    patientId,
    result,
    time: new Date().toISOString()
  });
}

function logAccessVerification(user, patientId, reason, result) {
  accessVerificationRequests.push({
    requestId: "AV" + (accessVerificationRequests.length + 1),
    user: user?.username || "unknown",
    role: user?.role || "unknown",
    patientId,
    reason,
    status: result,
    requestedAt: new Date().toISOString()
  });
}

export function validateAccessRequestReason(reason) {
  if (!reason || reason.trim().length < 3) {
    return { status: "error", message: "Invalid access reason" };
  }

  return {
    status: "success",
    message: "Access authorization request submitted"
  };
}

export function getViewRecordPatients() {
  return patients;
}

export function getAccessVerificationRequests() {
  return accessVerificationRequests;
}

export function viewMedicalRecord(user, patientId, reason, otp) {

  // validation
  if (!user || !patientId || !reason || !otp) {
    logAccessVerification(user, patientId, reason, "INVALID_INPUT");
    return { status: "error", message: "Invalid input" };
  }

  // RBAC
  if (!isDoctor(user)) {
    logAction(user, patientId, "DENIED_ROLE");
    logAccessVerification(user, patientId, reason, "DENIED_ROLE");
    return { status: "error", message: "Access denied (RBAC)" };
  }

  // patient check
  if (!patientExists(patientId)) {
    logAction(user, patientId, "PATIENT_NOT_FOUND");
    logAccessVerification(user, patientId, reason, "PATIENT_NOT_FOUND");
    return { status: "error", message: "Patient not found" };
  }

  // reason check
  if (validateAccessRequestReason(reason).status !== "success") {
    logAction(user, patientId, "INVALID_REASON");
    logAccessVerification(user, patientId, reason, "INVALID_REASON");
    return { status: "error", message: "Invalid access reason" };
  }

  // OTP check
  if (!verifyOTP(otp)) {
    logAction(user, patientId, "OTP_FAILED");
    logAccessVerification(user, patientId, reason, "OTP_FAILED");
    return { status: "error", message: "OTP failed" };
  }

  // fetch data
  const records = medicalRecords.filter(r => r.patientId === patientId);
  const pres = prescriptions.filter(p =>
    records.some(r => r.recordId === p.recordId)
  );
  const tests = testResults.filter(t =>
    records.some(r => r.recordId === t.recordId)
  );

  logAction(user, patientId, "SUCCESS");
  logAccessVerification(user, patientId, reason, "APPROVED");

  return {
    status: "success",
    accessStatus: "approved",
    message: "Medical record access granted.",
    data: {
      patient: getPatient(patientId),
      records,
      prescriptions: pres,
      testResults: tests
    }
  };
}
