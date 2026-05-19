// shareMedicalRecord.js

import {
  medicalRecords,
  patients,
  providers,
  sharingConsents,
  auditLogs
} from "./shareData.js";

function isPatient(user) {
  return user.role === "patient";
}

function validRecord(patientId, recordId) {
  return medicalRecords.some(
    r => r.recordId === recordId && r.patientId === patientId
  );
}

function providerExists(providerId) {
  return providers.some(p => p.providerId === providerId);
}

function isDuplicate(patientId, recordId, providerId) {
  return sharingConsents.some(c =>
    c.patientId === patientId &&
    c.recordId === recordId &&
    c.providerId === providerId
  );
}

function verifyOTP(code) {
  return code === "123456";
}

export function shareMedicalRecord(
  user,
  patientId,
  recordId,
  providerId,
  consent,
  otpCode,
  durationHours,
  digitalSignature
) {
  if (!user || !patientId || !recordId || !providerId) {
    return { status: "error", message: "Invalid input" };
  }

  if (!isPatient(user)) {
    return { status: "error", message: "Only patient can share" };
  }

  if (!providerExists(providerId)) {
    return { status: "error", message: "Provider not found" };
  }

  if (!validRecord(patientId, recordId)) {
    return { status: "error", message: "Invalid record" };
  }

  if (!verifyOTP(otpCode)) {
    return { status: "error", message: "OTP failed" };
  }

  if (!consent) {
    return { status: "error", message: "No consent" };
  }

  if (digitalSignature !== undefined) {
    const patient = patients.find(p => p.patientId === patientId);
    const expectedSignature = String(patient?.name || "").trim().toLowerCase();
    const submittedSignature = String(digitalSignature || "").trim().toLowerCase();

    if (!submittedSignature || submittedSignature !== expectedSignature) {
      return { status: "error", message: "Digital signature does not match patient name" };
    }
  }

  if (isDuplicate(patientId, recordId, providerId)) {
    return { status: "error", message: "Duplicate sharing" };
  }

  const consentRecord = {
    consentId: "C" + (sharingConsents.length + 1),
    patientId,
    recordId,
    providerId,
    consentStatus: "approved",
    digitalSignature: digitalSignature || null,
    consentedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + durationHours * 3600000)
  };

  sharingConsents.push(consentRecord);

  auditLogs.push({
    action: "SHARE_RECORD",
    user: user.username,
    recordId,
    providerId,
    digitalSignature: digitalSignature || null,
    time: new Date().toISOString()
  });

  return {
    status: "success",
    message: "Record shared",
    data: consentRecord
  };
}
