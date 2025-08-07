import CrudTable from './CrudTable';
import CrudDialog from './CrudDialog';
import { useSessionCrud } from '../hooks/useSessionCrud';
import Notification from './Notification';

export default function SessionManager({
  sessions,
  setEvents,
  selectedSession,
  setSelectedSession,
  setSelectedRoom,
  selectedEvent,
  notification,
  setNotification,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) {
  const {
    sessionDialogOpen,
    sessionDialogMode,
    sessionDialogData,
    handleAddSession,
    handleEditSession,
    handleDeleteSession,
    handleSessionDialogChange,
    handleSessionDialogSave,
    handleSessionDialogClose
  } = useSessionCrud({
    selectedEvent,
    setLocalEvents: setEvents,
    setSelectedSession,
    setSelectedRoom,
    setNotification
  });

  return (
    <>
      <CrudTable
        columns={[{ label: 'Sessions', accessor: 'name' }]}
        data={sessions}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        selectedId={selectedSession?.id}
        onRowClick={session => {
          setSelectedSession(session);
          const firstRoom = session.children?.[0] || null;
          setSelectedRoom(firstRoom);
        }}
        onAdd={handleAddSession}
        onEdit={session => {
          const idx = sessions.findIndex(s => s.id === session.id);
          handleEditSession(session, idx);
        }}
        onDelete={session => {
          const idx = sessions.findIndex(s => s.id === session.id);
          handleDeleteSession(idx);
        }}
        addLabel="Add Session"
        disableAdd={!selectedEvent}
      />
      <CrudDialog
        open={sessionDialogOpen}
        mode={sessionDialogMode}
        title="Session"
        fields={[{ label: 'Name', name: 'name', autoFocus: true }]}
        data={sessionDialogData}
        onChange={handleSessionDialogChange}
        onClose={handleSessionDialogClose}
        onSave={handleSessionDialogSave}
      />
      <Notification notification={notification} setNotification={setNotification} />
    </>
  );
}
