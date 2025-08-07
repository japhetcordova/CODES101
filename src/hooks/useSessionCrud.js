// src/useSessionCrud.js
import { useState, useCallback } from 'react';

export function useSessionCrud({ selectedEvent, setLocalEvents, setSelectedSession, setSelectedRoom, setNotification }) {
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [sessionDialogMode, setSessionDialogMode] = useState('add');
  const [sessionDialogData, setSessionDialogData] = useState({ name: '' });
  const [sessionEditIndex, setSessionEditIndex] = useState(null);

  const handleAddSession = useCallback(() => {
    setSessionDialogMode('add');
    setSessionDialogData({ name: '' });
    setSessionDialogOpen(true);
    setSessionEditIndex(null);
  }, []);

  const handleEditSession = useCallback((session, idx) => {
    setSessionDialogMode('edit');
    setSessionDialogData({ name: session.name });
    setSessionDialogOpen(true);
    setSessionEditIndex(idx);
  }, []);

  const handleDeleteSession = useCallback((idx) => {
    if (!selectedEvent) return;
    setLocalEvents(prev => prev.map(ev =>
      ev.id === selectedEvent.id
        ? { ...ev, children: ev.children.filter((_, i) => i !== idx) }
        : ev
    ));
    setSelectedSession(null);
    setSelectedRoom(null);
  }, [selectedEvent, setLocalEvents, setSelectedSession, setSelectedRoom]);

  const handleSessionDialogChange = useCallback((e) => {
    setSessionDialogData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSessionDialogSave = useCallback(() => {
    try {
      if (!selectedEvent) {
        throw new Error('No event selected');
      }
      if (!sessionDialogData.name.trim()) {
        throw new Error('Session name cannot be empty');
      }
      if (sessionDialogMode === 'add') {
        setLocalEvents(prev => prev.map(ev =>
          ev.id === selectedEvent.id
            ? {
                ...ev,
                children: [...ev.children, {
                  id: Date.now().toString(),
                  name: sessionDialogData.name,
                  children: []
                }]
              }
            : ev
        ));
        setNotification({
          open: true,
          message: 'Session added successfully!',
          severity: 'success'
        });
      } else if (sessionDialogMode === 'edit' && sessionEditIndex !== null) {
        setLocalEvents(prev => prev.map(ev =>
          ev.id === selectedEvent.id
            ? {
                ...ev,
                children: ev.children.map((s, i) =>
                  i === sessionEditIndex ? { ...s, name: sessionDialogData.name } : s
                )
              }
            : ev
        ));
        setNotification({
          open: true,
          message: 'Session updated successfully!',
          severity: 'success'
        });
      }
      setSessionDialogOpen(false);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Failed to save session',
        severity: 'error'
      });
    }
  }, [selectedEvent, sessionDialogData, sessionDialogMode, sessionEditIndex, setLocalEvents, setNotification]);

  const handleSessionDialogClose = useCallback(() => setSessionDialogOpen(false), []);

  return {
    sessionDialogOpen,
    sessionDialogMode,
    sessionDialogData,
    sessionEditIndex,
    handleAddSession,
    handleEditSession,
    handleDeleteSession,
    handleSessionDialogChange,
    handleSessionDialogSave,
    handleSessionDialogClose
  };
}
