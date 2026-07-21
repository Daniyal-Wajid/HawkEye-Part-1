# HawkEye
## AI-Powered Campus Discipline Monitoring and Violation Management System


## Overview

HawkEye is an intelligent AI-based campus discipline monitoring system developed for educational institutions. The system combines Artificial Intelligence, Computer Vision, Facial Recognition, and Data Analytics to automate campus surveillance, detect disciplinary violations, maintain student records, and improve institutional safety.

Traditional campus monitoring relies heavily on manual supervision by security staff and administrators. These methods are time-consuming, inconsistent, and difficult to scale for large educational environments.

HawkEye addresses these limitations by analyzing CCTV/IP camera streams in real time, automatically identifying violations, capturing evidence, linking incidents with student profiles, and providing administrators with a centralized management dashboard.

The system aims to create a safer, more transparent, and accountable educational environment by reducing manual monitoring efforts and enabling faster administrative decision-making.


---

# Project Objectives

The main objectives of HawkEye are:

- Develop an AI-based video analysis system for campus discipline monitoring.
- Detect violations automatically using computer vision models.
- Capture evidence images and store incident details securely.
- Maintain digital disciplinary profiles of students.
- Automate penalty and fine calculation based on institutional policies.
- Provide administrators with real-time monitoring and analytics.
- Improve campus safety through intelligent surveillance automation.


---

# Core Features


## 1. Real-Time AI Video Monitoring

HawkEye connects with CCTV/IP cameras and continuously analyzes video streams.

Capabilities:

- Real-time camera feed processing.
- Automated activity monitoring.
- Multiple camera stream support.
- Detection based on trained AI models.
- Evidence capture when violations occur.
- Real-time incident reporting.


Technology Stack:

- Python
- OpenCV
- YOLO
- TensorFlow
- Ultralytics


---

# 2. AI-Based Violation Detection

HawkEye detects different categories of campus violations.


## Fighting Detection

The system analyzes human activities and identifies physical conflicts or aggressive behavior.

Features:

- Real-time fight detection.
- AI-based classification.
- Evidence generation.
- Incident logging.


## Weapon Detection

The system detects prohibited objects using trained object detection models.

Examples:

- Guns
- Weapons
- Restricted objects


## Uniform and Dress Code Detection

The system identifies violations related to institutional dress policies.

Features:

- Student appearance analysis.
- Policy-based verification.
- Violation recording.


## Smoking Detection

The system identifies smoking-related activities in restricted areas.


Future violation categories can be added by training additional AI models.


---

# 3. Student Identification and Profile Management

HawkEye maintains digital disciplinary records for students.

Features:

- Student identification.
- Violation history tracking.
- Profile-based discipline records.
- Penalty history.
- Administrative review.


Student records include:

- Student information.
- Violation type.
- Date and time.
- Location.
- Evidence.
- Penalty status.


---

# 4. Violation Logging System

Every detected violation is stored with complete information.

Stored information includes:

- Unique incident ID.
- Violation category.
- Detection timestamp.
- Camera location.
- Evidence image/video.
- Student information.
- Verification status.
- Penalty information.


Administrators can:

- Review incidents.
- Approve violations.
- Reject false detections.
- Modify records according to institutional policies.


---

# 5. Automated Penalty Management

HawkEye provides policy-based penalty management.

Features:

- Automatic penalty calculation.
- Rule-based violation handling.
- Fine management.
- Student penalty history.
- Administrator approval.


Administrators can:

- Create penalty rules.
- Update policies.
- Approve penalties.
- Modify incorrect penalties.


---

# 6. Administrative Dashboard

The web dashboard provides centralized control over the complete system.


Dashboard Features:

- Live monitoring.
- Incident review.
- Student management.
- Camera management.
- Violation analytics.
- Reports generation.
- Policy configuration.
- User management.


---

# 7. Notification and Alert System

HawkEye provides real-time notifications for important incidents.

Alerts include:

- Serious violation detection.
- Security notifications.
- Administrative warnings.
- Incident updates.


Notification channels can include:

- Dashboard alerts.
- Email notifications.
- SMS notifications.
- Mobile notifications.


---

# System Architecture


```
                         CCTV / IP Cameras
                                |
                                |
                                v

                    AI Processing Engine
                    (YOLO + OpenCV)

                                |
                                |

                    Violation Detection

                                |
                                |

                         Backend Server

              --------------------------------

              |                              |

              v                              v

        Supabase Database            Evidence Storage

              |

              |

              v

        Web Administrative Dashboard

              |

              |

              v

       Administrators / Security Staff
```


---

# Repository Structure


