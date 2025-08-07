import * as React from 'react';
import {
 Grid
} from '@mui/material';
import CrudTable from '../components/CrudTable';
import CrudDialog from '../components/CrudDialog';
import { useEventCrud } from '../hooks/useEventCrud';
import { useSessionCrud } from '../hooks/useSessionCrud';
import { useRoomCrud } from '../hooks/useRoomCrud';
import { createPaginationHandlers } from '../hooks/paginationHandlers';
import { events as initialEvents } from '../data/Events.db';
import Notification from '../components/Notification';
import { useSortedStudents } from '../hooks/useSortedStudents';

export default function SeparatedTables() {
  // Local state for all data
  const [localEvents, setLocalEvents] = React.useState([]);
  React.useEffect(() => {
    setLocalEvents(initialEvents.map(e => ({ ...e, children: e.children ? e.children.map(s => ({ ...s, children: s.children ? [...s.children] : [] })) : [] })));
  }, []);

  // Selection state
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedSession, setSelectedSession] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  // Pagination state for each table
  const [eventPage, setEventPage] = React.useState(0);
  const [eventRowsPerPage, setEventRowsPerPage] = React.useState(5);
  const [sessionPage, setSessionPage] = React.useState(0);
  const [sessionRowsPerPage, setSessionRowsPerPage] = React.useState(5);
  const [roomPage, setRoomPage] = React.useState(0);
  const [roomRowsPerPage, setRoomRowsPerPage] = React.useState(5);
  const [studentPage, setStudentPage] = React.useState(0);
  const [studentRowsPerPage, setStudentRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    if (localEvents.length > 0) {
      const defaultEvent = localEvents[0];
      setSelectedEvent(defaultEvent);
      const defaultSession = defaultEvent.children?.[0] || null;
      setSelectedSession(defaultSession);
      const defaultRoom = defaultSession?.children?.[0] || null;
      setSelectedRoom(defaultRoom);
    }
  }, [localEvents]);

  const sessions = selectedEvent?.children || [];
  const rooms = selectedSession?.children || [];
  // Local state for students CRUD
  const [localStudents, setLocalStudents] = React.useState([]);
  React.useEffect(() => {
    setLocalStudents(selectedRoom?.children ? [...selectedRoom.children] : []);
  }, [selectedRoom]);

  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    severity: 'success' // 'success' or 'error'
  });

  const students = localStudents;

  // Pagination handlers for each table (refactored)
  const [handleEventPageChange, handleEventRowsPerPageChange] = createPaginationHandlers(setEventPage, setEventRowsPerPage);
  const [handleSessionPageChange, handleSessionRowsPerPageChange] = createPaginationHandlers(setSessionPage, setSessionRowsPerPage);
  const [handleRoomPageChange, handleRoomRowsPerPageChange] = createPaginationHandlers(setRoomPage, setRoomRowsPerPage);
  const [handleStudentPageChange, handleStudentRowsPerPageChange] = createPaginationHandlers(setStudentPage, setStudentRowsPerPage);

  // --- CRUD state for Events (refactored) ---
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
  } = useEventCrud({ setLocalEvents, setSelectedEvent, setSelectedSession, setSelectedRoom, setNotification });

  // --- CRUD state for Sessions (refactored) ---
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
  } = useSessionCrud({ selectedEvent, setLocalEvents, setSelectedSession, setSelectedRoom, setNotification });

  // --- CRUD state for Rooms (refactored) ---
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
  } = useRoomCrud({ selectedEvent, selectedSession, setLocalEvents, setSelectedRoom });


  
  // Sorting state for students
  const [studentSortBy, setStudentSortBy] = React.useState('id');
  const [studentSortDirection, setStudentSortDirection] = React.useState('asc');
  console.log(setStudentSortBy, setStudentSortDirection)

  // CRUD modal/dialog state
  const [studentDialogOpen, setStudentDialogOpen] = React.useState(false);
  const [studentDialogMode, setStudentDialogMode] = React.useState('add'); // 'add' or 'edit'
  const [studentDialogData, setStudentDialogData] = React.useState({ id: '', name: '', yearLevel: '', program: '' });
  const [studentEditIndex, setStudentEditIndex] = React.useState(null);

  // Handlers for CRUD
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

  // Sorting and paging for students (refactored)
  const { sortedStudents, pagedStudents } = useSortedStudents(
    students,
    studentSortBy,
    studentSortDirection,
    studentPage,
    studentRowsPerPage
  );
  console.log(pagedStudents);

  return (
    <Grid container spacing={2}>
      {/* Events Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <CrudTable
          columns={[{ label: 'Events', accessor: 'name' }]}
          data={localEvents}
          page={eventPage}
          rowsPerPage={eventRowsPerPage}
          onPageChange={handleEventPageChange}
          onRowsPerPageChange={handleEventRowsPerPageChange}
          selectedId={selectedEvent?.id}
          onRowClick={(event) => {
            setSelectedEvent(event);
            const firstSession = event.children?.[0] || null;
            setSelectedSession(firstSession);
            const firstRoom = firstSession?.children?.[0] || null;
            setSelectedRoom(firstRoom);
          }}
          onAdd={handleAddEvent}
          onEdit={(event) => {
            const idx = localEvents.findIndex(e => e.id === event.id);
            handleEditEvent(event, idx);
          }}
          onDelete={(event) => {
            const idx = localEvents.findIndex(e => e.id === event.id);
            handleDeleteEvent(idx);
          }}
          addLabel="Add Event"
        />
        {/* Event Add/Edit Dialog */}
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
      </Grid>

      {/* Sessions Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <CrudTable
          columns={[{ label: 'Sessions', accessor: 'name' }]}
          data={sessions}
          page={sessionPage}
          rowsPerPage={sessionRowsPerPage}
          onPageChange={handleSessionPageChange}
          onRowsPerPageChange={handleSessionRowsPerPageChange}
          selectedId={selectedSession?.id}
          onRowClick={(session) => {
            setSelectedSession(session);
            const firstRoom = session.children?.[0] || null;
            setSelectedRoom(firstRoom);
          }}
          onAdd={handleAddSession}
          onEdit={(session) => {
            const idx = sessions.findIndex(s => s.id === session.id);
            handleEditSession(session, idx);
          }}
          onDelete={(session) => {
            const idx = sessions.findIndex(s => s.id === session.id);
            handleDeleteSession(idx);
          }}
          addLabel="Add Session"
          disableAdd={!selectedEvent}
        />
        {/* Session Add/Edit Dialog */}
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
      </Grid>

      {/* Rooms Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <CrudTable
          columns={[{ label: 'Rooms', accessor: 'name' }]}
          data={rooms}
          page={roomPage}
          rowsPerPage={roomRowsPerPage}
          onPageChange={handleRoomPageChange}
          onRowsPerPageChange={handleRoomRowsPerPageChange}
          selectedId={selectedRoom?.id}
          onRowClick={(room) => setSelectedRoom(room)}
          onAdd={handleAddRoom}
          onEdit={(room) => {
            const idx = rooms.findIndex(r => r.id === room.id);
            handleEditRoom(room, idx);
          }}
          onDelete={(room) => {
            const idx = rooms.findIndex(r => r.id === room.id);
            handleDeleteRoom(idx);
          }}
          addLabel="Add Room"
          disableAdd={!selectedSession}
        />
        {/* Room Add/Edit Dialog */}
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
      </Grid>

      {/* Student Info Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <CrudTable
          columns={[
            { label: 'ID', accessor: 'id' },
            { label: 'Name', accessor: 'name' },
            { label: 'Year Level', accessor: 'yearLevel' },
            { label: 'Program', accessor: 'program' }
          ]}
          data={sortedStudents}
          page={studentPage}
          rowsPerPage={studentRowsPerPage}
          onPageChange={handleStudentPageChange}
          onRowsPerPageChange={handleStudentRowsPerPageChange}
          selectedId={null}
          onRowClick={null}
          onAdd={handleAddStudent}
          onEdit={(student) => {
            const idx = sortedStudents.findIndex(s => s.id === student.id);
            handleEditStudent(student, idx);
          }}
          onDelete={(student) => {
            const idx = sortedStudents.findIndex(s => s.id === student.id);
            handleDeleteStudent(idx);
          }}
          addLabel="Add Student"
        />
        {/* Student Add/Edit Dialog */}
        <CrudDialog
          open={studentDialogOpen}
          mode={studentDialogMode}
          title="Student"
          fields={[
            { label: 'Name', name: 'name', autoFocus: true },
            { label: 'Year Level', name: 'yearLevel' },
            { label: 'Program', name: 'program' }
          ]}
          data={studentDialogData}
          onChange={handleDialogChange}
          onClose={handleDialogClose}
          onSave={handleDialogSave}
        />
      </Grid>
    </Grid>
  );
}
