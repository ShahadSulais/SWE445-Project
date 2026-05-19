const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const unavailableDoctor = document.querySelector(".unavailable-doctor");
const unavailableAlert = document.querySelector("#unavailableAlert");
const unavailableAlertTitle = unavailableAlert?.querySelector("strong");
const unavailableAlertMessage = unavailableAlert?.querySelector("p");
const bookShahad = document.querySelector(".book-shahad");
const appointmentContent = document.querySelector(".appointment-content");
const bookingSelection = document.querySelector("#bookingSelection");
const timeCard = document.querySelector(".time-card");
const conflictDate = document.querySelector(".conflict-date");
const conflictSlot = document.querySelector(".conflict-slot");
const reviewAppointmentButton = document.querySelector("#reviewAppointmentButton");
const patientIdInput = document.querySelector("#patientIdInput");
const reasonSelect = document.querySelector("#reasonSelect");
const patientRequiredAlert = document.querySelector("#patientRequiredAlert");
const bookingValidationTitle = document.querySelector("#bookingValidationTitle");
const bookingValidationMessage = document.querySelector("#bookingValidationMessage");
const confirmBookingForm = document.querySelector("#confirmBookingForm");
const confirmMessage = document.querySelector("#confirmMessage");
const confirmBookingButton = document.querySelector("#confirmBookingButton");
const rateLimitBanner = document.querySelector("#rateLimitBanner");
const bookingAttemptsRemaining = document.querySelector("#bookingAttemptsRemaining");
const bookingCooldownTimer = document.querySelector("#bookingCooldownTimer");
const blockedLimitBanner = document.querySelector("#blockedLimitBanner");
const blockedRetryTimer = document.querySelector("#blockedRetryTimer");
const securityVerificationPanel = document.querySelector("#securityVerificationPanel");
const humanCheck = document.querySelector("#humanCheck");
const verifyHumanButton = document.querySelector("#verifyHumanButton");
const captchaButtons = document.querySelectorAll(".captcha-grid button");
const verifiedToast = document.querySelector("#verifiedToast");
const resendPinButton = document.querySelector("#resendPinButton");
const acknowledgeCheckbox = document.querySelector("#acknowledgeCheckbox");
const viewRecordButtons = document.querySelectorAll(".view-record-button");
const recordCards = document.querySelectorAll(".record-card");
const patientListGrid = document.querySelector(".patient-list-grid");
const recordAccessModal = document.querySelector("#recordAccessModal");
const roleRestrictedModal = document.querySelector("#roleRestrictedModal");
const restrictedPatientId = document.querySelector("#restrictedPatientId");
const returnPatientsButton = document.querySelector("#returnPatientsButton");
const requestAuthorizedAccessButton = document.querySelector("#requestAuthorizedAccessButton");
const requestAccessForm = document.querySelector("#requestAccessForm");
const requestAccessReason = document.querySelector("#requestAccessReason");
const requestFormMessage = document.querySelector("#requestFormMessage");
const auditToast = document.querySelector("#auditToast");
const requestSubmittedToast = document.querySelector("#requestSubmittedToast");
const accessVerificationForm = document.querySelector("#accessVerificationForm");
const accessReason = document.querySelector("#accessReason");
const accessMessage = document.querySelector("#accessMessage");
const accessCodeTimer = document.querySelector("#accessCodeTimer");
const accessGrantedModal = document.querySelector("#accessGrantedModal");
const continueRecordButton = document.querySelector("#continueRecordButton");
const backPatientsButton = document.querySelector("#backPatientsButton");
const resendAccessCodeButton = document.querySelector("#resendAccessCodeButton");
const accessResendMessage = document.querySelector("#accessResendMessage");
const accessDeniedModal = document.querySelector("#accessDeniedModal");
const remainingAttempts = document.querySelector("#remainingAttempts");
const tryAgainButton = document.querySelector("#tryAgainButton");
const deniedCancelButton = document.querySelector("#deniedCancelButton");
const recordContent = document.querySelector(".record-content");
let providerCards = document.querySelectorAll(".provider-card");
const durationButtons = document.querySelectorAll(".duration-options button");
const selectSharingDataButton = document.querySelector("#selectSharingDataButton");
const permissionInputs = document.querySelectorAll(".permission-row input");
const dataSelectionContent = document.querySelector(".data-selection-content");
const authorizeSharingButton = document.querySelector("#authorizeSharingButton");
const sharingValidationAlert = document.querySelector("#sharingValidationAlert");
const sharingValidationTitle = document.querySelector("#sharingValidationTitle");
const sharingValidationMessage = document.querySelector("#sharingValidationMessage");
const dataSelectionAlert = document.querySelector("#dataSelectionAlert");
const sharedRecordCount = document.querySelector("#sharedRecordCount");
const sharedCategoryCount = document.querySelector("#sharedCategoryCount");
const privacyRiskLevel = document.querySelector("#privacyRiskLevel");
const sharingWithProvider = document.querySelector("#sharingWithProvider");
const sharingWithDuration = document.querySelector("#sharingWithDuration");
const sharingExpiresAt = document.querySelector("#sharingExpiresAt");
const sharingContextPill = document.querySelector(".sharing-context-pill");
const sharingSecurityForm = document.querySelector("#sharingSecurityForm");
const sharingSecurityMessage = document.querySelector("#sharingSecurityMessage");
const resendSharingCodeButton = document.querySelector("#resendSharingCodeButton");
const confirmSharingButton = document.querySelector("#confirmSharingButton");
const sharingPinTimer = document.querySelector("#sharingPinTimer");
const sharingTimeRemaining = document.querySelector("#sharingTimeRemaining");
const sharingTimeUnit = document.querySelector("#sharingTimeUnit");
const sharingProgressBar = document.querySelector("#sharingProgressBar");
const sharingRevokeText = document.querySelector("#sharingRevokeText");
const consentSignatureInput = document.querySelector("#consentSignatureInput");
const consentAcknowledgeCheckbox = document.querySelector("#consentAcknowledgeCheckbox");
const consentProviderName = document.querySelector("#consentProviderName");
const consentDocumentProvider = document.querySelector("#consentDocumentProvider");
const consentDuration = document.querySelector("#consentDuration");
const cancelSharingRequestButton = document.querySelector("#cancelSharingRequestButton");
const backSharingPortalButton = document.querySelector("#backSharingPortalButton");
let pendingRecordPatientId = "";
let accessAttemptsLeft = 3;
const validAccessCode = "123456";
const isReceptionPatientPage = document.body.classList.contains("reception-patient-page");
let bookingRequestProcessing = false;
let bookingCooldownActive = false;
let bookingBlockedActive = false;
let backendRateLimitWarningActive = false;
let returnToAppointmentStartAfterVerification = false;
let bookingProcessingTimer;
let bookingCooldownInterval;
let blockedRetryInterval;
let accessCodeInterval;
let accessCodeSecondsLeft = 179;
let sharingPinInterval;
let sharingPinSecondsLeft = 179;
let sharingMonitorInterval;
let appointmentDataCache = null;
let shareRecordDataCache = null;

const dummyPatients = {
  "PT-1029": { name: "Nora Alkuwaihes", gender: "Female" },
  "PT-1027": { name: "Jude Alharbi", gender: "Female" },
  "PT-1101": { name: "Ali Sulais", gender: "Male" },
  "PT-1025": { name: "Tariq Altwairqi", gender: "Male" },
  "PT-1024": { name: "Noor Sulais", gender: "Female" }
};
const patientAppointmentBlockedMessage = "This patient is temporarily blocked from making appointments. Please try again later.";
let unavailableTimer;
let selectedDate = "";
let selectedTime = "";

const defaultBooking = {
  doctor: getDefaultAppointmentDoctor().full_name,
  specialty: getDefaultAppointmentDoctor().specialization,
  date: "Wednesday, May 20, 2026",
  time: "15:30 - 16:00",
  patientId: String(getDefaultAppointmentPatient().patient_id),
  patientName: getDefaultAppointmentPatient().full_name,
  doctorId: getDefaultAppointmentDoctor().doctor_id,
  reason: "Routine Checkup"
};

const dateLabelToFullDate = {
  "Mon, May 18": "Monday, May 18, 2026",
  "Wed, May 20": "Wednesday, May 20, 2026",
  "Thu, May 21": "Thursday, May 21, 2026",
  "Fri, May 22": "Friday, May 22, 2026"
};

const fullDateToDateLabel = Object.fromEntries(
  Object.entries(dateLabelToFullDate).map(([label, fullDate]) => [fullDate, label])
);

function getAppointmentData() {
  return appointmentDataCache || window.appointmentBackendData || getFallbackAppointmentData();
}

function getFallbackAppointmentData() {
  return {
    users: [],
    patients: [
      { patient_id: 1029, user_id: 1, full_name: "Nora Alkuwaihes" },
      { patient_id: 1101, user_id: 5, full_name: "Ali Sulais" }
    ],
    doctors: [
      { doctor_id: 201, user_id: 3, full_name: "Dr. Shahad Sulais", specialization: "Cardiology", available: true },
      { doctor_id: 202, user_id: 4, full_name: "Dr. Reem Abdelgawad", specialization: "Dermatology", available: false }
    ],
    appointments: [],
    appointmentRequestLogs: []
  };
}

async function loadAppointmentData() {
  if (appointmentDataCache) {
    return appointmentDataCache;
  }

  try {
    const response = await fetch("/api/appointment-data", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Appointment API unavailable.");
    }

    appointmentDataCache = await response.json();
  } catch (error) {
    appointmentDataCache = getFallbackAppointmentData();
  }

  return appointmentDataCache;
}

function getDateKeyFromLabel(dateLabel) {
  const fullDate = dateLabelToFullDate[dateLabel] || dateLabel;
  const date = new Date(fullDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function getDateKeyFromAppointmentDateTime(value) {
  const text = String(value || "");

  if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
    return text.slice(0, 10);
  }

  return getDateKeyFromLabel(text);
}

function getTimeStartKey(timeLabel) {
  const text = String(timeLabel || "");
  const meridiemMatch = text.match(/\b(AM|PM)\b/i);
  const timeMatch = text.match(/(\d{1,2}):(\d{2})/);

  if (!timeMatch) {
    return "";
  }

  let hours = Number(timeMatch[1]);
  const minutes = timeMatch[2];
  const meridiem = meridiemMatch ? meridiemMatch[1].toUpperCase() : "";

  if (meridiem === "PM" && hours < 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

async function checkAppointmentDoctorAvailabilityFromBackend(doctor) {
  try {
    const response = await fetch(`/api/appointment-doctor-availability?doctor=${encodeURIComponent(doctor)}`);

    if (!response.ok) {
      throw new Error("Appointment API unavailable.");
    }

    return response.json();
  } catch (error) {
    const doctorRecord = getAppointmentData().doctors.find((item) => item.doctor_id === Number(doctor) || item.full_name === doctor);

    if (!doctorRecord) {
      return { status: "error", message: "Doctor does not exist." };
    }

    return doctorRecord.available
      ? { status: "success", message: "Doctor is available.", doctor: doctorRecord }
      : { status: "error", message: "Doctor is unavailable." };
  }
}

//Appointment Booking System
async function scheduleAppointmentFromBackend(user, patientId, doctorId, appointmentDateTime, reason, authorizationPin) {
  try {
    const response = await fetch("/api/schedule-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user,
        patientId,
        doctorId,
        appointmentDateTime,
        reason,
        authorizationPin
      })
    });

    if (!response.ok) {
      throw new Error("Schedule appointment API unavailable.");
    }

    return response.json();
  } catch (error) {
    return scheduleAppointmentLocally(user, patientId, doctorId, appointmentDateTime, reason, authorizationPin);
  }
}

async function loadShareRecordData(patientId = "PT-1029") {
  try {
    const response = await fetch(`/api/share-record-data?patientId=${encodeURIComponent(patientId)}`);

    if (!response.ok) {
      throw new Error("Share record API unavailable.");
    }

    shareRecordDataCache = await response.json();
  } catch (error) {
    shareRecordDataCache = {
      status: "error",
      message: "Unable to load sharing data.",
      patient: null,
      providers: [],
      medicalRecords: [],
      sharingConsents: [],
      auditLogs: []
    };
  }

  return shareRecordDataCache;
}

async function shareMedicalRecordFromBackend(user, patientId, recordIds, providerId, consent, otpCode, duration, digitalSignature) {
  try {
    const response = await fetch("/api/share-medical-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user,
        patientId,
        recordIds,
        providerId,
        consent,
        otpCode,
        duration,
        digitalSignature
      })
    });

    if (!response.ok) {
      throw new Error("Share record API unavailable.");
    }

    return response.json();
  } catch (error) {
    return {
      status: "error",
      message: "Unable to share record. Please make sure the backend server is running."
    };
  }
}

