import { useState } from 'react';

export function useStudentCrud(setLocalStudents) {
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [studentDialogMode, setStudentDialogMode] = useState('add');
  const [studentDialogData, setStudentDialogData] = useState({ id: '', name: '', yearLevel: '', program: '' });
  const [studentEditIndex, setStudentEditIndex] = useState(null);

  const handleAddStudent = () => {
    setStudentDialogMode('add');
    setStudentDialogData({ id: '', name: '', yearLevel: '', program: '' });
    setStudentDialogOpen(true);
    setStudentEditIndex(null);
  };
  const handleEditStudent = (student) => {
    setStudentDialogMode('edit');
    setStudentDialogData(student);
    setStudentDialogOpen(true);
    setStudentEditIndex(
      typeof student?.id !== 'undefined'
        ? (typeof setLocalStudents._lastValue === 'object'
            ? setLocalStudents._lastValue.findIndex(s => s.id === student.id)
            : null)
        : null
    );
  };
  const handleDeleteStudent = (student) => {
    setLocalStudents((prev) => prev.filter((s) => s.id !== student.id));
  };
  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setStudentDialogData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDialogSave = () => {
    // Validate required fields
    if (!studentDialogData.name?.trim()) {
      // Optionally show an error notification here
      alert('Student name is required.');
      return;
    }
    if (studentDialogMode === 'add') {
      // Use a more robust ID generation
      setLocalStudents((prev) => [
        ...prev,
        {
          ...studentDialogData,
          id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
      ]);
    } else if (studentDialogMode === 'edit' && studentEditIndex !== null) {
      setLocalStudents((prev) => prev.map((s, i) => i === studentEditIndex ? studentDialogData : s));
    }
    setStudentDialogOpen(false);
  };
  const handleDialogClose = () => {
    setStudentDialogOpen(false);
  };

  return {
    studentDialogOpen,
    studentDialogMode,
    studentDialogData,
    studentEditIndex,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleDialogChange,
    handleDialogSave,
    handleDialogClose
  };
}
