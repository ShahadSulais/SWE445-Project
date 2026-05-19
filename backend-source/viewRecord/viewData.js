// viewData.js

// ===== PATIENTS =====
export const patients = [
  {
    patientId: "P1", // Primary Key (PK)
    displayId: "PT-1029", // Alternative Key (AK)
    name: "Nora Alkuwaihes",
    gender: "Female",
    age: 23,
    weight: "86 kg",
    height: "178 cm",
    bloodType: "A+",
    bloodPressureTrend: [
      { month: "May", systolic: 132, diastolic: 86 },
      { month: "Jun", systolic: 128, diastolic: 83 },
      { month: "Jul", systolic: 124, diastolic: 81 },
      { month: "Aug", systolic: 120, diastolic: 79 },
      { month: "Sep", systolic: 114, diastolic: 75 },
      { month: "Oct", systolic: 110, diastolic: 72 }
    ]
  },
  {
    patientId: "P2",
    displayId: "PT-1027",
    name: "Jude Alharbi",
    gender: "Female",
    age: 24,
    weight: "64 kg",
    height: "164 cm",
    bloodType: "O+",
    bloodPressureTrend: [
      { month: "May", systolic: 118, diastolic: 76 },
      { month: "Jun", systolic: 116, diastolic: 74 },
      { month: "Jul", systolic: 121, diastolic: 77 },
      { month: "Aug", systolic: 119, diastolic: 75 },
      { month: "Sep", systolic: 117, diastolic: 74 },
      { month: "Oct", systolic: 115, diastolic: 73 }
    ]
  },
  {
    patientId: "P3",
    displayId: "PT-1101",
    name: "Ali Sulais",
    gender: "Male",
    age: 60,
    weight: "91 kg",
    height: "176 cm",
    bloodType: "B+",
    bloodPressureTrend: [
      { month: "May", systolic: 145, diastolic: 92 },
      { month: "Jun", systolic: 142, diastolic: 90 },
      { month: "Jul", systolic: 140, diastolic: 88 },
      { month: "Aug", systolic: 137, diastolic: 86 },
      { month: "Sep", systolic: 135, diastolic: 84 },
      { month: "Oct", systolic: 133, diastolic: 83 }
    ]
  },
  {
    patientId: "P4",
    displayId: "PT-1025",
    name: "Tariq Altwairqi",
    gender: "Male",
    age: 40,
    weight: "82 kg",
    height: "173 cm",
    bloodType: "AB+",
    bloodPressureTrend: [
      { month: "May", systolic: 126, diastolic: 82 },
      { month: "Jun", systolic: 130, diastolic: 84 },
      { month: "Jul", systolic: 128, diastolic: 83 },
      { month: "Aug", systolic: 134, diastolic: 86 },
      { month: "Sep", systolic: 129, diastolic: 81 },
      { month: "Oct", systolic: 127, diastolic: 80 }
    ]
  },
  {
    patientId: "P5",
    displayId: "PT-1024",
    name: "Noor Sulais",
    gender: "Female",
    age: 32,
    weight: "58 kg",
    height: "161 cm",
    bloodType: "O-",
    bloodPressureTrend: [
      { month: "May", systolic: 110, diastolic: 70 },
      { month: "Jun", systolic: 112, diastolic: 71 },
      { month: "Jul", systolic: 109, diastolic: 69 },
      { month: "Aug", systolic: 111, diastolic: 70 },
      { month: "Sep", systolic: 108, diastolic: 68 },
      { month: "Oct", systolic: 107, diastolic: 67 }
    ]
  }
];

// ===== USERS (RBAC) =====
export const users = [
  { username: "DR-1040", role: "doctor" }, // Primary Key (PK)
  { username: "RC-1042", role: "receptionist" }, // Primary Key (PK)
  { username: "PT-1029", role: "patient" } // Primary Key (PK)
];

// ===== MEDICAL RECORDS =====
// PK: recordId
// FK: patientId -> patients.patientId
// AK: (patientId, type)
export const medicalRecords = [
  { recordId: "R1", patientId: "P1", type: "Medical History", data: "Hypertension" },
  { recordId: "R2", patientId: "P1", type: "Lab Results", data: "Normal" },
  { recordId: "R3", patientId: "P2", type: "Medication", data: "Metformin" },
  { recordId: "R4", patientId: "P2", type: "Clinical Note", data: "Cardiology follow-up required" },
  { recordId: "R5", patientId: "P3", type: "Medical History", data: "Osteoarthritis" },
  { recordId: "R6", patientId: "P3", type: "Lab Results", data: "Vitamin D low" },
  { recordId: "R7", patientId: "P4", type: "Medical History", data: "Migraine episodes" },
  { recordId: "R8", patientId: "P4", type: "Imaging", data: "MRI clear" },
  { recordId: "R9", patientId: "P5", type: "Medical History", data: "Seasonal allergies" },
  { recordId: "R10", patientId: "P5", type: "Lab Results", data: "CBC normal" }
];

// ===== PRESCRIPTIONS =====
// FK: recordId -> medicalRecords.recordId
// AK: (recordId, medication)
export const prescriptions = [
  { recordId: "R1", medication: "Amlodipine" }, // Foreign Key (FK) -> medicalRecords.recordId
  { recordId: "R3", medication: "Metformin" },
  { recordId: "R5", medication: "Ibuprofen" },
  { recordId: "R7", medication: "Sumatriptan" },
  { recordId: "R9", medication: "Loratadine" }
];

// ===== TEST RESULTS =====
// FK: recordId -> medicalRecords.recordId
// AK: (recordId, result)
export const testResults = [
  { recordId: "R2", result: "Blood test normal" },
  { recordId: "R4", result: "ECG review pending" },
  { recordId: "R6", result: "Vitamin D below range" },
  { recordId: "R8", result: "No acute findings" },
  { recordId: "R10", result: "CBC within normal range" }
];

// ===== AUDIT LOG =====
// FK: patientId -> patients.patientId
// AK: (action, user, patientId, time)
export const auditLogs = [];

// ===== ACCESS VERIFICATION REQUESTS =====
// PK: requestId
// FK: patientId -> patients.patientId
// AK: (user, patientId, requestedAt)
export const accessVerificationRequests = [];