function normalizeAppointmentPatientId(patientId) {
  const normalizedPatientId = String(patientId || "").trim().toUpperCase();
  const patientMap = {
    "PT-1029": 1029,
    P1: 1029,
    "PT-1101": 1101,
    P3: 1101
  };

  return patientMap[normalizedPatientId] || Number(normalizedPatientId.replace(/^PT-/, ""));
}

function normalizeAppointmentDoctorId(doctor) {
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

function toLocalAppointmentDateTime(value) {
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

function scheduleAppointmentLocally(user, patientId, doctorId, appointmentDateTime, reason, authorizationPin) {
  const data = getAppointmentData();
  const backendPatientId = normalizeAppointmentPatientId(patientId);
  const backendDoctorId = normalizeAppointmentDoctorId(doctorId);
  const backendDateTime = toLocalAppointmentDateTime(appointmentDateTime);

  if (!user || !patientId || !doctorId || !appointmentDateTime || !reason) {
    return { status: "error", message: "All appointment fields are required." };
  }

  if (user.role !== "patient" && user.role !== "receptionist" && user.role !== "Patient" && user.role !== "Receptionist") {
    return { status: "error", message: "Access denied. Only patients or receptionists can schedule appointments." };
  }

  if (authorizationPin !== "1234") {
    return { status: "error", message: "Invalid authorization PIN." };
  }

  const patient = data.patients.find((item) => item.patient_id === backendPatientId);

  if (!patient) {
    return { status: "error", message: "Patient does not exist." };
  }

  const doctor = data.doctors.find((item) => item.doctor_id === backendDoctorId);

  if (!doctor) {
    return { status: "error", message: "Doctor does not exist." };
  }

  if (!doctor.available) {
    return { status: "error", message: "Doctor is unavailable." };
  }

  const duplicateAppointment = data.appointments.find((appointment) => {
    return appointment.doctor_id === backendDoctorId && appointment.appointment_datetime === backendDateTime;
  });

  if (duplicateAppointment) {
    return { status: "error", message: "Appointment time already booked." };
  }

  const localBlock = getLocalPatientAppointmentRateLimitStatus(backendPatientId);

  if (localBlock.patientBlocked) {
    return localBlock;
  }

  registerLimitedSchedulingAttempt(backendPatientId);

  const appointment = {
    appointment_id: data.appointments.length + 1,
    patient_id: backendPatientId,
    doctor_id: backendDoctorId,
    scheduled_by_user_id: user.user_id || 2,
    appointment_datetime: backendDateTime,
    reason,
    status: "Confirmed",
    created_at: new Date().toISOString()
  };

  data.appointments.push(appointment);

  return {
    status: "success",
    message: "Appointment scheduled successfully.",
    appointment
  };
}

async function validateAppointmentPatientFromBackend(patientId) {
  const user = getCurrentUser();
  const userParam = user ? `&user=${encodeURIComponent(JSON.stringify(user))}` : "";

  try {
    const response = await fetch(`/api/appointment-patient-validation?patientId=${encodeURIComponent(patientId)}${userParam}`);

    if (!response.ok) {
      throw new Error("Patient validation API unavailable.");
    }

    const result = await response.json();

    if (result.patientBlocked) {
      rememberPatientAppointmentBlock(patientId, result.retryAfterSeconds);
    }

    return result;
  } catch (error) {
    const backendPatientId = normalizeAppointmentPatientId(patientId);
    const patient = getAppointmentData().patients.find((item) => item.patient_id === backendPatientId);

    if (patient) {
      const localBlock = getLocalPatientAppointmentRateLimitStatus(backendPatientId);

      if (localBlock.patientBlocked) {
        return {
          ...localBlock,
          patient
        };
      }
    }

    return patient
      ? { status: "success", message: "Patient verified.", patient }
      : { status: "error", message: "Patient does not exist." };
  }
}

async function viewMedicalRecordFromBackend(user, patientId, reason, otp) {
  try {
    const response = await fetch("/api/view-medical-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user,
        patientId,
        reason,
        otp
      })
    });

    if (!response.ok) {
      throw new Error("View record API unavailable.");
    }

    return response.json();
  } catch (error) {
    if (typeof window.viewMedicalRecord === "function") {
      return window.viewMedicalRecord(user, patientId, reason, otp);
    }

    return {
      status: "error",
      message: "Unable to verify record access. Please make sure the backend server is running."
    };
  }
}

async function requestRecordAccessFromBackend(reason) {
  try {
    const response = await fetch("/api/request-record-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason })
    });

    if (!response.ok) {
      throw new Error("Request access API unavailable.");
    }

    return response.json();
  } catch (error) {
    return {
      status: "error",
      message: "Unable to submit access request. Please make sure the backend server is running."
    };
  }
}

async function loadViewRecordPatientsFromBackend() {
  try {
    const response = await fetch("/api/view-record-patients");

    if (!response.ok) {
      throw new Error("View record patients API unavailable.");
    }

    return response.json();
  } catch (error) {
    return {
      status: "error",
      patients: []
    };
  }
}

function getDefaultAppointmentPatient() {
  return getAppointmentData().patients[0] || { patient_id: 1029, full_name: "Nora Alkuwaihes" };
}

function getDefaultAppointmentDoctor() {
  const doctors = getAppointmentData().doctors;
  return doctors.find((doctor) => doctor.available) || doctors[0] || {
    doctor_id: 201,
    full_name: "Dr. Shahad Sulais",
    specialization: "Cardiology",
    available: true
  };
}

function getSelectedAppointmentDoctor() {
  const selectedDoctorId = Number(sessionStorage.getItem("selectedAppointmentDoctorId"));
  const doctors = getAppointmentData().doctors;
  return doctors.find((doctor) => doctor.doctor_id === selectedDoctorId) || getDefaultAppointmentDoctor();
}

function getAppointmentDoctorAvatarClass(doctor) {
  return doctor.doctor_id % 2 === 0 ? "avatar-woman" : "avatar-man";
}

function getAppointmentDepartmentDescription(specialization) {
  const descriptions = {
    Cardiology: "Heart and vascular care specialists",
    Dermatology: "Skin, hair, and nail care"
  };

  return descriptions[specialization] || `${specialization} care`;
}

function getNextAvailabilityLabel(doctor) {
  const nextSlots = {
    201: "Today at 08:30 AM",
    202: "No available appointments"
  };

  return nextSlots[doctor.doctor_id] || "Next available soon";
}

const dummyUsers = [
  {
    username: "DR-1040",
    password: "D$r7878&",
    role: "doctor"
  },
  {
    username: "RC-1042",
    password: "S$a$S2021&2026",
    role: "receptionist"
  },
  {
    username: "PT-1029",
    password: "&N$r2003&",
    role: "patient"
  }
];

if (typeof window.login !== "function") {
  window.login = function login(username, password) {
    const user = dummyUsers.find((item) => item.username === username && item.password === password);
    const selectedRole = document.querySelector("#role") ? document.querySelector("#role").value : "";

    if (!user) {
      return {
        status: "error",
        message: "Invalid login credentials."
      };
    }

    if (selectedRole !== user.role) {
      return {
        status: "error",
        message: `Select ${user.role === "doctor" ? "Doctor" : user.role === "patient" ? "Patient" : "Receptionist"} to continue.`
      };
    }

    return {
      status: "success",
      message: `${user.role === "doctor" ? "Doctor" : user.role === "patient" ? "Patient" : "Receptionist"} login successful.`
    };
  };
}

if (typeof window.viewMedicalRecord !== "function") {
  window.viewMedicalRecord = function viewMedicalRecord(user, patientId) {
    if (!user || user.role !== "doctor") {
      return {
        status: "error",
        message: "Doctor access is required to view medical records."
      };
    }

    return {
      status: "success",
      message: `Medical record opened for ${patientId}.`
    };
  };
}

function updateBookingSelection() {
  if (bookingSelection) {
    if (selectedDate && selectedTime) {
      bookingSelection.textContent = `${selectedDate} at ${selectedTime}`;
      return;
    }

    bookingSelection.textContent = selectedDate || "Choose date and time";
  }
}

function normalizeTimeLabel(time) {
  return time.replace(/\s*-\s*/g, "-");
}

function getAppointmentHistory() {
  try {
    return JSON.parse(sessionStorage.getItem("appointmentHistory")) || [];
  } catch (error) {
    return [];
  }
}

function saveAppointmentHistory(history) {
  sessionStorage.setItem("appointmentHistory", JSON.stringify(history));
}

function getPatientBookingCount(patientId) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);

  return getAppointmentHistory().filter((booking) => {
    return normalizeAppointmentPatientId(booking.patientId) === backendPatientId;
  }).length;
}

function getAppointmentRateLimitAttempts() {
  try {
    return JSON.parse(sessionStorage.getItem("appointmentRateLimitAttempts")) || {};
  } catch (error) {
    return {};
  }
}

function saveAppointmentRateLimitAttempts(attempts) {
  sessionStorage.setItem("appointmentRateLimitAttempts", JSON.stringify(attempts));
}

function getTotalSchedulingAttempts(patientId) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);
  const attempts = getAppointmentRateLimitAttempts();
  return getPatientBookingCount(backendPatientId) + (attempts[backendPatientId] || 0);
}

function registerLimitedSchedulingAttempt(patientId) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);
  const attempts = getAppointmentRateLimitAttempts();
  attempts[backendPatientId] = (attempts[backendPatientId] || 0) + 1;
  saveAppointmentRateLimitAttempts(attempts);
  return getTotalSchedulingAttempts(backendPatientId);
}

function getPatientAppointmentBlockKey(patientId) {
  return `appointmentPatientBlockedUntil:${normalizeAppointmentPatientId(patientId)}`;
}

function rememberPatientAppointmentBlock(patientId, retryAfterSeconds = 600) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);

  if (!Number.isFinite(backendPatientId)) {
    return;
  }

  sessionStorage.setItem(
    getPatientAppointmentBlockKey(backendPatientId),
    String(Date.now() + Math.max(retryAfterSeconds, 60) * 1000)
  );
}

function isPatientAppointmentBlocked(patientId) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);

  if (!Number.isFinite(backendPatientId)) {
    return false;
  }

  const blockedUntil = Number(sessionStorage.getItem(getPatientAppointmentBlockKey(backendPatientId)) || 0);

  if (Date.now() < blockedUntil) {
    return true;
  }

  sessionStorage.removeItem(getPatientAppointmentBlockKey(backendPatientId));
  return false;
}

function getLocalPatientAppointmentRateLimitStatus(patientId) {
  const backendPatientId = normalizeAppointmentPatientId(patientId);

  if (isPatientAppointmentBlocked(backendPatientId) || getTotalSchedulingAttempts(backendPatientId) >= 5) {
    rememberPatientAppointmentBlock(backendPatientId);
    return {
      status: "error",
      message: patientAppointmentBlockedMessage,
      patientBlocked: true,
      retryAfterSeconds: 600
    };
  }

  return {
    status: "success",
    remainingAttempts: Math.max(5 - getTotalSchedulingAttempts(backendPatientId), 0)
  };
}

function isBookedSlot(dateLabel, timeLabel) {
  const fullDate = dateLabelToFullDate[dateLabel] || dateLabel;
  const normalizedTime = normalizeTimeLabel(timeLabel || "");
  const selectedDoctor = getSelectedAppointmentDoctor();
  const dateKey = getDateKeyFromLabel(dateLabel);
  const timeKey = getTimeStartKey(timeLabel);
  const backendBooked = getAppointmentData().appointments.some((appointment) => {
    return appointment.doctor_id === selectedDoctor.doctor_id
      && getDateKeyFromAppointmentDateTime(appointment.appointment_datetime) === dateKey
      && getTimeStartKey(appointment.appointment_datetime) === timeKey;
  });

  if (backendBooked) {
    return true;
  }

  return getAppointmentHistory().some((booking) => {
    return booking.date === fullDate && normalizeTimeLabel(booking.time || "") === normalizedTime;
  });
}

function recordConfirmedBooking(booking) {
  const history = getAppointmentHistory();

  history.push({
    ...booking,
    recordedAt: new Date().toISOString()
  });

  saveAppointmentHistory(history);
}

function refreshBookedSlots() {
  if (!timeCard || !selectedDate) {
    return;
  }

  document.querySelectorAll(".slot-choice").forEach((choice) => {
    if (isBookedSlot(selectedDate, choice.dataset.label)) {
      choice.classList.add("disabled");
      choice.disabled = true;
      choice.title = "This appointment slot is already booked.";

      if (selectedTime === choice.dataset.label) {
        selectedTime = "";
        choice.classList.remove("selected");
        updateBookingSelection();
      }
    } else if (!choice.dataset.originalDisabled) {
      choice.classList.remove("disabled");
      choice.disabled = false;
      choice.removeAttribute("title");
    }
  });
}