```
HawkEye-Part-1/

│
├── ai/
│   │
│   ├── models/
│   ├── video_pipeline.py
│   ├── enroll.py
│   ├── ai_server.py
│   └── requirements_yolo.txt
│
│
├── backend/
│   │
│   ├── server.js
│   ├── db/
│   ├── scripts/
│   └── supabase/
│
│
├── frontend/
│   │
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
│
├── mobileApp/
│
│
├── datasets/
│
│
├── Other Artifacts/
│   │
│   ├── Documents/
│   ├── Old docs/
│   └── Archives/
│
│
└── README.md

```


---

# Technology Stack


## Artificial Intelligence


| Technology | Purpose |
|------------|---------|
| Python | AI development |
| YOLO | Object and behavior detection |
| OpenCV | Video processing |
| TensorFlow | Deep learning models |
| Ultralytics | YOLO implementation |
| Face Recognition | Student identification |



## Backend


| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | API development |
| Supabase | Database and authentication |
| REST API | Communication layer |



## Frontend


| Technology | Purpose |
|------------|---------|
| React.js | Web dashboard |
| JavaScript | Application logic |
| CSS | Interface design |



## Database


| Technology | Purpose |
|------------|---------|
| Supabase PostgreSQL | Data storage |
| Cloud Storage | Evidence storage |


---

# Installation Guide


## System Requirements


Recommended:

- Windows 10/11 or Linux
- Python 3.10+
- Node.js 18+
- Minimum 8GB RAM
- GPU recommended for AI processing
- Stable internet connection


---

# Clone Repository


```bash
git clone https://github.com/Daniyal-Wajid/HawkEye-Part-1.git

cd HawkEye-Part-1
```


---

# AI Module Setup


Navigate:

```bash
cd ai
```


Create Python environment:

```bash
python -m venv venv
```


Activate environment:


Windows:

```bash
venv\Scripts\activate
```


Linux:

```bash
source venv/bin/activate
```


Install dependencies:

```bash
pip install -r requirements_yolo.txt
```


Run AI server:

```bash
python ai_server.py
```


---

# Backend Setup


Navigate:

```bash
cd backend
```


Install dependencies:

```bash
npm install
```


Create `.env` file:

```
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
```


Start backend:

```bash
npm start
```


---

# Frontend Setup


Navigate:

```bash
cd frontend
```


Install packages:

```bash
npm install
```


Run application:

```bash
npm start
```


The dashboard will become available through the local development server.


---

# User Roles


## Administrator / Discipline Incharge

Access:

- Complete system management.
- Incident approval.
- Penalty management.
- Reports.
- Analytics.
- Policy configuration.


---

## Security Officer

Access:

- Live camera monitoring.
- Alert handling.
- Incident review.


---

## Faculty Member

Access:

- Student discipline information.
- Class-related incidents.


---

## Student

Access:

- Personal disciplinary history.
- Penalties and warnings.


---

## Technical Staff

Access:

- System maintenance.
- AI model updates.
- Database management.


---

# Security Implementation


HawkEye provides:


## Authentication

- JWT-based authentication.
- Secure user sessions.
- Role-based permissions.


## Data Protection

- Encrypted communication.
- Protected student information.
- Controlled evidence access.


## Access Control

Users only access features allowed by their assigned role.


---

# Performance Goals


The system is designed to support:

- Real-time video processing.
- Multiple camera streams.
- Low-latency detection.
- Secure data storage.
- Reliable incident reporting.


---

# Documentation


Additional project documentation is available inside:


```
Other Artifacts/Documents/
```


Includes:

- Software Requirement Specification (SRS)
- Project Report
- Feature Documentation
- Presentation Material
- Design Documents


---

# Future Enhancements


Possible improvements:

- Cloud deployment.
- Advanced behavior recognition.
- Attendance system integration.
- Parent notification system.
- Mobile push notifications.
- Smart campus integration.
- Additional AI violation categories.


---

# Development Methodology


HawkEye follows an Agile development approach.

Development phases:

1. Requirement Analysis
2. System Design
3. AI Model Development
4. Backend Development
5. Frontend Development
6. Integration Testing
7. Deployment and Evaluation


---

# Final Year Project Information


Project Name:

```
HawkEye
```


Developed By:

```
Daniyal Wajid
Uzair
```


Institution:

```
Riphah International University
Lahore Campus
```


Project Category:

```
Final Year Project (FYP)
```


---

# License


This project is developed for academic and research purposes.


---

# Acknowledgements


Special thanks to:

- Riphah International University.
- Project supervisors.
- Open-source AI communities.
- YOLO and OpenCV contributors.


---

HawkEye provides an intelligent approach to campus discipline management by combining Artificial Intelligence, Computer Vision, and modern software engineering practices.
