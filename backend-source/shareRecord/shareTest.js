// shareTest.js

import { shareMedicalRecord } from "./shareMedicalRecord.js";

const user = { username: "nora", role: "patient" };

console.log("========== UC-11 TESTING ==========\n");

//  SUCCESS CASE
console.log(" SUCCESS (valid sharing):");
console.log(
  shareMedicalRecord(user, "P1", "R1", "DR-8829", true, "123456", 24)
);


//  NO CONSENT
console.log("\n NO CONSENT:");
console.log(
  shareMedicalRecord(user, "P1", "R2", "DR-4412", false, "123456", 24)
);


//  WRONG OTP
console.log("\n WRONG OTP:");
console.log(
  shareMedicalRecord(user, "P1", "R1", "DR-8829", true, "000000", 24)
);


//  INVALID RECORD (not owned or doesn't exist)
console.log("\n INVALID RECORD:");
console.log(
  shareMedicalRecord(user, "P1", "R99", "DR-8829", true, "123456", 24)
);


//  DUPLICATE SHARING (AK constraint)
console.log("\n DUPLICATE SHARING:");
console.log(
  shareMedicalRecord(user, "P1", "R1", "DR-8829", true, "123456", 24)
);


console.log("\n========== END ==========");