async function initializeBackendBookedSlots() {
  if (!timeCard) {
    return;
  }

  await loadAppointmentData();

  if (selectedDate) {
    refreshBookedSlots();
  }
}

initializeBackendBookedSlots();

document.querySelectorAll(".slot-choice.disabled").forEach((choice) => {
  choice.dataset.originalDisabled = "true";
});

function clearTimeConflict() {
  if (timeCard) {
    timeCard.classList.remove("has-conflict");
  }

  if (conflictSlot) {
    conflictSlot.classList.remove("conflict");
  }
}

function clearConflictAlert() {
  if (timeCard) {
    timeCard.classList.remove("has-conflict");
  }
}

function clearPatientRequiredAlert() {
  if (timeCard) {
    timeCard.classList.remove("has-patient-required");
  }
}

function showBookingValidation(title, message) {
  clearConflictAlert();

  if (bookingValidationTitle) {
    bookingValidationTitle.textContent = title;
  }

  if (bookingValidationMessage) {
    bookingValidationMessage.textContent = message;
  }

  if (timeCard) {
    timeCard.classList.add("has-patient-required");
  }
}

function showTimeConflictAlert() {
  clearPatientRequiredAlert();

  if (timeCard) {
    timeCard.classList.add("has-conflict");
  }
}

function formatMissingItems(items) {
  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function formatMissingLabels(items) {
  return formatMissingItems(items);
}

function getBookingValidation(patientId, reason) {
  const missing = [];

  if (!patientId) {
    missing.push("Patient ID");
  }

  if (!reason) {
    missing.push("reason");
  }

  if (!selectedDate) {
    missing.push("date");
  }

  if (!selectedTime) {
    missing.push("time");
  }

  if (!missing.length) {
    return null;
  }

  const missingText = formatMissingItems(missing);

  return {
    title: `${missingText} ${missing.length === 1 ? "is" : "are"} required.`,
    message: "Complete the missing details before reviewing."
  };
}

function hasUnavailableSelectedTime() {
  return (selectedDate === "Thu, May 21" && conflictSlot && selectedTime === conflictSlot.dataset.label)
    || isBookedSlot(selectedDate, selectedTime);
}

function hasRequiredBookingDetails() {
  const patientId = patientIdInput ? patientIdInput.value.trim() : "";
  const reason = reasonSelect ? reasonSelect.value : "";

  return Boolean(patientId && reason && selectedDate && selectedTime);
}

function savePendingBooking(patientId, reason) {
  const selectedDoctor = getSelectedAppointmentDoctor();
  const backendPatientId = normalizeAppointmentPatientId(patientId);
  const selectedPatient = getAppointmentData().patients.find((patient) => patient.patient_id === backendPatientId) || getDefaultAppointmentPatient();
  const booking = {
    ...defaultBooking,
    doctor: selectedDoctor.full_name,
    specialty: selectedDoctor.specialization,
    doctorId: selectedDoctor.doctor_id,
    patientName: selectedPatient.full_name,
    date: dateLabelToFullDate[selectedDate] || selectedDate,
    time: selectedTime.replace("-", " - "),
    patientId,
    reason
  };

  sessionStorage.setItem("pendingAppointment", JSON.stringify(booking));
  return booking;
}

async function loadBookAppointmentPageFromBackend() {
  const profile = document.querySelector(".doctor-profile");

  if (!profile) {
    return;
  }

  try {
    await loadAppointmentData();
  } catch (error) {
    return;
  }

  const doctor = getSelectedAppointmentDoctor();
  const title = profile.querySelector("h1");
  const specialty = profile.querySelector(".profile-top p");
  const avatar = profile.querySelector(".doctor-avatar");

  if (title) {
    title.textContent = doctor.full_name;
  }

  if (specialty) {
    specialty.textContent = doctor.specialization;
  }

  if (avatar) {
    avatar.classList.remove("avatar-woman", "avatar-man");
    avatar.classList.add(getAppointmentDoctorAvatarClass(doctor));
  }

  if (patientIdInput && getCurrentUser()?.role !== "patient") {
    patientIdInput.value = "";
  }
}

function restorePendingBookingForm() {
  if (!reviewAppointmentButton) {
    return;
  }

  const storedBooking = sessionStorage.getItem("pendingAppointment");

  if (!storedBooking) {
    return;
  }

  const booking = getPendingBooking();
  const dateLabel = fullDateToDateLabel[booking.date] || booking.date;
  const normalizedTime = normalizeTimeLabel(booking.time);

  if (patientIdInput) {
    patientIdInput.value = booking.patientId;
  }

  if (reasonSelect) {
    reasonSelect.value = booking.reason;
  }

  document.querySelectorAll(".date-choice").forEach((choice) => {
    if (choice.dataset.label === dateLabel) {
      choice.classList.add("selected");
      selectedDate = choice.dataset.label;
    } else {
      choice.classList.remove("selected");
    }
  });

  document.querySelectorAll(".slot-choice").forEach((choice) => {
    if (choice.dataset.label === normalizedTime) {
      choice.classList.add("selected");
      selectedTime = choice.dataset.label;
    } else {
      choice.classList.remove("selected");
    }
  });

  updateBookingSelection();
}

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  });
}

function clearSharingSetupState() {
  sessionStorage.removeItem("sharingSetup");
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  } catch (error) {
    return null;
  }
}

function getCurrentProfile(user) {
  if (user?.role === "patient") {
    return {
      initials: "PR",
      label: "Nora Alkuwaihes",
      patientId: "1029"
    };
  }

  if (user?.role === "receptionist") {
    return {
      initials: "RC",
      label: "Receptionist: Rahf Altwairqi",
      patientId: ""
    };
  }

  if (user?.role === "doctor") {
    return {
      initials: "DR",
      label: "Dr. Reem Abdelgawad",
      patientId: ""
    };
  }

  return null;
}

function updateUserChrome() {
  const user = getCurrentUser();
  const profile = getCurrentProfile(user);

  if (!profile) {
    return;
  }

  document.querySelectorAll(".staff-card").forEach((card) => {
    const initials = card.querySelector("span");
    const label = card.querySelector("strong");

    if (initials) {
      initials.textContent = profile.initials;
    }

    if (label) {
      label.textContent = profile.label;
    }
  });

  document.querySelectorAll(".profile-dot").forEach((dot) => {
    dot.textContent = profile.initials;
  });

  if (user.role === "patient") {
    document.body.classList.add("patient-session");
    const currentPage = window.location.pathname.split("/").pop() || "";
    const isAppointmentPage = currentPage.includes("appointment") || currentPage === "appointments.html" || currentPage === "confirm-booking.html";
    const isSharingPage = currentPage.includes("sharing") || currentPage === "record-sharing.html";
    const sideNav = document.querySelector(".side-nav");

    document.querySelectorAll(".side-nav a").forEach((link) => {
      const label = link.textContent.trim();

      if (label === "Patients") {
        link.remove();
        return;
      }

      if (label === "Appointments") {
        link.href = "appointments.html";
      }

      if (link.textContent.trim() === "Record Sharing") {
        link.href = "record-sharing.html";
      }

      if (link.textContent.trim() !== "Appointments" && link.textContent.trim() !== "Record Sharing") {
        link.href = "#";
      }

      link.classList.toggle("active",
        (link.textContent.trim() === "Appointments" && isAppointmentPage)
          || (link.textContent.trim() === "Record Sharing" && isSharingPage)
      );
    });

    const appointmentsLink = Array.from(document.querySelectorAll(".side-nav a")).find((link) => {
      return link.textContent.trim() === "Appointments";
    });
    const recordSharingLink = Array.from(document.querySelectorAll(".side-nav a")).find((link) => {
      return link.textContent.trim() === "Record Sharing";
    });

    if (sideNav && appointmentsLink && !recordSharingLink) {
      const link = document.createElement("a");
      link.href = "record-sharing.html";
      link.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path></svg>Record Sharing';
      appointmentsLink.insertAdjacentElement("afterend", link);
      link.classList.toggle("active", isSharingPage);
    } else if (appointmentsLink && recordSharingLink && recordSharingLink.previousElementSibling !== appointmentsLink) {
      appointmentsLink.insertAdjacentElement("afterend", recordSharingLink);
    }

    if (patientIdInput && !patientIdInput.value.trim()) {
      patientIdInput.value = profile.patientId;
    }

    if (patientIdInput) {
      patientIdInput.readOnly = true;
      patientIdInput.setAttribute("aria-label", "Your Patient ID");
      patientIdInput.title = "Patient appointments are booked using your own Patient ID.";
    }
  }

  document.querySelectorAll(".authorized-line").forEach((line) => {
    if (user.role === "patient") {
      line.textContent = "Authorized by Patient: Nora Alkuwaihes on May 3, 2026 at 09:15 AM";
    }
  });
}

updateUserChrome();

function clearFrontendSessionState() {
  sessionStorage.clear();
  localStorage.clear();
}

