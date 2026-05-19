# Secure Healthcare Management System

Secure healthcare management system supporting appointment scheduling, secure medical record access, and protected patient data sharing.

This SWE 445 project focuses on building healthcare workflows with security controls such as role-based access control, OTP verification, consent, audit logging, input validation, and rate limiting.

The final implementation is a static HTML/CSS/JavaScript web application connected to a lightweight Node.js server and in-memory backend modules for the selected use cases.

## Team #7

| Name | ID |
| --- | --- |
| Shahad Sulais | 202181130 |
| Nora Alkuwaihes | 202171050 |
| Reem Abdelgawad | 202183010 |
| Rahf Altwairqi | 202156370 |

## Project Scope

The system is designed around secure handling of patient healthcare data. It supports:

- Secure login for patient, doctor, and receptionist roles
- Patient list and medical record viewing
- Appointment scheduling and confirmation
- Doctor availability validation
- Access verification before viewing records
- Patient consent before sharing medical information
- Time-limited medical record sharing with external providers
- Audit-style logs for sensitive actions
- Black-box test cases for implemented backend modules

## Implemented Use Cases

| Use Case | Feature | Main Security Controls |
| --- | --- | --- |
| UC-04 | Schedule Appointment | Role validation, authorization PIN, patient/doctor validation, duplicate appointment prevention, rate limiting, request logging |
| UC-08 | View Medical Record | Doctor-only RBAC, OTP verification, access reason validation, patient validation, audit logging |
| UC-11 | Share Medical Record | Patient-only access, OTP verification, consent check, provider validation, duplicate sharing prevention, optional digital signature, expiry time |

## Project Phases

This repository reflects the full SWE 445 project lifecycle:

### Phase 1: Software Requirements Specification

The team identified the security and privacy requirements for the As-Shifa system, including actors, use cases, misuse cases, mitigation use cases, and use case descriptions. The main actors considered in the system are patients, doctors, receptionists, healthcare providers, and insurance-related entities.

### Phase 2: Software Design

The design phase produced high-fidelity interface prototypes, database design concepts, and security design decisions for the selected use cases. The implementation follows the design ideas through role-based workflows, secure verification screens, patient identifiers, provider records, appointment records, consent records, and audit logs.

### Phase 3: Implementation

The selected use cases were implemented using HTML, CSS, JavaScript, and Node.js. The frontend pages demonstrate the healthcare workflows, while the backend modules simulate the business rules and security checks.

### Phase 4: Testing

Black-box testing was prepared and implemented for the backend modules. Tests cover successful flows and failure cases such as unauthorized roles, invalid OTP codes, invalid patients, unavailable doctors, duplicate appointments, missing consent, and duplicate record sharing.

### Phase 5: Final Report

The final phase combines the previous phases into one complete project report. This repository provides the implemented source code and can be used as the GitHub version of the project.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- In-memory JavaScript data stores for backend simulation

No external npm dependencies are required.

## Project Structure

```text
.
|-- index.html
|-- appointments.html
|-- book-appointment.html
|-- confirm-booking.html
|-- appointment-confirmed.html
|-- patients.html
|-- medical-record.html
|-- record-sharing.html
|-- sharing-*.html
|-- styles.css
|-- website.js
|-- website-server.js
|-- backend-adapter.js
`-- backend-source/
    |-- appointment/
    |   |-- appointmentData.js
    |   |-- scheduleAppointment.js
    |   `-- appointmentTest.js
    |-- viewRecord/
    |   |-- viewData.js
    |   |-- viewMedicalRecord.js
    |   `-- viewTest.js
    `-- shareRecord/
        |-- shareData.js
        |-- shareMedicalRecord.js
        `-- shareTest.js
```

## How to Run

Make sure Node.js is installed, then run:

```bash
node website-server.js
```

Open the local URL shown in the terminal. By default, the app runs at:

```text
http://localhost:5500
```

If port `5500` is already in use, the server automatically tries the next port.

## Demo Accounts

| Role | Username | Password |
| --- | --- | --- |
| Doctor | `DR-1040` | `D$r7878&` |
| Receptionist | `RC-1042` | `S$a$S2021&2026` |
| Patient | `PT-1029` | `&N$r2003&` |

The demo verification codes used by the prototype are:

- Appointment authorization PIN: `1234`
- Medical record OTP: `123456`
- Record sharing OTP: `123456`

## Running Tests

Run each backend module test with Node.js:

```bash
node backend-source/appointment/appointmentTest.js
node backend-source/viewRecord/viewTest.js
node backend-source/shareRecord/shareTest.js
```

The tests print the result of each black-box scenario to the terminal.

## Security Features

- Role-based access control for doctor, receptionist, and patient workflows
- OTP checks before sensitive record access and sharing
- Patient consent and digital signature support for sharing medical records
- Time-limited access expiry for shared records
- Rate limiting for appointment requests
- Duplicate appointment and duplicate sharing prevention
- Input validation for patient IDs, reasons, providers, records, doctors, dates, and PINs
- Audit logs for medical record viewing, appointment scheduling, and sharing actions

## Notes

This is an academic prototype. The backend uses in-memory data for demonstration and testing, so data resets when the Node.js process restarts. A production healthcare system would require a secure database, encrypted storage, stronger authentication, server-side session management, complete authorization policies, and compliance review.
