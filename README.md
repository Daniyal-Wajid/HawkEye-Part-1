# HawkEye - AI-Powered Campus Safety & Discipline Management System

## Overview

HawkEye is an intelligent campus monitoring and discipline management platform developed as a Final Year Project at **Riphah International University, Lahore Campus**.

The system leverages **Artificial Intelligence, Computer Vision, and Deep Learning** to automatically detect campus violations such as:

* Unauthorized individuals
* Weapon possession
* Physical fights
* Dress code violations

HawkEye integrates AI-based surveillance with a complete web and mobile ecosystem, allowing administrators, discipline incharges, teachers, and students to monitor, report, verify, and manage campus incidents in real time.

---

## Key Features

### AI Surveillance Module

#### Facial Recognition

* Student identification using trained face recognition models
* Real-time matching against registered student database
* Automatic profile retrieval after identification

#### Weapon Detection

* Detection of firearms and knives using YOLOv8
* Real-time alerts for security personnel
* Incident image capture and evidence storage

#### Fight Detection

* Detection of aggressive physical behavior
* Video frame analysis using computer vision techniques
* Immediate violation generation and notification

#### Automated Violation Logging

* Records:

  * Student information
  * Violation type
  * Timestamp
  * Captured evidence
* Stores incidents automatically in MongoDB

---

## Web & Mobile Applications

### Admin Dashboard

Administrators can:

* Manage students
* Manage teachers
* Manage discipline incharges
* Review violations
* Approve or modify fines
* View analytics and reports
* Manage user roles and permissions
* Monitor AI detection results
* Access audit logs

### Discipline Incharge Dashboard

Discipline staff can:

* Review AI-generated violations
* Verify reported incidents
* Approve or reject cases
* Generate violation reports
* Receive real-time alerts

### Student Application

Students can:

* View profile information
* View violation history
* View assigned fines
* Submit incident reports
* Upload evidence
* Earn reward points
* Receive notifications

---

## Fine & Reward System

### Automatic Fine Generation

The system automatically generates fines based on:

| Violation Type       | Fine Assignment |
| -------------------- | --------------- |
| Dress Code Violation | Configurable    |
| Weapon Detection     | High Severity   |
| Fight Detection      | High Severity   |
| Repeated Violations  | Escalated Fine  |

### Reward Mechanism

Students receive reward points for:

* Valid incident reporting
* Responsible community participation
* Verified submissions

---

## Role-Based Access Control

### Admin

Full system access:

* User management
* Violation management
* Analytics
* Fine management
* Reports
* Security logs

### Discipline Incharge

Limited administrative access:

* Review violations
* Approve/reject incidents
* Generate reports
* View analytics

### Student

Restricted personal access:

* Personal profile
* Fine history
* Rewards
* Reporting system

---

## Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Mobile Application

* Flutter

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT Authentication
* Firebase Authentication
* Email Verification

### Artificial Intelligence

* Python
* OpenCV
* YOLOv8
* TensorFlow
* Deep Learning Models

### Notifications

* Firebase Cloud Messaging (FCM)

---

## System Architecture

```text
Camera Feed
     │
     ▼
AI Detection Engine
 ├── Face Recognition
 ├── Weapon Detection
 ├── Fight Detection
 └── Dress Code Detection
     │
     ▼
Violation Processing Layer
 ├── Identity Matching
 ├── Fine Generation
 ├── Evidence Storage
 └── Alert Generation
     │
     ▼
Backend API (Node.js)
     │
     ▼
MongoDB Database
     │
     ▼
Web Dashboard / Mobile App
```

---

## Repository Structure

```text
HawkEye-Part-1/
│
├── ai/                    # AI models and detection systems
│   ├── face recognition
│   ├── YOLO models
│   └── detection scripts
│
├── backend/               # Node.js/Express APIs
│
├── frontend/              # React frontend application
│
├── new dataset/           # Training datasets
│
├── test/                  # Testing modules
│
├── test_detections.py     # AI detection testing
│
├── FIXES_SUMMARY.md
│
└── README.md
```

---

## Core Modules

### Authentication Module

* Login
* Registration
* Email verification
* Forgot password
* JWT token management

### Student Management

* Student registration
* Face image capture
* Profile management
* Dataset creation
* AI model training

### Violation Detection

* Face recognition
* Fight detection
* Weapon detection
* Dress code monitoring

### Reporting System

* Student reporting portal
* Evidence upload
* Cool-down timer
* Report verification

### Notification System

* Real-time alerts
* Daily summaries
* Weekly reports
* Emergency notifications

### Analytics Dashboard

* Violation statistics
* Department-wise reports
* Repeat offender analysis
* Export to PDF/Excel

---

## Security Features

* Role-Based Access Control (RBAC)
* JWT Authentication
* Firebase Authentication
* Encrypted user data
* Protected facial recognition data
* Audit logging
* Activity tracking

---

## Future Enhancements

### Predictive Behavior Analysis

* Identify high-risk behavior patterns
* Predict potential future violations

### Parent Notification System

* Automatic parent alerts
* Serious incident reporting

### Voice Alert System

* Campus-wide emergency announcements
* AI-triggered audio alerts

### ERP Integration

* Integration with university management systems
* Academic and disciplinary record synchronization

---

## Research Contributions

This project explores the application of:

* Computer Vision
* Deep Learning
* Real-Time Surveillance Systems
* Automated Violation Detection
* Facial Recognition Technologies
* Campus Safety Analytics

to improve institutional security and discipline management.