function initializeLogoutLink() {
  const sideNav = document.querySelector(".side-nav");

  if (!sideNav || sideNav.querySelector("[data-logout-link]")) {
    return;
  }

  const logoutLink = document.createElement("a");
  logoutLink.href = "index.html";
  logoutLink.className = "logout-link";
  logoutLink.dataset.logoutLink = "true";
  logoutLink.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <path d="M10 17l5-5-5-5"></path>
      <path d="M15 12H3"></path>
    </svg>
    Logout
  `;

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    clearFrontendSessionState();
    window.location.replace("index.html");
  });

  sideNav.appendChild(logoutLink);
}

initializeLogoutLink();

async function renderAppointmentDirectory() {
  if (!appointmentContent) {
    return;
  }

  await loadAppointmentData();

  const departments = new Map();

  getAppointmentData().doctors.forEach((doctor) => {
    const group = departments.get(doctor.specialization) || [];
    group.push(doctor);
    departments.set(doctor.specialization, group);
  });

  appointmentContent.querySelectorAll(".department").forEach((section) => section.remove());

  Array.from(departments.entries()).forEach(([specialization, doctors]) => {
    const section = document.createElement("section");
    section.className = "department";
    section.innerHTML = `
      <div class="department-header">
        <span class="department-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M9 9c2 0 4 2 4 4s-1 4-3 4M15 8c-2 1-3 3-3 5"></path></svg>
        </span>
        <div>
          <h2>${specialization}</h2>
          <p>${getAppointmentDepartmentDescription(specialization)}</p>
        </div>
      </div>
      <div class="doctor-grid">
        ${doctors.map((doctor) => `
          <article class="doctor-card" data-doctor-id="${doctor.doctor_id}">
            <div class="doctor-head">
              <span class="doctor-avatar ${getAppointmentDoctorAvatarClass(doctor)}" aria-hidden="true"></span>
              <div>
                <h3>${doctor.full_name}</h3>
                <p>${doctor.specialization}</p>
              </div>
            </div>
            <div class="availability">
              <strong>${doctor.available ? "Next availability" : "No available appointments"}</strong>
              ${doctor.available ? `<span>${getNextAvailabilityLabel(doctor)}</span>` : ""}
            </div>
            <button type="button" data-appointment-doctor-id="${doctor.doctor_id}">View More</button>
          </article>
        `).join("")}
      </div>
    `;

    appointmentContent.appendChild(section);
  });
}

renderAppointmentDirectory();

function showAppointmentVerifiedNotice() {
  const notice = document.querySelector("#appointmentVerifiedNotice");

  if (!notice || sessionStorage.getItem("appointmentVerifiedNotice") !== "rate-limit") {
    return;
  }

  notice.hidden = false;
  sessionStorage.removeItem("appointmentVerifiedNotice");

  window.setTimeout(() => {
    notice.hidden = true;
  }, 3000);
}

showAppointmentVerifiedNotice();

async function showPatientAppointmentBlockedNotice() {
  const notice = document.querySelector("#patientAppointmentBlockedNotice");
  const user = getCurrentUser();

  if (!notice || !appointmentContent || user?.role !== "patient") {
    return;
  }

  const profile = getCurrentProfile(user);
  const patientId = profile?.patientId || user.username || "1029";
  const result = await validateAppointmentPatientFromBackend(patientId);

  if (!result.patientBlocked) {
    return;
  }

  notice.hidden = false;
  appointmentContent.classList.add("patient-blocked");
  appointmentContent.querySelectorAll("input, button").forEach((control) => {
    control.disabled = true;
  });
}

showPatientAppointmentBlockedNotice();

function getAppointmentBookingLockedUntil() {
  return Number(sessionStorage.getItem("appointmentBookingLockedUntil") || 0);
}

function isAppointmentBookingLocked() {
  return Date.now() < getAppointmentBookingLockedUntil();
}

function updateAppointmentBookingLock() {
  if (!appointmentContent) {
    return;
  }

  const locked = isAppointmentBookingLocked();
  appointmentContent.classList.toggle("booking-locked", locked);
  appointmentContent.querySelectorAll("[data-appointment-doctor-id]").forEach((button) => {
    button.disabled = locked;
  });
  appointmentContent.querySelectorAll("input, button").forEach((control) => {
    control.disabled = locked;
  });

  if (locked) {
    window.setTimeout(updateAppointmentBookingLock, Math.min(getAppointmentBookingLockedUntil() - Date.now(), 1000));
    return;
  }

  sessionStorage.removeItem("appointmentBookingLockedUntil");
}

updateAppointmentBookingLock();

function isAppointmentFlowPage() {
  const currentPage = window.location.pathname.split("/").pop() || "";
  return [
    "appointments.html",
    "book-appointment.html",
    "confirm-booking.html",
    "appointment-confirmed.html"
  ].includes(currentPage);
}

async function getDoctorAppointmentDeniedMessage(user) {
  const result = await scheduleAppointmentFromBackend(
    user,
    1029,
    201,
    "2027-05-01T09:00:00",
    "Appointment access check",
    "1234"
  );

  return result.message || "Access denied. Only patients or receptionists can schedule appointments.";
}

async function showDoctorAppointmentDeniedPopup() {
  const user = getCurrentUser();

  if (user?.role !== "doctor" || !isAppointmentFlowPage() || document.querySelector("#doctorAppointmentDeniedModal")) {
    return;
  }

  const deniedMessage = await getDoctorAppointmentDeniedMessage(user);

  const modal = document.createElement("div");
  modal.className = "doctor-appointment-denied-modal show";
  modal.id = "doctorAppointmentDeniedModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "doctorAppointmentDeniedTitle");
  modal.innerHTML = `
    <div class="doctor-appointment-denied-backdrop"></div>
    <article class="doctor-appointment-denied-card">
      <span aria-hidden="true">!</span>
      <h2 id="doctorAppointmentDeniedTitle">Access denied</h2>
      <p>${deniedMessage}</p>
      <button type="button" id="doctorAppointmentDeniedClose">Back to Patients</button>
    </article>
  `;

  document.body.appendChild(modal);

  document.querySelector("#doctorAppointmentDeniedClose")?.addEventListener("click", () => {
    window.location.href = "patients.html";
  });
}

showDoctorAppointmentDeniedPopup();

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const role = document.querySelector("#role").value;
    const username = document.querySelector("#username").value.trim();
    const password = passwordInput.value;

    const result = window.login(username, password);

    console.log({
      user: { username, role },
      password
    });

    if (loginMessage) {
      loginMessage.className = `login-message ${result.status === "success" ? "success" : "error"}`;
      loginMessage.textContent = result.message;
    }

    if (result.status !== "success") {
      return;
    }

    sessionStorage.setItem("currentUser", JSON.stringify({ username, role }));

    if (role === "patient") {
      clearSharingSetupState();
    }

    if (role === "doctor") {
      window.location.href = "patients.html";
      return;
    }

    if (role === "patient") {
      window.location.href = "record-sharing.html";
      return;
    }

    window.location.href = "appointments.html";
  });
}

if (unavailableDoctor && unavailableAlert) {
  unavailableDoctor.addEventListener("click", async () => {
    clearTimeout(unavailableTimer);

    const user = getCurrentUser() || { username: "RC-1042", role: "receptionist" };
    const result = await scheduleAppointmentFromBackend(
      user,
      "1029",
      "Dr. Reem Abdelgawad",
      "Monday, May 18, 2026 11:00 - 11:30 AM",
      "Availability check",
      "1234"
    );

    if (unavailableAlertTitle) {
      unavailableAlertTitle.textContent = result.message;
    }

    if (unavailableAlertMessage) {
      unavailableAlertMessage.textContent = "Please select another doctor.";
    }

    const card = unavailableDoctor.closest(".doctor-card");

    if (card) {
      card.appendChild(unavailableAlert);
      unavailableAlert.style.left = "";
      unavailableAlert.style.top = "";
    }

    unavailableAlert.classList.add("show");
    unavailableTimer = setTimeout(() => {
      unavailableAlert.classList.remove("show");
    }, 2200);
  });
}

if (bookShahad) {
  bookShahad.addEventListener("click", async () => {
    const result = await checkAppointmentDoctorAvailabilityFromBackend("Dr. Shahad Sulais");

    if (result.status !== "success") {
      if (unavailableAlertTitle) {
        unavailableAlertTitle.textContent = result.message;
      }

      if (unavailableAlertMessage) {
        unavailableAlertMessage.textContent = "Please select another doctor.";
      }

      unavailableAlert?.classList.add("show");
      return;
    }

    sessionStorage.removeItem("pendingAppointment");
    window.location.href = "book-appointment.html";
  });
}

function getPatientInitials(name) {
  return String(name || "PT")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "PT";
}

function getPatientSpecialtyClass(index) {
  return ["", "tag-orange", "tag-blue", "tag-purple", ""][index % 5];
}

function getPatientSpecialty(patient, index) {
  const recordType = patient.bloodType === "B+" ? "Orthopedics"
    : patient.bloodType === "AB+" ? "Neurology"
      : patient.bloodType === "O+" ? "Cardiology"
        : "General";

  return recordType || ["General", "Cardiology", "Orthopedics", "Neurology"][index % 4];
}

function createPatientRecordCard(patient, index) {
  const article = document.createElement("article");
  const initials = getPatientInitials(patient.name);
  const specialtyClass = getPatientSpecialtyClass(index);
  const specialty = getPatientSpecialty(patient, index);
  const genderInitial = patient.gender === "Male" ? "M" : "F";

  article.className = "record-card";
  article.dataset.patientId = patient.displayId;
  article.dataset.patientName = patient.name;
  article.dataset.patientInitials = initials;
  article.innerHTML = `
    <button class="card-menu" type="button" aria-label="More options">...</button>
    ${index === 0 ? '<span class="online-dot" aria-hidden="true"></span>' : ""}
    <div class="record-head">
      <span class="patient-avatar ${patient.gender === "Male" ? "avatar-man" : "avatar-woman"}" aria-hidden="true"></span>
      <h2>${patient.name.split(" ").join("<br />")}</h2>
    </div>
    <p>ID: ${patient.displayId}</p>
    <div class="patient-tags">
      <span>${patient.age} - ${genderInitial}</span>
      <span class="${specialtyClass}"><i></i>${specialty}</span>
    </div>
    <div class="record-actions">
      <button class="view-record-button" type="button">View Record</button>
      <button class="icon-tile" type="button" aria-label="Call patient"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.62 2.6a2 2 0 0 1-.45 2.11L8 9.71a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.6.62A2 2 0 0 1 22 16.92Z"></path></svg></button>
      <button class="icon-tile solid" type="button" aria-label="Schedule appointment"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M8 2v4m8-4v4M3 10h18M12 14v4m-2-2h4"></path></svg></button>
    </div>
  `;

  return article;
}

async function renderPatientListFromBackend() {
  if (!patientListGrid) {
    return;
  }

  const result = await loadViewRecordPatientsFromBackend();

  if (result.status !== "success" || !result.patients.length) {
    return;
  }

  patientListGrid.textContent = "";
  result.patients.forEach((patient, index) => {
    patientListGrid.appendChild(createPatientRecordCard(patient, index));
  });
}

renderPatientListFromBackend();

if (appointmentContent) {
  appointmentContent.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-appointment-doctor-id]");

    if (!button) {
      return;
    }

    if (isAppointmentBookingLocked()) {
      event.preventDefault();
      return;
    }

    const doctorId = Number(button.dataset.appointmentDoctorId);
    const doctor = getAppointmentData().doctors.find((item) => item.doctor_id === doctorId);

    if (!doctor) {
      return;
    }

    const result = await checkAppointmentDoctorAvailabilityFromBackend(doctor.doctor_id);

    if (result.status !== "success") {
      if (unavailableAlertTitle) {
        unavailableAlertTitle.textContent = result.message;
      }

      if (unavailableAlertMessage) {
        unavailableAlertMessage.textContent = "Please select another doctor.";
      }

      const card = button.closest(".doctor-card");

      if (card && unavailableAlert) {
        card.appendChild(unavailableAlert);
        unavailableAlert.style.left = "";
        unavailableAlert.style.top = "";
        unavailableAlert.classList.add("show");
      }

      clearTimeout(unavailableTimer);
      unavailableTimer = setTimeout(() => {
        unavailableAlert?.classList.remove("show");
      }, 2200);
      return;
    }

    sessionStorage.setItem("selectedAppointmentDoctorId", String(doctor.doctor_id));
    sessionStorage.removeItem("pendingAppointment");
    window.location.href = "book-appointment.html";
  });
}

function handleViewRecordCardClick(card) {
  if (!card) {
    return;
  }

  selectRecordCard(card);

  if (isReceptionPatientPage) {
    return Promise.resolve().then(async () => {
      const user = JSON.parse(sessionStorage.getItem("currentUser") || '{"username":"RC-1042","role":"receptionist"}');
      const result = await viewMedicalRecordFromBackend(
        user,
        card.dataset.patientId || "",
        "Receptionist record access check",
        "123456"
      );

      openRoleRestrictedModal(card, result.message);
    });
  }

  openAccessVerification(card);
  return Promise.resolve();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".view-record-button");

  if (!button) {
    return;
  }

  const card = button.closest("[data-patient-id]");

  if (card) {
    handleViewRecordCardClick(card);
  }
});

function selectRecordCard(card) {
  recordCards.forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
}

function formatAccessCodeTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function updateAccessCodeTimer() {
  if (accessCodeTimer) {
    accessCodeTimer.textContent = formatAccessCodeTime(accessCodeSecondsLeft);
  }
}

function stopAccessCodeTimer() {
  clearInterval(accessCodeInterval);
}

function startAccessCodeTimer() {
  stopAccessCodeTimer();
  accessCodeSecondsLeft = 179;
  updateAccessCodeTimer();

  accessCodeInterval = setInterval(() => {
    accessCodeSecondsLeft = Math.max(accessCodeSecondsLeft - 1, 0);
    updateAccessCodeTimer();

    if (accessCodeSecondsLeft === 0) {
      stopAccessCodeTimer();

      if (accessMessage && recordAccessModal?.classList.contains("show")) {
        accessMessage.className = "access-message error";
        accessMessage.textContent = "Authentication code expired. Please request a new code.";
      }
    }
  }, 1000);
}

function openAccessVerification(card) {
  pendingRecordPatientId = card.dataset.patientId || "";
  accessAttemptsLeft = 3;
  setText("#accessPatientName", card.dataset.patientName || "Patient");
  setText("#accessPatientInitials", card.dataset.patientInitials || "PT");
  setText("#accessPatientId", pendingRecordPatientId);

  if (accessReason) {
    accessReason.value = "";
  }

  if (accessMessage) {
    accessMessage.className = "access-message";
    accessMessage.textContent = "";
  }

  if (accessResendMessage) {
    accessResendMessage.textContent = "";
  }

  document.querySelectorAll(".access-code-inputs input").forEach((input) => {
    input.value = "";
  });

  if (recordAccessModal) {
    recordAccessModal.classList.add("show");
    recordAccessModal.setAttribute("aria-hidden", "false");
  }

  if (accessReason) {
    accessReason.focus();
  }

  startAccessCodeTimer();
}

function openRoleRestrictedModal(card, backendMessage = "Access denied (RBAC)") {
  pendingRecordPatientId = card.dataset.patientId || "";
  sessionStorage.setItem("restrictedAccessPatient", JSON.stringify({
    id: pendingRecordPatientId,
    name: card.dataset.patientName || "Patient",
    backendMessage
  }));

  const restrictedSummary = roleRestrictedModal?.querySelector(".role-restricted-card > p");
  const restrictedNote = roleRestrictedModal?.querySelector(".role-note p");

  if (restrictedSummary) {
    restrictedSummary.textContent = backendMessage;
  }

  if (restrictedPatientId) {
    restrictedPatientId.textContent = `ID: ${pendingRecordPatientId || "#8821"}`;
  }

  if (restrictedNote) {
    restrictedNote.innerHTML = `Backend authorization result: ${backendMessage}. Access to patient records is restricted based on role-based access control (RBAC) for <strong id="restrictedPatientId">ID: ${pendingRecordPatientId || "#8821"}</strong>.`;
  }

  if (roleRestrictedModal) {
    roleRestrictedModal.classList.add("show");
    roleRestrictedModal.setAttribute("aria-hidden", "false");
  }
}

function closeRoleRestrictedModal() {
  if (roleRestrictedModal) {
    roleRestrictedModal.classList.remove("show");
    roleRestrictedModal.setAttribute("aria-hidden", "true");
  }
}

function closeAccessVerification() {
  stopAccessCodeTimer();

  if (recordAccessModal) {
    recordAccessModal.classList.remove("show");
    recordAccessModal.setAttribute("aria-hidden", "true");
  }
}

function showAccessGranted() {
  closeAccessVerification();

  if (accessGrantedModal) {
    accessGrantedModal.classList.add("show");
    accessGrantedModal.setAttribute("aria-hidden", "false");
  }
}

function closeAccessGranted() {
  if (accessGrantedModal) {
    accessGrantedModal.classList.remove("show");
    accessGrantedModal.setAttribute("aria-hidden", "true");
  }
}

function closeAccessDenied() {
  if (accessDeniedModal) {
    accessDeniedModal.classList.remove("show");
    accessDeniedModal.setAttribute("aria-hidden", "true");
  }
}

function showAccessDenied(message = "Incorrect or expired verification code. Please ensure you have entered the 6-digit code sent to your registered device.") {
  closeAccessVerification();
  accessAttemptsLeft = Math.max(accessAttemptsLeft - 1, 0);

  if (remainingAttempts) {
    remainingAttempts.textContent = accessAttemptsLeft;
  }

  if (tryAgainButton) {
    tryAgainButton.disabled = accessAttemptsLeft === 0;
    tryAgainButton.textContent = accessAttemptsLeft === 0 ? "No Attempts Left" : "Try Again";
  }

  if (accessDeniedModal) {
    const deniedMessage = accessDeniedModal.querySelector("p");

    if (deniedMessage) {
      deniedMessage.textContent = message;
    }

    accessDeniedModal.classList.add("show");
    accessDeniedModal.setAttribute("aria-hidden", "false");
  }
}

function isValidAccessReason(reason) {
  const trimmedReason = reason.trim();
  const letters = trimmedReason.replace(/[^a-z]/gi, "");

  return trimmedReason.length >= 10
    && /\s/.test(trimmedReason)
    && /[aeiou]/i.test(trimmedReason)
    && letters.length >= 6
    && !/(.)\1{4,}/.test(trimmedReason);
}

recordCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest("button")) {
      selectRecordCard(card);
    }
  });
});

document.querySelectorAll("[data-close-access]").forEach((button) => {
  button.addEventListener("click", closeAccessVerification);
});

document.querySelectorAll(".access-code-inputs input").forEach((input, index, inputs) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");

    if (input.value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
      inputs[index - 1].focus();
    }
  });
});

if (accessVerificationForm) {
  accessVerificationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reason = accessReason ? accessReason.value.trim() : "";
    const code = Array.from(document.querySelectorAll(".access-code-inputs input")).map((input) => input.value).join("");

    if (!reason) {
      accessMessage.className = "access-message error";
      accessMessage.textContent = "Enter a reason for access.";
      return;
    }

    if (code.length !== 6) {
      accessMessage.className = "access-message error";
      accessMessage.textContent = "Enter the 6-digit authentication code.";
      return;
    }

    if (accessCodeSecondsLeft === 0) {
      showAccessDenied();
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("currentUser") || '{"username":"DR-1040","role":"doctor"}');
    const result = await viewMedicalRecordFromBackend(user, pendingRecordPatientId, reason, code);

    accessMessage.className = `access-message ${result.status === "success" ? "success" : "error"}`;
    accessMessage.textContent = result.message;

    if (result.status === "success") {
      sessionStorage.setItem("selectedPatientId", pendingRecordPatientId);
      sessionStorage.setItem("selectedMedicalRecordResult", JSON.stringify(result.data));
      showAccessGranted();
      return;
    }

    if (result.message === "OTP failed") {
      showAccessDenied(result.message);
    }
  });
}

if (resendAccessCodeButton && accessResendMessage) {
  resendAccessCodeButton.addEventListener("click", () => {
    startAccessCodeTimer();
    accessResendMessage.textContent = "A new authentication code was sent.";
  });
}

if (continueRecordButton) {
  continueRecordButton.addEventListener("click", () => {
    window.location.href = "medical-record.html";
  });
}

if (backPatientsButton) {
  backPatientsButton.addEventListener("click", closeAccessGranted);
}

if (returnPatientsButton) {
  returnPatientsButton.addEventListener("click", closeRoleRestrictedModal);
}

if (requestAuthorizedAccessButton) {
  requestAuthorizedAccessButton.addEventListener("click", () => {
    window.location.href = "reception-access-request.html";
  });
}

function loadAccessRequestPage() {
  let patient = { id: "PT-1029", name: "Nora Alkuwaihes" };

  try {
    patient = {
      ...patient,
      ...JSON.parse(sessionStorage.getItem("restrictedAccessPatient"))
    };
  } catch (error) {
    patient = { id: "PT-1029", name: "Nora Alkuwaihes" };
  }

  setText("#requestPatientName", patient.name);
  setText("#requestPatientId", patient.id);
}

if (document.querySelector(".reception-access-request-page")) {
  loadAccessRequestPage();

  if (auditToast) {
    setTimeout(() => {
      auditToast.hidden = true;
    }, 2000);
  }
}

if (requestSubmittedToast && sessionStorage.getItem("showAccessRequestSubmitted") === "true") {
  requestSubmittedToast.hidden = false;
  sessionStorage.removeItem("showAccessRequestSubmitted");
  setTimeout(() => {
    requestSubmittedToast.hidden = true;
  }, 1000);
}

if (requestAccessForm) {
  requestAccessForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const reason = requestAccessReason ? requestAccessReason.value.trim() : "";
    const result = await requestRecordAccessFromBackend(reason);

    if (result.status !== "success") {
      requestFormMessage.className = "request-form-message error";
      requestFormMessage.textContent = result.message;
      return;
    }

    requestFormMessage.className = "request-form-message success";
    requestFormMessage.textContent = result.message;
    sessionStorage.setItem("showAccessRequestSubmitted", "true");
    window.location.href = "reception-patient-profile.html";
  });
}

if (tryAgainButton) {
  tryAgainButton.addEventListener("click", () => {
    if (accessAttemptsLeft === 0) {
      return;
    }

    closeAccessDenied();

    if (recordAccessModal) {
      recordAccessModal.classList.add("show");
      recordAccessModal.setAttribute("aria-hidden", "false");
    }

    document.querySelectorAll(".access-code-inputs input").forEach((input) => {
      input.value = "";
    });

    startAccessCodeTimer();
  });
}

if (deniedCancelButton) {
  deniedCancelButton.addEventListener("click", closeAccessDenied);
}

function getSharingSetupState() {
  try {
    return JSON.parse(sessionStorage.getItem("sharingSetup")) || {};
  } catch (error) {
    return {};
  }
}

function saveSharingSetupState(updates = {}) {
  const currentState = getSharingSetupState();
  const permissions = {};

  permissionInputs.forEach((input) => {
    permissions[input.dataset.permission] = input.checked;
  });

  sessionStorage.setItem("sharingSetup", JSON.stringify({
    ...currentState,
    permissions,
    ...updates
  }));
}

function clearSharingValidation() {
  if (sharingValidationAlert) {
    sharingValidationAlert.classList.remove("show");
  }
}

function showSharingValidation(title, message) {
  if (sharingValidationTitle) {
    sharingValidationTitle.textContent = title;
  }

  if (sharingValidationMessage) {
    sharingValidationMessage.textContent = message;
  }

  if (sharingValidationAlert) {
    sharingValidationAlert.classList.add("show");
  }
}

function getSharingSetupValidation() {
  const missing = [];

  if (!document.querySelector(".provider-card.selected")) {
    missing.push("provider");
  }

  if (!document.querySelector(".duration-options button.selected")) {
    missing.push("access duration");
  }

  if (!Array.from(permissionInputs).some((input) => input.checked)) {
    missing.push("permission scope");
  }

  if (!missing.length) {
    return null;
  }

  const missingText = formatMissingLabels(missing);

  return {
    title: `${missingText.charAt(0).toUpperCase()}${missingText.slice(1)} ${missing.length === 1 ? "is" : "are"} required.`,
    message: "Complete the missing setup details before selecting data."
  };
}

function addProviderCheck(card) {
  if (!card.querySelector("i")) {
    const check = document.createElement("i");
    check.textContent = "✓";
    card.appendChild(check);
  }
}

function addDurationCheck(button) {
  if (!button.querySelector("i")) {
    const check = document.createElement("i");
    check.textContent = "✓";
    button.appendChild(check);
  }
}

function getSharingDurationMs(duration) {
  const durations = {
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000
  };

  return durations[duration] || 0;
}

function formatSharingExpiry(date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

function updateSharingExpiry(duration) {
  if (!sharingExpiresAt) {
    return;
  }

  const durationMs = getSharingDurationMs(duration);

  if (!durationMs) {
    sharingExpiresAt.textContent = "Select a duration";
    return;
  }

  const issuedAt = new Date(2026, 4, 3, 9, 30);
  sharingExpiresAt.textContent = formatSharingExpiry(new Date(issuedAt.getTime() + durationMs));
}

function saveActiveSharingSession(resultData = {}) {
  const state = getSharingSetupState();
  const duration = state.duration || "24h";
  const durationMs = getSharingDurationMs(duration) || getSharingDurationMs("24h");
  const issuedAt = Date.now();
  const expiresAt = resultData.expiresAt ? new Date(resultData.expiresAt).getTime() : issuedAt + durationMs;

  sessionStorage.setItem("activeSharingSession", JSON.stringify({
    consentId: resultData.consentId,
    duration,
    issuedAt,
    expiresAt,
    providerId: state.providerId,
    providerName: getProviderNameFromSharingData(state.providerId),
    recordIds: state.selectedRecordIds || [],
    sharedRecords: shareRecordDataCache?.medicalRecords?.filter((record) => {
      return (state.selectedRecordIds || []).includes(record.recordId);
    }) || []
  }));
}

function getActiveSharingSession() {
  try {
    const savedSession = JSON.parse(sessionStorage.getItem("activeSharingSession"));

    if (savedSession?.issuedAt && savedSession?.expiresAt) {
      return savedSession;
    }
  } catch (error) {
    // Fall back to the current setup below.
  }

  const state = getSharingSetupState();
  const duration = state.duration || "24h";
  const durationMs = getSharingDurationMs(duration) || getSharingDurationMs("24h");
  const issuedAt = Date.now();
  const fallbackSession = {
    duration,
    issuedAt,
    expiresAt: issuedAt + durationMs,
    providerId: state.providerId || "DR-8829"
  };

  sessionStorage.setItem("activeSharingSession", JSON.stringify(fallbackSession));
  return fallbackSession;
}

function formatSharingRemaining(milliseconds) {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
}

function getSharingPatientId() {
  return "PT-1029";
}

function getProviderNameFromSharingData(providerId) {
  const provider = shareRecordDataCache?.providers?.find((item) => item.providerId === providerId);
  return provider ? provider.name : providerId || "";
}

function getSharingDurationLabel(duration) {
  const durationLabels = {
    "1h": "1 Hour",
    "24h": "24 Hours",
    "7d": "7 Days"
  };

  return durationLabels[duration] || duration || "24 Hours";
}

function getSharingRecordCategory(record) {
  const type = String(record.type || "").toLowerCase();

  if (type.includes("lab") || type.includes("imaging")) {
    return "labs";
  }

  if (type.includes("medication") || type.includes("prescription")) {
    return "medications";
  }

  return "history";
}

function getSharingCategoryTitle(category) {
  const titles = {
    history: "Basic Medical History",
    labs: "Lab Results",
    medications: "Medication History"
  };

  return titles[category] || "Medical Record";
}

function getSharingCategoryRisk(category) {
  const risks = {
    history: { label: "Low Risk", className: "risk-low" },
    labs: { label: "Med Risk", className: "risk-med" },
    medications: { label: "High Risk", className: "risk-high" }
  };

  return risks[category] || risks.history;
}

function renderShareProviderCards(data) {
  const providerList = document.querySelector(".provider-list");

  if (!providerList || !data?.providers?.length) {
    return;
  }

  providerList.innerHTML = data.providers.map((provider) => {
    const providerType = String(provider.type || "").toLowerCase();
    const avatarClass = providerType.includes("facility") ? "facility" : "doctor";

    return `
      <button class="provider-card" type="button" data-provider-id="${provider.providerId}">
        <span class="provider-avatar ${avatarClass}"></span>
        <strong>${provider.name}</strong>
        <small>${provider.type}</small>
        <em>ID: ${provider.providerId}</em>
      </button>
    `;
  }).join("");

  providerCards = document.querySelectorAll(".provider-card");
}

function attachSharingProviderHandlers() {
  providerCards.forEach((card) => {
    card.addEventListener("click", () => {
      providerCards.forEach((item) => {
        item.classList.remove("selected");
        const check = item.querySelector("i");
        if (check) {
          check.remove();
        }
      });

      card.classList.add("selected");
      addProviderCheck(card);
      clearSharingValidation();
      saveSharingSetupState({ providerId: card.dataset.providerId });
    });
  });
}

function renderSharingDataSelection(data) {
  const dataCardGrid = document.querySelector(".data-card-grid");

  if (!dataCardGrid || !data?.medicalRecords?.length) {
    return;
  }

  const recordsByCategory = data.medicalRecords.reduce((groups, record) => {
    const category = getSharingRecordCategory(record);
    groups[category] = groups[category] || [];
    groups[category].push(record);
    return groups;
  }, {});

  dataCardGrid.innerHTML = Object.entries(recordsByCategory).map(([category, records]) => {
    const risk = getSharingCategoryRisk(category);

    return `
      <article class="data-category-card">
        <div class="data-category-head">
          <span class="category-icon blue">+</span>
          <div>
            <h2>${getSharingCategoryTitle(category)}</h2>
            <p>Loaded from backend share record</p>
          </div>
          <em class="${risk.className}">${risk.label}</em>
        </div>
        ${records.map((record) => `
          <label class="data-record-row">
            <div><strong>${record.type}</strong><p>${record.data}</p></div>
            <input type="checkbox" data-category="${category}" data-record-id="${record.recordId}" checked />
          </label>
        `).join("")}
      </article>
    `;
  }).join("");
}

function getSelectedSharingRecordIds() {
  return getSelectedDataInputs()
    .map((input) => input.dataset.recordId)
    .filter(Boolean);
}

async function initializeSharingPortalPage() {
  if (!document.querySelector(".sharing-content")) {
    return;
  }

  const data = await loadShareRecordData(getSharingPatientId());
  renderShareProviderCards(data);
  restoreSharingSetupState();
  attachSharingProviderHandlers();
}

async function initializeSharingDataSelectionPage() {
  if (!dataSelectionContent) {
    return;
  }

  const data = await loadShareRecordData(getSharingPatientId());
  renderSharingDataSelection(data);
  applySharingPermissionsToDataSelection();
  updateSharingContextPill();

  document.querySelectorAll(".data-record-row input[data-category]").forEach((input) => {
    input.addEventListener("change", () => {
      if (dataSelectionAlert) {
        dataSelectionAlert.classList.remove("show");
      }

      updatePrivacySummary();
    });
  });
}

function updateSharingMonitor() {
  if (!sharingTimeRemaining || !sharingProgressBar) {
    return;
  }

  const session = getActiveSharingSession();
  const totalMs = Math.max(session.expiresAt - session.issuedAt, 1);
  const remainingMs = Math.max(session.expiresAt - Date.now(), 0);
  const remainingPercent = Math.max(Math.min((remainingMs / totalMs) * 100, 100), 0);

  sharingTimeRemaining.textContent = formatSharingRemaining(remainingMs);
  sharingProgressBar.style.background = `linear-gradient(90deg, var(--green) ${remainingPercent}%, #dfe5ec ${remainingPercent}%)`;

  if (sharingTimeUnit) {
    sharingTimeUnit.textContent = session.duration === "1h" ? "Hour" : "Hours";
  }

  if (sharingRevokeText) {
    const durationLabels = {
      "1h": "1-hour",
      "24h": "24-hour",
      "7d": "7-day"
    };
    sharingRevokeText.textContent = remainingMs > 0
      ? `Immediately terminate access before the ${durationLabels[session.duration] || "selected"} expiry.`
      : "This sharing session has expired.";
  }

  if (remainingMs === 0) {
    clearInterval(sharingMonitorInterval);
  }
}

function renderSharingSessionDetails() {
  const session = getActiveSharingSession();
  const providerName = session.providerName || getProviderNameFromSharingData(session.providerId);
  const selectedRecords = session.sharedRecords || [];
  const expiresAt = session.expiresAt ? formatSharingExpiry(new Date(session.expiresAt)) : "";

  document.querySelectorAll(".sharing-success-recipient strong, .recipient-box strong").forEach((element) => {
    element.textContent = providerName || "Selected provider";
  });

  const successText = document.querySelector(".sharing-success-hero p");
  if (successText) {
    successText.textContent = `${providerName || "The selected provider"} now has temporary access to ${selectedRecords.length || 1} backend medical record${selectedRecords.length === 1 ? "" : "s"}.`;
  }

  const accessWindow = document.querySelector(".access-window-box strong");
  if (accessWindow && expiresAt) {
    accessWindow.textContent = `Expires ${expiresAt}`;
  }

  const timestamp = document.querySelector(".security-audit-entry dd");
  if (timestamp && session.issuedAt) {
    timestamp.textContent = formatSharingExpiry(new Date(session.issuedAt));
  }

  const footer = document.querySelector(".sharing-success-footer");
  if (footer && session.consentId) {
    footer.textContent = `UC-11 Secure Transaction System - Consent ID: ${session.consentId}`;
  }

  const sharedDataCard = document.querySelector(".shared-data-card");
  if (sharedDataCard && selectedRecords.length) {
    const heading = sharedDataCard.querySelector(".monitor-side-head")?.outerHTML || "";
    sharedDataCard.innerHTML = `
      ${heading}
      ${selectedRecords.map((record) => `
        <div class="shared-data-item"><span>+</span><div><strong>${record.type}</strong><p>${record.data}</p></div></div>
      `).join("")}
    `;

    const count = sharedDataCard.querySelector(".monitor-side-head span");
    if (count) {
      count.textContent = `${selectedRecords.length} ${selectedRecords.length === 1 ? "Item" : "Items"}`;
    }
  }
}

if (sharingTimeRemaining) {
  renderSharingSessionDetails();
  updateSharingMonitor();
  clearInterval(sharingMonitorInterval);
  sharingMonitorInterval = setInterval(updateSharingMonitor, 1000);
}

if (document.querySelector(".sharing-success-content")) {
  renderSharingSessionDetails();
}

function restoreSharingSetupState() {
  const state = getSharingSetupState();

  if (state.providerId) {
    providerCards.forEach((card) => {
      if (card.dataset.providerId === state.providerId) {
        card.classList.add("selected");
        addProviderCheck(card);
      }
    });
  }

  if (state.duration) {
    durationButtons.forEach((button) => {
      if (button.dataset.duration === state.duration) {
        button.classList.add("selected");
        addDurationCheck(button);
        updateSharingExpiry(button.dataset.duration);
      }
    });
  } else {
    updateSharingExpiry("");
  }

  if (state.permissions) {
    permissionInputs.forEach((input) => {
      input.checked = Boolean(state.permissions[input.dataset.permission]);
    });
  }
}

durationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    durationButtons.forEach((item) => {
      item.classList.remove("selected");
      const check = item.querySelector("i");
      if (check) {
        check.remove();
      }
    });
    button.classList.add("selected");
    addDurationCheck(button);
    clearSharingValidation();
    updateSharingExpiry(button.dataset.duration);
    saveSharingSetupState({ duration: button.dataset.duration });
  });
});

