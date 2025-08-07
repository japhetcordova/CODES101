import CrudTable from './CrudTable';
import CrudDialog from './CrudDialog';
import { useRoomCrud } from '../hooks/useRoomCrud';
import Notification from './Notification';

export default function RoomManager({
  rooms,
  setRooms,
  selectedRoom,
  setSelectedRoom,
  notification,
  setNotification,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) {
  const {
    roomDialogOpen,
    roomDialogMode,
    roomDialogData,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
    handleRoomDialogChange,
    handleRoomDialogSave,
    handleRoomDialogClose
  } = useRoomCrud({
    setLocalRooms: setRooms,
    setSelectedRoom,
    setNotification
  });

  return (
    <>
      <CrudTable
        columns={[{ label: 'Rooms', accessor: 'name' }]}
        data={rooms}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        selectedId={selectedRoom?.id}
        onRowClick={setSelectedRoom}
        onAdd={handleAddRoom}
        onEdit={room => {
          const idx = rooms.findIndex(r => r.id === room.id);
          handleEditRoom(room, idx);
        }}
        onDelete={room => {
          const idx = rooms.findIndex(r => r.id === room.id);
          handleDeleteRoom(idx);
        }}
        addLabel="Add Room"
      />

      <CrudDialog
        open={roomDialogOpen}
        mode={roomDialogMode}
        title="Room"
        fields={[{ label: 'Name', name: 'name', autoFocus: true }]}
        data={roomDialogData}
        onChange={handleRoomDialogChange}
        onClose={handleRoomDialogClose}
        onSave={handleRoomDialogSave}
      />
      <Notification notification={notification} setNotification={setNotification} />
    </>
  );
}
