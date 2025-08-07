// src/components/StudentManager.jsx
import CrudTable from './CrudTable';
import CrudDialog from './CrudDialog';
import { useStudentCrud } from '../hooks/useStudentCrud';
import Notification from './Notification';

export default function StudentManager({
  students,
  setStudents,
  selectedStudent,
  setSelectedStudent,
  notification,
  setNotification,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) {
  const {
    studentDialogOpen,
    studentDialogMode,
    studentDialogData,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleStudentDialogChange,
    handleStudentDialogSave,
    handleStudentDialogClose
  } = useStudentCrud({
    setLocalStudents: setStudents,
    setSelectedStudent,
    setNotification
  });

  return (
    <>
      <CrudTable
        columns={[{ label: 'Students', accessor: 'name' }]}
        data={students}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        selectedId={selectedStudent?.id}
        onRowClick={setSelectedStudent}
        onAdd={handleAddStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        addLabel="Add Student"
      />

      <CrudDialog
        open={studentDialogOpen}
        mode={studentDialogMode}
        title="Student"
        fields={[ 
                  { label: 'ID', accessor: 'id' },
                  { label: 'Name', accessor: 'name' },
                  { label: 'Year Level', accessor: 'yearLevel' },
                  { label: 'Program', accessor: 'program' }
                ]}
        data={studentDialogData}
        onChange={handleStudentDialogChange}
        onClose={handleStudentDialogClose}
        onSave={handleStudentDialogSave}
      />
      <Notification notification={notification} setNotification={setNotification} />
    </>
  );
}