permissionInputs.forEach((input) => {
  input.addEventListener("change", () => {
    clearSharingValidation();
    saveSharingSetupState();
  });
});

if (selectSharingDataButton) {
  selectSharingDataButton.addEventListener("click", () => {
    const validation = getSharingSetupValidation();

    if (validation) {
      showSharingValidation(validation.title, validation.message);
      return;
    }

    saveSharingSetupState();
    window.location.href = "sharing-data-selection.html";
  });
}

function applySharingPermissionsToDataSelection() {
  if (!dataSelectionContent) {
    return;
  }

  const state = getSharingSetupState();
  const permissions = state.permissions || {};

  document.querySelectorAll(".data-record-row input[data-category]").forEach((input) => {
    input.checked = Boolean(permissions[input.dataset.category]);
  });

  updatePrivacySummary();
}

function getSelectedDataInputs() {
  return Array.from(document.querySelectorAll(".data-record-row input[data-category]")).filter((input) => input.checked);
}

function updatePrivacySummary() {
  if (!dataSelectionContent) {
    return;
  }

  const selectedInputs = getSelectedDataInputs();
  const categories = new Set(selectedInputs.map((input) => input.dataset.category));
  const risk = categories.has("medications") ? "High" : categories.has("labs") ? "Medium" : selectedInputs.length ? "Low" : "None";

  if (sharedRecordCount) {
    sharedRecordCount.textContent = `${selectedInputs.length} ${selectedInputs.length === 1 ? "record" : "records"}`;
  }

  if (sharedCategoryCount) {
    sharedCategoryCount.textContent = `${categories.size} ${categories.size === 1 ? "category" : "categories"}`;
  }

  if (privacyRiskLevel) {
    privacyRiskLevel.textContent = risk;
  }
}

