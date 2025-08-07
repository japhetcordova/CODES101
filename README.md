# 📘 Event Management System

> A comprehensive React-based event management system for organizing events, sessions, rooms, and student data with full CRUD operations and advanced features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-React%20|%20Vite%20|%20Material-UI-blue)

---

## 📂 Table of Contents

- [🚀 Features](#-features)
- [📸 Screenshots](#-screenshots)
- [📦 Tech Stack](#-tech-stack)
- [🛠 Installation](#-installation)
- [⚙️ Usage](#️-usage)
- [📈 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [📝 TODO](#-todo)
- [🙋‍♂️ Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 🚀 Features

### 🎯 Core Management
- ✅ **Event Management** - Create, edit, delete, and organize events
- ✅ **Session Management** - Manage multiple sessions per event with time slots
- ✅ **Room Management** - Organize rooms within sessions
- ✅ **Student Management** - Complete CRUD operations for student data
- ✅ **Hierarchical Data Structure** - Events → Sessions → Rooms → Students

### 📊 Data Features
- ✅ **Pagination** - Efficient data browsing with configurable page sizes
- ✅ **Sorting** - Sort students by ID, name, year level, and program
- ✅ **Search & Filter** - Advanced filtering capabilities
- ✅ **Real-time Updates** - Instant data synchronization across components

### 🎨 User Interface
- ✅ **Material-UI Design** - Modern, responsive interface
- ✅ **Grid Layout** - Organized 4-column layout for easy navigation
- ✅ **Interactive Tables** - Click-to-select functionality
- ✅ **Notification System** - Success/error feedback for all operations
- ✅ **Modal Dialogs** - Clean forms for data entry and editing

### 🔧 Advanced Features
- ✅ **State Management** - React hooks for efficient state handling
- ✅ **Custom Hooks** - Reusable logic for CRUD operations
- ✅ **Data Validation** - Form validation and error handling
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Auto-selection** - Smart default selections for better UX

### 📱 Additional Capabilities
- 🔄 **Barcode Scanner Integration** - Ready for QR/barcode scanning
- 📷 **OCR Processing** - Text recognition capabilities with Tesseract.js
- 📸 **Webcam Integration** - Camera functionality for document scanning
- 📄 **Data Export** - Export capabilities (ready for implementation)

---

## 📸 Screenshots

| Events & Sessions | Rooms & Students |
|-------------------|------------------|
| ![Events](./screenshots/events.png) | ![Students](./screenshots/students.png) |

---

## 📦 Tech Stack

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

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⚙️ Usage

### Getting Started
1. **Launch the application** - Run `npm run dev` and open `http://localhost:5173`
2. **Navigate the interface** - Use the 4-column layout to manage your data
3. **Select an event** - Click on an event to view its sessions
4. **Manage sessions** - Add, edit, or delete sessions for the selected event
5. **Organize rooms** - Create rooms within sessions
6. **Add students** - Populate rooms with student information

### Key Features
- **Hierarchical Navigation**: Events → Sessions → Rooms → Students
- **Bulk Operations**: Manage multiple items efficiently
- **Real-time Updates**: Changes reflect immediately across all components
- **Data Persistence**: Local state management with sample data

### Advanced Usage
- **Pagination**: Navigate through large datasets
- **Sorting**: Organize students by various criteria
- **Search**: Find specific items quickly
- **Notifications**: Get feedback on all operations

---

## 📈 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CrudTable.jsx   # Generic table with CRUD operations
│   ├── CrudDialog.jsx  # Modal dialogs for forms
│   ├── EventManager.jsx
│   ├── SessionManager.jsx
│   ├── RoomManager.jsx
│   ├── StudentManager.jsx
│   └── Notification.jsx
├── hooks/              # Custom React hooks
│   ├── useEventCrud.js
│   ├── useSessionCrud.js
│   ├── useRoomCrud.js
│   ├── useStudentCrud.js
│   ├── useSortedStudents.js
│   └── paginationHandlers.js
├── pages/              # Main page components
│   └── Events.jsx      # Main application page
├── data/               # Data and schemas
│   └── Events.db.js    # Sample data structure
└── assets/             # Static assets
```

---

## 🧪 Testing

```bash
# Run linting
npm run lint

# Check for TypeScript errors
npm run type-check
```

---

## 📝 TODO

- [ ] **Backend Integration** - Connect to real database
- [ ] **Authentication** - User login and role management
- [ ] **Data Export** - PDF, Excel, CSV export functionality
- [ ] **Barcode Scanning** - Implement QR code scanning
- [ ] **OCR Processing** - Document text recognition
- [ ] **Real-time Sync** - WebSocket integration
- [ ] **Advanced Analytics** - Charts and reporting
- [ ] **Mobile App** - React Native version
- [ ] **API Documentation** - Swagger/OpenAPI docs
- [ ] **Unit Tests** - Jest and React Testing Library

---

## 🙋‍♂️ Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Project Link**: [https://github.com/yourusername/event-management-system](https://github.com/yourusername/event-management-system)
- **Issues**: [https://github.com/yourusername/event-management-system/issues](https://github.com/yourusername/event-management-system/issues)

---

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Vite for the fast development experience
- React team for the amazing framework
- All contributors who help improve this project
