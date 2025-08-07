// Database file for Events.jsx
// This file exports the events data structure used in the Events component.

function createData(id, name, yearLevel, programOrChildren) {
  return {
    id,
    name,
    yearLevel,
    program: typeof programOrChildren === 'string' ? programOrChildren : null,
    children: Array.isArray(programOrChildren) ? programOrChildren : []
  };
}

const PROGRAMS = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
  'Cybersecurity',
  'Information Systems',
  'Network Engineering',
  'Multimedia Arts',
];
const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SESSION_TIMES = [
  { id: 'Session1', name: 'Session at 8AM' },
  { id: 'Session2', name: 'Session at 1PM' },
  { id: 'Session3', name: 'Session at 7PM' },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStudent(roomIndex, studentIndex) {
  const id = `2025-${roomIndex.toString().padStart(2, '0')}${studentIndex.toString().padStart(2, '0')}`;
  const name = `Student ${roomIndex}-${studentIndex}`;
  const yearLevel = YEAR_LEVELS[randomInt(0, YEAR_LEVELS.length - 1)];
  const program = PROGRAMS[randomInt(0, PROGRAMS.length - 1)];
  return createData(id, name, yearLevel, program);
}

function generateRoom(sessionIndex, roomIndex) {
  const id = `${sessionIndex + 1}-${roomIndex + 1}`;
  const name = `Room ${roomIndex + 1}`;
  const numStudents = randomInt(25, 50);
  const students = [];
  for (let s = 0; s < numStudents; s++) {
    students.push(generateStudent(roomIndex + 1, s + 1));
  }
  return createData(id, name, null, students);
}

function generateSession(eventIndex, sessionIdx) {
  const sessionInfo = SESSION_TIMES[sessionIdx];
  const numRooms = randomInt(5, 20);
  const rooms = [];
  for (let r = 0; r < numRooms; r++) {
    rooms.push(generateRoom(sessionIdx, r));
  }
  return createData(sessionInfo.id, sessionInfo.name, null, rooms);
}

function generateEvent(eventIndex) {
  const id = `E${eventIndex + 1}`;
  const name = `Event ${eventIndex + 1}`;
  const description = `Sample Event Description ${eventIndex + 1}`;
  const numSessions = randomInt(2, 3);
  const sessions = [];
  for (let s = 0; s < numSessions; s++) {
    sessions.push(generateSession(eventIndex, s));
  }
  return createData(id, name, description, sessions);
}

export const events = [];
for (let i = 0; i < 10; i++) {
  events.push(generateEvent(i));
}