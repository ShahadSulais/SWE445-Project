const { users, appointments, appointmentRequestLogs } = require("./appointmentData");
const { scheduleAppointment } = require("./scheduleAppointment");

const patientUser = users[0];
const receptionistUser = users[1];
const doctorUser = users[2];
const validationUser = { user_id: 10, username: "validation_receptionist", role: "Receptionist" };
const rateLimitUser = { user_id: 11, username: "rate_limit_patient", role: "Patient" };
const validPatientId = 1029;
const blockedPatientId = 1101;
const availableDoctorId = 201;
const unavailableDoctorId = 202;
const validAuthorizationPin = "1234";

console.log("TEST 1: Successful appointment");
console.log(
  scheduleAppointment(
    receptionistUser,
    validPatientId,
    availableDoctorId,
    "2027-04-21T10:00:00",
    "Regular checkup",
    validAuthorizationPin
  )
);

console.log("\nTEST 2: Doctor unavailable");
console.log(
  scheduleAppointment(
    receptionistUser,
    validPatientId,
    unavailableDoctorId,
    "2027-04-21T11:00:00",
    "Skin rash",
    validAuthorizationPin
  )
);

console.log("\nTEST 3: Duplicate appointment time");
console.log(
  scheduleAppointment(
    receptionistUser,
    validPatientId,
    availableDoctorId,
    "2027-04-21T10:00:00",
    "Follow up",
    validAuthorizationPin
  )
);

console.log("\nTEST 4: Unauthorized role");
console.log(
  scheduleAppointment(
    doctorUser,
    validPatientId,
    availableDoctorId,
    "2027-04-22T10:00:00",
    "Checkup",
    validAuthorizationPin
  )
);

console.log("\nTEST 5: Invalid patient FK");
console.log(
  scheduleAppointment(
    receptionistUser,
    999,
    availableDoctorId,
    "2027-04-23T10:00:00",
    "Checkup",
    validAuthorizationPin
  )
);

console.log("\nTEST 6: Patient can schedule appointment for self");
console.log(
  scheduleAppointment(
    patientUser,
    validPatientId,
    availableDoctorId,
    "2027-04-23T11:00:00",
    "Patient self booking",
    validAuthorizationPin
  )
);

console.log("\nTEST 7: Invalid reason");
console.log(
  scheduleAppointment(
    validationUser,
    validPatientId,
    availableDoctorId,
    "2027-04-23T12:00:00",
    "No",
    validAuthorizationPin
  )
);

console.log("\nTEST 8: Past appointment date");
console.log(
  scheduleAppointment(
    validationUser,
    validPatientId,
    availableDoctorId,
    "2020-04-23T10:00:00",
    "Checkup",
    validAuthorizationPin
  )
);

console.log("\nTEST 9: Invalid authorization PIN");
console.log(
  scheduleAppointment(
    validationUser,
    validPatientId,
    availableDoctorId,
    "2027-04-23T13:00:00",
    "Checkup",
    "0000"
  )
);

console.log("\nTEST 10: Same user keeps the original rate-limit flow");
for (let i = 0; i < 6; i++) {
  console.log(
    scheduleAppointment(
      rateLimitUser,
      blockedPatientId,
      availableDoctorId,
      `2027-04-24T1${i}:00:00`,
      "Checkup",
      validAuthorizationPin
    )
  );
}

console.log("\nTEST 11: Blocked patient message is shown to a different role");
console.log(
  scheduleAppointment(
    patientUser,
    blockedPatientId,
    availableDoctorId,
    "2027-04-25T10:00:00",
    "Patient self booking after receptionist block",
    validAuthorizationPin
  )
);

console.log("\nFinal Appointments:");
console.log(appointments);

console.log("\nAppointment Request Logs:");
console.log(appointmentRequestLogs);
