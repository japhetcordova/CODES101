/**
 * @typedef {Object} Student
 * @property {string} id - The unique student ID (e.g., '2025-001')
 * @property {string} name - The student's full name
 * @property {string} yearLevel - The year level of the student (e.g., '1st Year')
 * @property {string} program - The program the student is enrolled in (e.g., 'Computer Science')
 */

/**
 * @typedef {Object} Room
 * @property {string} id - The unique room ID (e.g., '1')
 * @property {string} name - The room name (e.g., 'Room 1')
 * @property {null} yearLevel - Always null for rooms
 * @property {null} program - Always null for rooms
 * @property {Student[]} children - The students in this room
 */

/**
 * @typedef {Object} Session
 * @property {string} id - The unique session ID (e.g., 'Session1')
 * @property {string} name - The session name (e.g., 'Session at 8AM')
 * @property {null} yearLevel - Always null for sessions
 * @property {null} program - Always null for sessions
 * @property {Room[]} children - The rooms in this session
 */

/**
 * @typedef {Object} Event
 * @property {string} id - The unique event ID (e.g., 'E1')
 * @property {string} name - The event name (e.g., 'Event 1')
 * @property {string} yearLevel - The event description (e.g., 'Orientation for Freshmen')
 * @property {Session[]} children - The sessions in this event
 */

// Example structure:
// const events = [Event, ...];