function updateSharingContextPill() {
  if (!dataSelectionContent) {
    return;
  }

  const state = getSharingSetupState();

  if (sharingWithProvider) {
    sharingWithProvider.textContent = getProviderNameFromSharingData(state.providerId);
  }

  if (sharingWithDuration) {
    sharingWithDuration.textContent = state.duration || "24h";
  }

  if (sharingContextPill) {
    setTimeout(() => {
      sharingContextPill.hidden = true;
      sharingContextPill.style.display = "none";
    }, 1000);
  }
}

initializeSharingPortalPage();
initializeSharingDataSelectionPage();

if (authorizeSharingButton) {
  authorizeSharingButton.addEventListener("click", () => {
    if (!getSelectedDataInputs().length) {
      if (dataSelectionAlert) {
        dataSelectionAlert.classList.add("show");
      }

      return;
    }

    saveSharingSetupState({ selectedRecordIds: getSelectedSharingRecordIds() });
    window.location.href = "sharing-consent.html";
  });
}

document.querySelectorAll(".sharing-code-inputs input").forEach((input, index, inputs) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");

    if (input.value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }

    updateSharingConfirmButton();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
      inputs[index - 1].focus();
    }
  });
});

function getSharingCode() {
  return Array.from(document.querySelectorAll(".sharing-code-inputs input")).map((input) => input.value).join("");
}

function updateSharingConfirmButton() {
  if (!confirmSharingButton) {
    return;
  }

  confirmSharingButton.classList.toggle("ready", getSharingCode().length === 6);
}

function formatSharingPinTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function startSharingPinTimer() {
  if (!sharingPinTimer) {
    return;
  }

  clearInterval(sharingPinInterval);
  sharingPinSecondsLeft = 179;
  sharingPinTimer.textContent = formatSharingPinTime(sharingPinSecondsLeft);

  sharingPinInterval = setInterval(() => {
    sharingPinSecondsLeft = Math.max(sharingPinSecondsLeft - 1, 0);
    sharingPinTimer.textContent = formatSharingPinTime(sharingPinSecondsLeft);

    if (sharingPinSecondsLeft === 0) {
      clearInterval(sharingPinInterval);

      if (sharingSecurityMessage) {
        sharingSecurityMessage.className = "sharing-security-message error";
        sharingSecurityMessage.textContent = "Verification code expired. Please resend the PIN.";
      }
    }
  }, 1000);
}

startSharingPinTimer();

if (resendSharingCodeButton && sharingSecurityMessage) {
  resendSharingCodeButton.addEventListener("click", () => {
    startSharingPinTimer();
    sharingSecurityMessage.className = "sharing-security-message";
    sharingSecurityMessage.textContent = "A new verification code was sent.";
  });
}

async function loadConsentConfirmationPage() {
  if (!document.querySelector(".consent-content")) {
    return;
  }

  await loadShareRecordData(getSharingPatientId());

  const state = getSharingSetupState();
  const providerName = getProviderNameFromSharingData(state.providerId);
  const selectedRecords = shareRecordDataCache.medicalRecords?.filter((record) => {
    return state.selectedRecordIds?.includes(record.recordId);
  }) || [];
  const scopeCard = document.querySelector(".consent-scope-card");

  setText("#consentProviderName", providerName);
  setText("#consentDocumentProvider", providerName);
  setText("#consentDuration", getSharingDurationLabel(state.duration));

  if (scopeCard && selectedRecords.length) {
    const heading = scopeCard.querySelector("h2")?.outerHTML || "<h2>Shared Data Scope</h2>";
    scopeCard.innerHTML = `
      ${heading}
      ${selectedRecords.map((record) => `<p>${record.type}: ${record.data}</p>`).join("")}
      <p>Valid for: <span id="consentDuration">${getSharingDurationLabel(state.duration)}</span></p>
    `;
  }
}

