import { useState } from 'react';

export function useStudentCrud(setLocalStudents) {
  const [studentFormOpen, setStudentFormOpen] = useState(false);
  const [studentFormMode, setStudentFormMode] = useState('add');
  const [studentFormData, setStudentFormData] = useState({ id: '', name: '', yearLevel: '', program: '' });
  const [studentEditIndex, setStudentEditIndex] = useState(null);

  const openAddStudentForm = () => {
    setStudentFormMode('add');
    setStudentFormData({ id: '', name: '', yearLevel: '', program: '' });
    setStudentFormOpen(true);
    setStudentEditIndex(null);
  };
  const openEditStudentForm = (student) => {
    setStudentFormMode('edit');
    setStudentFormData(student);
    setStudentFormOpen(true);
    setStudentEditIndex(
      typeof student?.id !== 'undefined'
        ? (typeof setLocalStudents._lastValue === 'object'
            ? setLocalStudents._lastValue.findIndex(s => s.id === student.id)
            : null)
        : null
    );
  };
  const deleteStudent = (student) => {
    setLocalStudents((prev) => prev.filter((s) => s.id !== student.id));
  };
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleStudentFormSave = () => {
    // Validate required fields
    if (!studentFormData.name?.trim()) {
      // Optionally show an error notification here
      alert('Student name is required.');
      return;
    }
    if (studentFormMode === 'add') {
      // Use a more robust ID generation
      setLocalStudents((prev) => [
        ...prev,
        {
          ...studentFormData,
          id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
      ]);
    } else if (studentFormMode === 'edit' && studentEditIndex !== null) {
      setLocalStudents((prev) => prev.map((s, i) => i === studentEditIndex ? studentFormData : s));
    }
    setStudentFormOpen(false);
  };
  const closeStudentForm = () => {
    setStudentFormOpen(false);
  };

  return {
    studentFormOpen,
    studentFormMode,
    studentFormData,
    studentEditIndex,
    openAddStudentForm,
    openEditStudentForm,
    deleteStudent,
    handleStudentFormChange,
    handleStudentFormSave,
    closeStudentForm
  };
}
