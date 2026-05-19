const users = [
  { user_id: 1, username: "patient1", role: "Patient" },
  { user_id: 2, username: "receptionist1", role: "Receptionist" },
  { user_id: 3, username: "doctor1", role: "Doctor" },
  { user_id: 4, username: "doctor2", role: "Doctor" },
  { user_id: 5, username: "patient3", role: "Patient" }
];

const patients = [
  {
    patient_id: 1029, // Primary Key (PK)
    user_id: 1, // Foreign Key (FK) -> users.user_id
    full_name: "Nora Alkuwaihes"
  },
  {
    patient_id: 1101, // Primary Key (PK)
    user_id: 5, // Foreign Key (FK) -> users.user_id
    full_name: "Ali Sulais"
  }
];

const doctors = [
  {
    doctor_id: 201, // Primary Key (PK)
    user_id: 3, // Foreign Key (FK) -> users.user_id
    full_name: "Dr. Shahad Sulais",
    specialization: "Cardiology", // Alternative Key (AK)
    available: true
  },
  {
    doctor_id: 202, // PK
    user_id: 4, // FK -> users.user_id
    full_name: "Dr. Reem Abdelgawad",
    specialization: "Dermatology", // AK
    available: false
  }
];

const appointments = [
  {
    appointment_id: 1, // Primary Key (PK)
    patient_id: 1029, // Foreign Key (FK) -> patients.patient_id
    doctor_id: 201, // Foreign Key (FK) -> doctors.doctor_id
    scheduled_by_user_id: 2, // Foreign Key (FK) -> users.user_id
    appointment_datetime: "2026-04-20T10:00:00", // Alternative Key (AK)
    reason: "Regular checkup",
    status: "Confirmed"
  }
];

const appointmentRequestLogs = [
  {
    request_log_id: 1, // Primary Key (PK)
    user_id: 2, // Foreign Key (FK) -> users.user_id
    patient_id: 1029, // Foreign Key (FK) -> patients.patient_id
    action_type: "Schedule Appointment",
    outcome_status: "Success"
  }
];

module.exports = {
  users,
  patients,
  doctors,
  appointments,
  appointmentRequestLogs
};