loadConsentConfirmationPage();

if (sharingSecurityForm) {
  sharingSecurityForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (consentSignatureInput || consentAcknowledgeCheckbox) {
      const signature = consentSignatureInput ? consentSignatureInput.value.trim() : "";
      const data = shareRecordDataCache || await loadShareRecordData(getSharingPatientId());
      const patientName = data.patient?.name || "Nora Alkuwaihes";

      if (signature.toLowerCase() !== patientName.toLowerCase()) {
        sharingSecurityMessage.className = "sharing-security-message error";
        sharingSecurityMessage.textContent = `Type ${patientName} as the digital signature.`;
        return;
      }

      if (!consentAcknowledgeCheckbox?.checked) {
        sharingSecurityMessage.className = "sharing-security-message error";
        sharingSecurityMessage.textContent = "Confirm the consent acknowledgement before sharing.";
        return;
      }

      const user = JSON.parse(sessionStorage.getItem("currentUser") || '{"username":"PT-1029","role":"patient"}');
      const state = getSharingSetupState();
      const selectedRecordIds = state.selectedRecordIds?.length
        ? state.selectedRecordIds
        : [data.medicalRecords?.[0]?.recordId].filter(Boolean);
      const result = await shareMedicalRecordFromBackend(
        user,
        getSharingPatientId(),
        selectedRecordIds,
        state.providerId,
        true,
        "123456",
        state.duration || "24h",
        signature
      );

      sharingSecurityMessage.className = `sharing-security-message ${result.status === "success" ? "" : "error"}`;
      sharingSecurityMessage.textContent = result.message;

      if (result.status === "success") {
        saveActiveSharingSession(result.data);
        window.location.href = "sharing-monitor.html";
      }

      return;
    }

    const code = getSharingCode();

    if (code.length !== 6) {
      sharingSecurityMessage.className = "sharing-security-message error";
      sharingSecurityMessage.textContent = "Enter the 6-digit verification code.";
      return;
    }

    if (sharingPinTimer && sharingPinSecondsLeft === 0) {
      sharingSecurityMessage.className = "sharing-security-message error";
      sharingSecurityMessage.textContent = "Verification code expired. Please resend the PIN.";
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("currentUser") || '{"username":"PT-1029","role":"patient"}');
    const state = getSharingSetupState();
    const data = shareRecordDataCache || await loadShareRecordData(getSharingPatientId());
    const selectedRecordIds = state.selectedRecordIds?.length
      ? state.selectedRecordIds
      : [data.medicalRecords?.[0]?.recordId].filter(Boolean);
    const result = await shareMedicalRecordFromBackend(
      user,
      getSharingPatientId(),
      selectedRecordIds,
      state.providerId,
      true,
      code,
      state.duration || "24h"
    );

    sharingSecurityMessage.className = `sharing-security-message ${result.status === "success" ? "" : "error"}`;
    sharingSecurityMessage.textContent = result.message;

    if (result.status === "success") {
      saveActiveSharingSession(result.data);
      window.location.href = "sharing-monitor.html";
    }
  });
}

if (cancelSharingRequestButton) {
  cancelSharingRequestButton.addEventListener("click", () => {
    clearSharingSetupState();
    window.location.href = "sharing-cancelled.html";
  });
}

if (backSharingPortalButton) {
  backSharingPortalButton.addEventListener("click", () => {
    clearSharingSetupState();
  });
}

document.querySelectorAll(".choice:not(.disabled)").forEach((choice) => {
  choice.addEventListener("click", () => {
    clearTimeConflict();
    clearPatientRequiredAlert();

    const group = choice.closest("[data-choice-group]");

    if (group) {
      group.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected"));
    }

    if (choice.classList.contains("slot-choice")) {
      document.querySelectorAll(".slot-choice").forEach((item) => item.classList.remove("selected"));

      if (selectedDate === "Thu, May 21" && choice === conflictSlot) {
        choice.classList.add("conflict");
        selectedTime = choice.dataset.label;

        if (hasRequiredBookingDetails()) {
          showTimeConflictAlert();
        }

        updateBookingSelection();
        return;
      }

      selectedTime = choice.dataset.label;
    }

    if (choice.classList.contains("date-choice")) {
      selectedDate = choice.dataset.label;
      refreshBookedSlots();
    }

    choice.classList.add("selected");
    updateBookingSelection();
  });
});

if (reviewAppointmentButton) {
  reviewAppointmentButton.addEventListener("click", async () => {
    if (bookingBlockedActive) {
      return;
    }

    const patientId = patientIdInput ? patientIdInput.value.trim() : "";
    const reason = reasonSelect ? reasonSelect.value : "";

    const validation = getBookingValidation(patientId, reason);

    if (validation) {
      showBookingValidation(validation.title, validation.message);

      if (!patientId && patientIdInput) {
        patientIdInput.focus();
      }

      return;
    }

    if (hasUnavailableSelectedTime()) {
      showTimeConflictAlert();
      return;
    }

    reviewAppointmentButton.disabled = true;
    const originalButtonText = reviewAppointmentButton.innerHTML;
    reviewAppointmentButton.textContent = "Checking patient...";

    const patientValidation = await validateAppointmentPatientFromBackend(patientId);

    reviewAppointmentButton.disabled = false;
    reviewAppointmentButton.innerHTML = originalButtonText;

    if (patientValidation.status !== "success") {
      showBookingValidation(
        patientValidation.patientBlocked ? "Patient appointment access is blocked." : "Invalid Patient ID.",
        patientValidation.message || "This patient ID was not found in the backend."
      );

      if (patientIdInput) {
        patientIdInput.focus();
      }

      return;
    }

    savePendingBooking(patientId, reason);
    window.location.href = "confirm-booking.html";
  });
}

loadBookAppointmentPageFromBackend().then(() => {
  restorePendingBookingForm();
  refreshBookedSlots();
  updateUserChrome();
});

if (patientIdInput) {
  patientIdInput.addEventListener("input", () => {
    clearPatientRequiredAlert();
    clearConflictAlert();
  });
}

if (reasonSelect) {
  reasonSelect.addEventListener("change", () => {
    clearPatientRequiredAlert();
    clearConflictAlert();
  });
}

