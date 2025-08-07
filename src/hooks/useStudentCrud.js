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
  const handleEditStudent = (student, idx) => {
    setStudentDialogMode('edit');
    setStudentDialogData(student);
    setStudentDialogOpen(true);
    setStudentEditIndex(idx);
  };
  const handleDeleteStudent = (idx) => {
    setLocalStudents((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setStudentDialogData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDialogSave = () => {
    if (studentDialogMode === 'add') {
      setLocalStudents((prev) => [...prev, { ...studentDialogData, id: Date.now().toString() }]);
    } else if (studentDialogMode === 'edit' && studentEditIndex !== null) {
      setLocalStudents((prev) => prev.map((s, i) => i === studentEditIndex ? { ...studentDialogData } : s));
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
