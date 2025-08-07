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
    studentFormOpen,
    studentFormMode,
    studentFormData,
    openAddStudentForm,
    openEditStudentForm,
    deleteStudent,
    handleStudentFormChange,
    handleStudentFormSave,
    closeStudentForm
  } = useStudentCrud(setStudents);

  return (
    <>
      <CrudTable
        columns={[
          { label: 'ID', accessor: 'id' },
          { label: 'Name', accessor: 'name' },
          { label: 'Year Level', accessor: 'yearLevel' },
          { label: 'Program', accessor: 'program' }
        ]}
        data={students}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        selectedId={selectedStudent?.id}
        onRowClick={setSelectedStudent}
        onAdd={openAddStudentForm}
        onEdit={openEditStudentForm}
        onDelete={deleteStudent}
        addLabel="Add Student"
      />

      <CrudDialog
        open={studentFormOpen}
        mode={studentFormMode}
        title="Student"
        fields={[
          { label: 'ID', name: 'id' },
          { label: 'Name', name: 'name', autoFocus: true },
          { label: 'Year Level', name: 'yearLevel' },
          { label: 'Program', name: 'program' }
        ]}
        data={studentFormData}
        onChange={handleStudentFormChange}
        onClose={closeStudentForm}
        onSave={handleStudentFormSave}
      />
      <Notification notification={notification} setNotification={setNotification} />
    </>
  );
}