function getPendingBooking() {
  try {
    return {
      ...defaultBooking,
      ...JSON.parse(sessionStorage.getItem("pendingAppointment"))
    };
  } catch (error) {
    return defaultBooking;
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function loadConfirmBookingPage() {
  const booking = getPendingBooking();

  setText("#summaryDoctor", booking.doctor);
  setText("#summarySpecialty", booking.specialty);
  setText("#summaryDate", booking.date);
  setText("#summaryTime", booking.time);
  setText("#summaryPatientId", booking.patientId);
  setText("#summaryPatientName", booking.patientName);
  setText("#summaryReason", booking.reason);
}

if (document.querySelector(".confirm-content")) {
  loadConfirmBookingPage();
}

function buildAuditReference() {
  return `AUD-${Math.floor(100 + Math.random() * 900)}-XT`;
}

function formatBookingCooldown(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function setConfirmBookingButtonLabel(label) {
  if (confirmBookingButton?.firstChild) {
    confirmBookingButton.firstChild.nodeValue = `${label} `;
  }
}

function showBookingBlockedState(message = "We detected too many scheduling requests in a short period. For security, further actions are temporarily paused.", returnToStart = false) {
  clearTimeout(bookingProcessingTimer);
  clearInterval(bookingCooldownInterval);
  clearInterval(blockedRetryInterval);

  bookingRequestProcessing = false;
  bookingCooldownActive = false;
  bookingBlockedActive = true;
  backendRateLimitWarningActive = false;
  returnToAppointmentStartAfterVerification = returnToStart;

  if (rateLimitBanner) {
    rateLimitBanner.hidden = true;
  }

  if (blockedLimitBanner) {
    blockedLimitBanner.hidden = false;
    const blockedMessage = blockedLimitBanner.querySelector(".rate-limit-message p");

    if (blockedMessage) {
      blockedMessage.textContent = message;
    }
  }

  if (securityVerificationPanel) {
    securityVerificationPanel.hidden = false;
  }

  document.querySelector(".appointments-main")?.classList.add("security-blocked");

  if (confirmBookingButton) {
    confirmBookingButton.disabled = true;
  }

  if (reviewAppointmentButton) {
    reviewAppointmentButton.disabled = true;
  }

  setConfirmBookingButtonLabel("Security Locked");

  if (confirmMessage) {
    confirmMessage.className = "confirm-message error";
    confirmMessage.textContent = `${message} Complete security verification to continue.`;
  }

  let retrySeconds = 59;

  if (blockedRetryTimer) {
    blockedRetryTimer.textContent = formatBookingCooldown(retrySeconds);
  }

  blockedRetryInterval = setInterval(() => {
    retrySeconds -= 1;

    if (blockedRetryTimer) {
      blockedRetryTimer.textContent = formatBookingCooldown(Math.max(retrySeconds, 0));
    }

    if (retrySeconds <= 0) {
      clearInterval(blockedRetryInterval);
    }
  }, 1000);
}

function showBookingRateLimit(remainingAttempts = 2) {
  clearTimeout(bookingProcessingTimer);
  clearInterval(bookingCooldownInterval);

  bookingRequestProcessing = false;
  bookingCooldownActive = true;

  if (rateLimitBanner) {
    rateLimitBanner.hidden = false;
  }

  if (bookingAttemptsRemaining) {
    bookingAttemptsRemaining.textContent = `${remainingAttempts} / 5`;
  }

  if (confirmMessage) {
    confirmMessage.className = "confirm-message error";
    confirmMessage.textContent = "Too many booking requests were submitted while the first request was still processing.";
  }

  setConfirmBookingButtonLabel("Cooldown Active");

  let cooldownSeconds = 30;

  if (bookingCooldownTimer) {
    bookingCooldownTimer.textContent = formatBookingCooldown(cooldownSeconds);
  }

  bookingCooldownInterval = setInterval(() => {
    cooldownSeconds -= 1;

    if (bookingCooldownTimer) {
      bookingCooldownTimer.textContent = formatBookingCooldown(Math.max(cooldownSeconds, 0));
    }

    if (cooldownSeconds <= 0) {
      clearInterval(bookingCooldownInterval);
      bookingCooldownActive = false;

      if (rateLimitBanner) {
        rateLimitBanner.hidden = true;
      }

      if (reviewAppointmentButton) {
        reviewAppointmentButton.disabled = false;
      }

      setConfirmBookingButtonLabel("Book Appointment");

      if (confirmMessage) {
        confirmMessage.className = "confirm-message success";
        confirmMessage.textContent = "Cooldown complete. You can book the appointment again.";
      }
    }
  }, 1000);
}

function isBackendRateLimitResult(result) {
  return result?.status === "error" && /too many appointment requests/i.test(result.message || "");
}

function isPatientAppointmentBlockedResult(result) {
  return result?.patientBlocked || /patient.*blocked.*appointments/i.test(result?.message || "");
}

function showBackendRateLimitWarning(message) {
  clearTimeout(bookingProcessingTimer);
  clearInterval(bookingCooldownInterval);

  bookingRequestProcessing = false;
  bookingCooldownActive = false;
  backendRateLimitWarningActive = true;

  if (rateLimitBanner) {
    rateLimitBanner.hidden = false;
    const rateLimitMessage = rateLimitBanner.querySelector(".rate-limit-message p");

    if (rateLimitMessage) {
      rateLimitMessage.textContent = message;
    }
  }

  if (bookingAttemptsRemaining) {
    bookingAttemptsRemaining.textContent = "0 / 5";
  }

  setConfirmBookingButtonLabel("Try Again");

  if (confirmMessage) {
    confirmMessage.className = "confirm-message error";
    confirmMessage.textContent = message;
  }

  let cooldownSeconds = 59;

  if (bookingCooldownTimer) {
    bookingCooldownTimer.textContent = formatBookingCooldown(cooldownSeconds);
  }

  bookingCooldownInterval = setInterval(() => {
    cooldownSeconds -= 1;

    if (bookingCooldownTimer) {
      bookingCooldownTimer.textContent = formatBookingCooldown(Math.max(cooldownSeconds, 0));
    }

    if (cooldownSeconds <= 0) {
      clearInterval(bookingCooldownInterval);
    }
  }, 1000);
}

function handleSamePatientRateLimit(patientId) {
  const totalAttempts = registerLimitedSchedulingAttempt(patientId);
  const remainingAttempts = Math.max(5 - totalAttempts, 0);

  if (totalAttempts >= 5) {
    showBookingBlockedState();
    return;
  }

  showBookingRateLimit(remainingAttempts);
}

function getConfirmedBooking() {
  try {
    return {
      ...defaultBooking,
      auditId: "AUD-892-XT",
      ...JSON.parse(sessionStorage.getItem("confirmedAppointment"))
    };
  } catch (error) {
    return {
      ...defaultBooking,
      auditId: "AUD-892-XT"
    };
  }
}

function loadResultBookingPage() {
  const booking = getConfirmedBooking();

  setText("#resultPatientName", booking.patientName);
  setText("#resultAuditId", booking.auditId);
  setText("#resultDateTime", `${booking.date} • ${booking.time}`);
  setText("#resultDoctor", `${booking.doctor} (${booking.specialty})`);

  if (booking.backendAppointment?.appointment_id) {
    setText("#resultAuditId", `APT-${booking.backendAppointment.appointment_id}-${booking.auditId}`);
  }
}

if (document.querySelector(".result-content")) {
  loadResultBookingPage();
}

function loadMedicalRecordPage() {
  const patientId = sessionStorage.getItem("selectedPatientId") || "PT-1029";
  let backendRecord = { patient: null, records: [], prescriptions: [], testResults: [] };

  try {
    backendRecord = {
      ...backendRecord,
      ...JSON.parse(sessionStorage.getItem("selectedMedicalRecordResult") || "{}")
    };
  } catch (error) {
    backendRecord = { patient: null, records: [], prescriptions: [], testResults: [] };
  }

  renderBackendPatientProfile(backendRecord.patient, patientId);

  renderBackendMedicalRecordData(backendRecord);
}

function renderBackendPatientProfile(patient, fallbackPatientId) {
  const displayId = patient?.displayId || fallbackPatientId;
  const gender = patient?.gender || "Unknown";
  const avatar = document.querySelector(".record-patient-head .patient-avatar");
  const details = document.querySelector(".record-patient-head p");
  const vitalValues = document.querySelectorAll(".vital-grid strong");

  setText("#recordCrumbPatient", displayId);
  setText("#recordPatientId", displayId);
  setText("#recordPatientName", patient?.name || "Patient");

  if (details) {
    details.textContent = `${gender} - ${displayId}`;
  }

  if (avatar) {
    avatar.classList.toggle("avatar-man", gender === "Male");
    avatar.classList.toggle("avatar-woman", gender !== "Male");
  }

  if (vitalValues[0]) {
    vitalValues[0].innerHTML = `${patient?.age || "-"}<br />years`;
  }

  if (vitalValues[1]) {
    vitalValues[1].textContent = patient?.weight || "-";
  }

  if (vitalValues[2]) {
    vitalValues[2].innerHTML = (patient?.height || "-").replace(" ", "<br />");
  }

  if (vitalValues[3]) {
    vitalValues[3].textContent = patient?.bloodType || "-";
  }

  renderBackendBloodPressureTrend(patient?.bloodPressureTrend || []);
}

function toBloodPressureY(value, min, max) {
  if (max === min) {
    return 75;
  }

  return 128 - ((value - min) / (max - min)) * 92;
}

function renderBackendBloodPressureTrend(trend) {
  const chart = document.querySelector(".chart-area svg");
  const labels = document.querySelector(".chart-labels");

  if (!chart || !labels || !trend.length) {
    return;
  }

  const xPoints = [40, 100, 160, 220, 280, 330];
  const values = trend.flatMap((entry) => [entry.systolic, entry.diastolic]);
  const min = Math.min(...values) - 5;
  const max = Math.max(...values) + 5;
  const systolicPoints = trend.map((entry, index) => {
    return `${xPoints[index] || xPoints[xPoints.length - 1]},${toBloodPressureY(entry.systolic, min, max).toFixed(1)}`;
  });
  const diastolicPoints = trend.map((entry, index) => {
    return `${xPoints[index] || xPoints[xPoints.length - 1]},${toBloodPressureY(entry.diastolic, min, max).toFixed(1)}`;
  });
  const redLine = chart.querySelector(".chart-red");
  const blueLine = chart.querySelector(".chart-blue");
  const redPoints = chart.querySelector(".chart-points.red");
  const bluePoints = chart.querySelector(".chart-points.blue");

  if (redLine) {
    redLine.setAttribute("points", systolicPoints.join(" "));
  }

  if (blueLine) {
    blueLine.setAttribute("points", diastolicPoints.join(" "));
  }

  clearElement(redPoints);
  clearElement(bluePoints);

  trend.forEach((entry, index) => {
    const redCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const x = xPoints[index] || xPoints[xPoints.length - 1];

    redCircle.setAttribute("cx", x);
    redCircle.setAttribute("cy", toBloodPressureY(entry.systolic, min, max).toFixed(1));
    redCircle.setAttribute("r", "4");
    blueCircle.setAttribute("cx", x);
    blueCircle.setAttribute("cy", toBloodPressureY(entry.diastolic, min, max).toFixed(1));
    blueCircle.setAttribute("r", "4");

    redPoints?.appendChild(redCircle);
    bluePoints?.appendChild(blueCircle);
  });

  clearElement(labels);
  trend.forEach((entry) => {
    const label = document.createElement("span");
    label.textContent = entry.month;
    labels.appendChild(label);
  });
}

function clearElement(element) {
  if (element) {
    element.textContent = "";
  }
}

function createEmptyRecordState(message) {
  const item = document.createElement("div");
  item.className = "backend-record-empty";
  item.textContent = message;
  return item;
}

function renderBackendMedicalRecordData(data) {
  const labGrid = document.querySelector(".lab-grid");
  const medicationsWidget = document.querySelector(".medications-widget");
  const problemWidget = document.querySelector(".problem-widget");
  const labSubtitle = document.querySelector(".lab-widget .widget-head p");
  const verifiedRow = document.querySelector(".verified-row");

  if (labSubtitle) {
    labSubtitle.textContent = "Backend test results";
  }

  if (labGrid) {
    clearElement(labGrid);

    if (data.testResults.length) {
      data.testResults.forEach((test) => {
        const item = document.createElement("div");
        const type = document.createElement("small");
        const result = document.createElement("strong");
        const source = document.createElement("p");

        type.textContent = test.recordId;
        result.textContent = test.result;
        source.textContent = "Loaded from backend view record";

        item.append(type, result, source);
        labGrid.appendChild(item);
      });
    } else {
      labGrid.appendChild(createEmptyRecordState("No backend test results returned."));
    }
  }

  if (verifiedRow) {
    verifiedRow.textContent = "Verified by backend view-record module";
  }

  if (medicationsWidget) {
    medicationsWidget.querySelectorAll(".medication-item, .backend-record-empty").forEach((item) => item.remove());

    if (data.prescriptions.length) {
      data.prescriptions.forEach((prescription) => {
        const item = document.createElement("div");
        const icon = document.createElement("span");
        const content = document.createElement("div");
        const medication = document.createElement("strong");
        const details = document.createElement("p");
        const source = document.createElement("small");
        const status = document.createElement("em");

        item.className = "medication-item";
        icon.textContent = "+";
        medication.textContent = prescription.medication;
        details.textContent = `Linked record: ${prescription.recordId}`;
        source.textContent = "Loaded from backend prescriptions";
        status.textContent = "Active";

        content.append(medication, details, source);
        item.append(icon, content, status);
        medicationsWidget.appendChild(item);
      });
    } else {
      medicationsWidget.appendChild(createEmptyRecordState("No backend prescriptions returned."));
    }
  }

  if (problemWidget) {
    problemWidget.querySelectorAll(".problem-item, .backend-record-empty").forEach((item) => item.remove());

    if (data.records.length) {
      data.records.forEach((record) => {
        const item = document.createElement("div");
        const title = document.createElement("strong");
        const detail = document.createElement("p");
        const id = document.createElement("em");

        item.className = "problem-item";
        title.textContent = record.type;
        detail.textContent = record.data;
        id.textContent = record.recordId;

        item.append(title, detail, id);
        problemWidget.appendChild(item);
      });
    } else {
      problemWidget.appendChild(createEmptyRecordState("No backend medical records returned."));
    }
  }
}

if (recordContent) {
  loadMedicalRecordPage();
}

document.querySelectorAll(".pin-inputs input").forEach((input, index, inputs) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");

    if (input.value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
      inputs[index - 1].focus();
    }
  });
});

if (resendPinButton && confirmMessage) {
  resendPinButton.addEventListener("click", () => {
    confirmMessage.className = "confirm-message success";
    confirmMessage.textContent = "A new PIN was sent.";
  });
}

captchaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");

    if (verifyHumanButton) {
      verifyHumanButton.textContent = "Verify";
    }
  });
});

if (verifyHumanButton) {
  verifyHumanButton.addEventListener("click", () => {
    if (!humanCheck?.checked) {
      verifyHumanButton.textContent = "Check first";
      return;
    }

    clearInterval(blockedRetryInterval);
    bookingBlockedActive = false;

    if (blockedLimitBanner) {
      blockedLimitBanner.hidden = true;
    }

    if (securityVerificationPanel) {
      securityVerificationPanel.hidden = true;
    }

    if (verifiedToast) {
      verifiedToast.hidden = false;
    }

    document.querySelector(".appointments-main")?.classList.remove("security-blocked");

    if (returnToAppointmentStartAfterVerification) {
      sessionStorage.removeItem("pendingAppointment");
      sessionStorage.setItem("appointmentVerifiedNotice", "rate-limit");
      sessionStorage.setItem("appointmentBookingLockedUntil", String(Date.now() + 10 * 60 * 1000));
      window.location.href = "appointments.html";
      return;
    }

    if (confirmBookingButton) {
      confirmBookingButton.disabled = false;
    }

    if (reviewAppointmentButton) {
      reviewAppointmentButton.disabled = false;
    }

    setConfirmBookingButtonLabel("Book Appointment");

    if (confirmMessage) {
      confirmMessage.className = "confirm-message success";
      confirmMessage.textContent = "Security verification complete. You can submit the appointment again.";
    }
  });
}

if (confirmBookingForm) {
  confirmBookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (bookingBlockedActive) {
      return;
    }

    if (backendRateLimitWarningActive) {
      showBookingBlockedState("Too many appointment requests. Please wait before trying again.", true);
      return;
    }

    if (bookingRequestProcessing) {
      showBookingRateLimit();
      return;
    }

    const pin = Array.from(document.querySelectorAll(".pin-inputs input")).map((input) => input.value).join("");

    if (!acknowledgeCheckbox?.checked) {
      confirmMessage.className = "confirm-message error";
      confirmMessage.textContent = "Please acknowledge the audit log before confirming the booking.";
      return;
    }

    if (pin.length !== 4) {
      confirmMessage.className = "confirm-message error";
      confirmMessage.textContent = "Please enter the 4-digit verification PIN.";
      return;
    }

    bookingRequestProcessing = true;
    setConfirmBookingButtonLabel("Processing");
    if (confirmBookingButton) {
      confirmBookingButton.disabled = true;
    }

    confirmMessage.className = "confirm-message success";
    confirmMessage.textContent = "Booking request is processing. Please wait...";

    const booking = getPendingBooking();
    const user = JSON.parse(sessionStorage.getItem("currentUser") || '{"username":"Rahf Altwairqi","role":"receptionist"}');
    const doctor = booking.doctorId || booking.doctor;
    const time = `${booking.date} ${booking.time}`;
    const result = await scheduleAppointmentFromBackend(user, booking.patientId, doctor, time, booking.reason, pin);

    if (isPatientAppointmentBlockedResult(result)) {
      rememberPatientAppointmentBlock(booking.patientId, result.retryAfterSeconds);

      if (user.role === "patient") {
        window.location.href = "appointments.html";
        return;
      }

      confirmMessage.className = "confirm-message error";
      confirmMessage.textContent = result.message || patientAppointmentBlockedMessage;
      bookingRequestProcessing = false;
      setConfirmBookingButtonLabel("Book Appointment");
      if (confirmBookingButton) {
        confirmBookingButton.disabled = false;
      }
      return;
    }

    if (isBackendRateLimitResult(result)) {
      showBackendRateLimitWarning(result.message);
      if (confirmBookingButton) {
        confirmBookingButton.disabled = false;
      }
      return;
    }

    confirmMessage.className = `confirm-message ${result.status === "success" ? "success" : "error"}`;
    confirmMessage.textContent = result.message;

    if (result.status === "success") {
      const confirmedBooking = {
        ...booking,
        auditId: buildAuditReference(),
        backendAppointment: result.appointment || null
      };

      sessionStorage.setItem("confirmedAppointment", JSON.stringify(confirmedBooking));
      recordConfirmedBooking(confirmedBooking);

      window.location.href = "appointment-confirmed.html";
      return;
    }

    bookingRequestProcessing = false;
    setConfirmBookingButtonLabel("Book Appointment");
    if (confirmBookingButton) {
      confirmBookingButton.disabled = false;
    }
  });
}
