// src/useEventCrud.js
import { useState, useCallback } from 'react';

export function useEventCrud({ setLocalEvents, setSelectedEvent, setSelectedSession, setSelectedRoom, setNotification }) {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventDialogMode, setEventDialogMode] = useState('add');
  const [eventDialogData, setEventDialogData] = useState({ name: '' });
  const [eventEditIndex, setEventEditIndex] = useState(null);

  const handleAddEvent = useCallback(() => {
    setEventDialogMode('add');
    setEventDialogData({ name: '' });
    setEventDialogOpen(true);
    setEventEditIndex(null);
  }, []);

  const handleEditEvent = useCallback((event, idx) => {
    setEventDialogMode('edit');
    setEventDialogData({ name: event.name });
    setEventDialogOpen(true);
    setEventEditIndex(idx);
  }, []);

  const handleDeleteEvent = useCallback((idx) => {
    setLocalEvents(prev => prev.filter((_, i) => i !== idx));
    setSelectedEvent(null);
    setSelectedSession(null);
    setSelectedRoom(null);
  }, [setLocalEvents, setSelectedEvent, setSelectedSession, setSelectedRoom]);

  const handleEventDialogChange = useCallback((e) => {
    setEventDialogData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleEventDialogSave = useCallback(() => {
    try {
      if (!eventDialogData.name.trim()) {
        throw new Error('Event name cannot be empty');
      }
      if (eventDialogMode === 'add') {
        setLocalEvents(prev => [...prev, {
          id: Date.now().toString(),
          name: eventDialogData.name,
          children: []
        }]);
        setNotification({
          open: true,
          message: 'Event added successfully!',
          severity: 'success'
        });
      } else if (eventDialogMode === 'edit' && eventEditIndex !== null) {
        setLocalEvents(prev => prev.map((e, i) =>
          i === eventEditIndex ? { ...e, name: eventDialogData.name } : e
        ));
        setNotification({
          open: true,
          message: 'Event updated successfully!',
          severity: 'success'
        });
      }
      setEventDialogOpen(false);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Failed to save event',
        severity: 'error'
      });
    }
  }, [eventDialogData, eventDialogMode, eventEditIndex, setLocalEvents, setNotification]);

  const handleEventDialogClose = useCallback(() => setEventDialogOpen(false), []);

  return {
    eventDialogOpen,
    eventDialogMode,
    eventDialogData,
    eventEditIndex,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleEventDialogChange,
    handleEventDialogSave,
    handleEventDialogClose
  };
}
