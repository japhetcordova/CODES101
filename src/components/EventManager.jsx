import CrudTable from './CrudTable';
import CrudDialog from './CrudDialog';
import { useEventCrud } from '../hooks/useEventCrud';
import Notification from './Notification';

export default function EventManager({
  events,
  setEvents,
  selectedEvent,
  setSelectedEvent,
  setSelectedSession,
  setSelectedRoom,
  notification,
  setNotification,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) {
  const {
    eventDialogOpen,
    eventDialogMode,
    eventDialogData,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleEventDialogChange,
    handleEventDialogSave,
    handleEventDialogClose
  } = useEventCrud({
    setLocalEvents: setEvents,
    setSelectedEvent,
    setSelectedSession,
    setSelectedRoom,
    setNotification
  });

  return (
    <>
      <CrudTable
        columns={[{ label: 'Events', accessor: 'name' }]}
        data={events}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        selectedId={selectedEvent?.id}
        onRowClick={event => {
          setSelectedEvent(event);
          const firstSession = event.children?.[0] || null;
          setSelectedSession(firstSession);
          const firstRoom = firstSession?.children?.[0] || null;
          setSelectedRoom(firstRoom);
        }}
        onAdd={handleAddEvent}
        onEdit={event => {
          const idx = events.findIndex(e => e.id === event.id);
          handleEditEvent(event, idx);
        }}
        onDelete={event => {
          const idx = events.findIndex(e => e.id === event.id);
          handleDeleteEvent(idx);
        }}
        addLabel="Add Event"
      />
      <CrudDialog
        open={eventDialogOpen}
        mode={eventDialogMode}
        title="Event"
        fields={[{ label: 'Name', name: 'name', autoFocus: true }]}
        data={eventDialogData}
        onChange={handleEventDialogChange}
        onClose={handleEventDialogClose}
        onSave={handleEventDialogSave}
      />
      <Notification notification={notification} setNotification={setNotification} />
    </>
  );
}
