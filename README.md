# Event Management System

> A comprehensive React-based event management system for organizing events, sessions, rooms, and student data with full CRUD operations and advanced features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-React%20|%20Vite%20|%20Material-UI-blue)

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [TODO](#todo)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Core Management
- Event Management - Create, edit, delete, and organize events
- Session Management - Manage multiple sessions per event with time slots
- Room Management - Organize rooms within sessions
- Student Management - Complete CRUD operations for student data
- Hierarchical Data Structure - Events → Sessions → Rooms → Students

### Data Features
- Pagination - Efficient data browsing with configurable page sizes
- Sorting - Sort students by ID, name, year level, and program
- Search & Filter - Advanced filtering capabilities
- Real-time Updates - Instant data synchronization across components

### User Interface
- Material-UI Design - Modern, responsive interface
- Grid Layout - Organized 4-column layout for easy navigation
- Interactive Tables - Click-to-select functionality
- Notification System - Success/error feedback for all operations
- Modal Dialogs - Clean forms for data entry and editing

### Advanced Features
- State Management - React hooks for efficient state handling
- Custom Hooks - Reusable logic for CRUD operations
- Data Validation - Form validation and error handling
- Responsive Design - Works on desktop and mobile devices
- Auto-selection - Smart default selections for better UX

### Additional Capabilities
- Barcode Scanner Integration - Ready for QR/barcode scanning
- OCR Processing - Text recognition capabilities with Tesseract.js
- Webcam Integration - Camera functionality for document scanning
- Data Export - Export capabilities (ready for implementation)

---

## Screenshots

| Overview | CRUD |
|-------------------|------------------|
| ![over all view](image.png) | ![crud functionality ](image-1.png) |

---

## Tech Stack

**Frontend:**
- React 19.1.0
- Vite 7.0.4
- Material-UI (MUI) 7.3.1
- Tailwind CSS 4.1.11
- Styled Components 6.1.19

**UI Components:**
- MUI Data Grid 8.9.2
- MUI Icons 7.3.0
- MUI Lab 7.0.0-beta.16

**Advanced Features:**
- React Barcode Scanner 4.0.0
- Tesseract.js 6.0.1 (OCR)
- React Webcam 7.2.0
- React Window 1.8.11 (Virtualization)

**Development:**
- ESLint 9.30.1
- TypeScript support
- Hot Module Replacement (HMR)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/japhetcordova/CODES101.git
cd event-management-system

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
