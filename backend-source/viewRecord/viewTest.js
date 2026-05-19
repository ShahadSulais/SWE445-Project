import {
  getAccessVerificationRequests,
  getViewRecordPatients,
  validateAccessRequestReason,
  viewMedicalRecord
} from "./viewMedicalRecord.js";

const doctor = { username: "DR-1040", role: "doctor" };
const receptionist = { username: "RC-1042", role: "receptionist" };

console.log("========== UC-08 TEST ==========\n");

// ✅ SUCCESS
console.log("✅ SUCCESS (Doctor views patient record):");
console.dir(
  viewMedicalRecord(doctor, "P1", "Check patient status", "123456"),
  { depth: null }
);

console.log("\nSUCCESS (All patient cards loaded from backend):");
console.table(
  getViewRecordPatients().map((patient) => ({
    patientId: patient.patientId,
    displayId: patient.displayId,
    name: patient.name,
    gender: patient.gender,
    age: patient.age
  }))
);

// ❌ RBAC FAIL
console.log("\n❌ RBAC FAIL (Receptionist blocked):");
console.dir(
  viewMedicalRecord(receptionist, "P1", "Trying access", "123456"),
  { depth: null }
);

// ❌ OTP FAIL
console.log("\n❌ OTP FAIL:");
console.dir(
  viewMedicalRecord(doctor, "P1", "Check", "000000"),
  { depth: null }
);

// ❌ PATIENT NOT FOUND
console.log("\n❌ PATIENT FAIL:");
console.dir(
  viewMedicalRecord(doctor, "P99", "Check", "123456"),
  { depth: null }
);

console.log("\nREQUEST ACCESS REASON SUCCESS:");
console.dir(validateAccessRequestReason("yes"), { depth: null });

console.log("\nREQUEST ACCESS REASON FAIL:");
console.dir(validateAccessRequestReason("no"), { depth: null });

console.log("\nACCESS VERIFICATION REQUEST LOG:");
console.table(
  getAccessVerificationRequests().map((request) => ({
    requestId: request.requestId,
    user: request.user,
    patientId: request.patientId,
    status: request.status
  }))
);

console.log("\n========== END ==========");
