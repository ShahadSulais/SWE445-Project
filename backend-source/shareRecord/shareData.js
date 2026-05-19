// shareData.js

// ===== PATIENTS =====
export const patients = [
  { patientId: "P1", name: "Nora Alkuwaihes" }, // Primary Key (PK): patientId
  { patientId: "P2", name: "Ali Hassan" }, // Primary Key (PK): patientId
  { patientId: "P3", name: "Sara Ahmed" } // Primary Key (PK): patientId
];


// ===== PROVIDERS =====
export const providers = [
  { providerId: "DR-8829", name: "Ahmed Alkuwaihes", type: "Neurology - General Hospital" }, // PK: providerId
  { providerId: "DR-4412", name: "Dr. Essam Abdelgawad", type: "Oncology - Mercy Medical" }, // PK: providerId
  { providerId: "DR-9921", name: "Dr. Abdullah Sulais", type: "Orthopedics - City Clinic" }, // PK: providerId
  { providerId: "FAC-1021", name: "MediCore Facility", type: "Multi-specialty - Central Region" }, // PK: providerId
  { providerId: "FAC-2045", name: "Vitalis Health Hub", type: "Outpatient Clinic - North District" }, // PK: providerId
  { providerId: "FAC-3302", name: "CarePoint Medical", type: "General Hospital - West City" } // PK: providerId
];


// ===== MEDICAL RECORDS =====
// PK: recordId
// FK: patientId -> patients.patientId
// AK: (patientId, type)
export const medicalRecords = [
  {
    recordId: "R1",
    patientId: "P1",
    type: "Medical History",
    data: "Hypertension, Asthma"
  },
  {
    recordId: "R2",
    patientId: "P1",
    type: "Lab Results",
    data: "Blood Test Normal"
  },
  {
    recordId: "R5",
    patientId: "P1",
    type: "Medication History",
    data: "Lisinopril 10mg, Metformin 500mg"
  },
  {
    recordId: "R6",
    patientId: "P1",
    type: "Medication History",
    data: "Oxycodone 5mg - past post-op prescription"
  },
  {
    recordId: "R3",
    patientId: "P2",
    type: "Medication",
    data: "Metformin"
  },
  {
    recordId: "R4",
    patientId: "P3",
    type: "Lab Results",
    data: "Cholesterol High"
  }
];


// ===== RECORD SHARING CONSENT =====
// PK: consentId
// FK: patientId -> patients.patientId
// FK: recordId -> medicalRecords.recordId
// FK: providerId -> providers.providerId
// AK: (patientId, recordId, providerId)
export const sharingConsents = [
  {
    consentId: "C1",
    patientId: "P2",
    recordId: "R3",
    providerId: "DR-8829",
    consentStatus: "approved",
    consentedAt: "2026-05-01T10:00:00Z",
    expiresAt: "2026-05-02T10:00:00Z"
  }
];


// ===== AUDIT LOGS =====
// FK: recordId -> medicalRecords.recordId
// FK: providerId -> providers.providerId
// AK: (action, user, recordId, providerId, time)
export const auditLogs = [
  {
    action: "SHARE_RECORD",
    user: "ali",
    recordId: "R3",
    providerId: "DR-8829",
    time: "2026-05-01T10:00:00Z"
  }
];
