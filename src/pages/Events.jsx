import * as React from 'react';
import {
 Grid
} from '@mui/material';
import EventManager from '../components/EventManager';
import SessionManager from '../components/SessionManager';
import RoomManager from '../components/RoomManager';
import StudentManager from '../components/StudentManager';
import { createPaginationHandlers } from '../hooks/paginationHandlers';
import { events as initialEvents } from '../data/Events.db';
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
  
  // Sorting state for students
  const [studentSortBy, setStudentSortBy] = React.useState('id');
  const [studentSortDirection, setStudentSortDirection] = React.useState('asc');
  console.log(setStudentSortBy, setStudentSortDirection)

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
      {/* Events Table with Pagination and CRUD using EventManager */}
      <Grid item xs={12} sm={3}>
        <EventManager
          events={localEvents}
          setEvents={setLocalEvents}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setSelectedSession={setSelectedSession}
          setSelectedRoom={setSelectedRoom}
          notification={notification}
          setNotification={setNotification}
          page={eventPage}
          rowsPerPage={eventRowsPerPage}
          onPageChange={handleEventPageChange}
          onRowsPerPageChange={handleEventRowsPerPageChange}
        />
      </Grid>

      {/* Sessions Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <SessionManager
          sessions={sessions}
          setSessions={setLocalEvents}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          setSelectedRoom={setSelectedRoom}
          selectedEvent={selectedEvent}
          notification={notification}
          setNotification={setNotification}
          page={sessionPage}
          rowsPerPage={sessionRowsPerPage}
          onPageChange={handleSessionPageChange}
          onRowsPerPageChange={handleSessionRowsPerPageChange}
        />
      </Grid>

      {/* Rooms Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <RoomManager
          rooms={rooms}
          setRooms={setLocalEvents}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          setSelectedSession={setSelectedSession}
          selectedEvent={selectedEvent}
          notification={notification}
          setNotification={setNotification}
          page={roomPage}
          rowsPerPage={roomRowsPerPage}
          onPageChange={handleRoomPageChange}
          onRowsPerPageChange={handleRoomRowsPerPageChange}
        />
      </Grid>

      {/* Student Info Table with Pagination and CRUD using CrudTable */}
      <Grid item xs={12} sm={3}>
        <StudentManager
          students={sortedStudents}
          setStudents={setLocalStudents}
          selectedStudent={null}
          setSelectedStudent={null}
          notification={notification}
          setNotification={setNotification}
          page={studentPage}
          rowsPerPage={studentRowsPerPage}
          onPageChange={handleStudentPageChange}
          onRowsPerPageChange={handleStudentRowsPerPageChange}
        />
      </Grid>
    </Grid>
  );
}