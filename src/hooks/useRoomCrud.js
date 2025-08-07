// src/useRoomCrud.js
import { useState, useCallback } from 'react';

export function useRoomCrud({ selectedEvent, selectedSession, setLocalEvents, setSelectedRoom }) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomDialogMode, setRoomDialogMode] = useState('add');
  const [roomDialogData, setRoomDialogData] = useState({ name: '' });
  const [roomEditIndex, setRoomEditIndex] = useState(null);

  const handleAddRoom = useCallback(() => {
    setRoomDialogMode('add');
    setRoomDialogData({ name: '' });
    setRoomDialogOpen(true);
    setRoomEditIndex(null);
  }, []);

  const handleEditRoom = useCallback((room, idx) => {
    setRoomDialogMode('edit');
    setRoomDialogData({ name: room.name });
    setRoomDialogOpen(true);
    setRoomEditIndex(idx);
  }, []);

  const handleDeleteRoom = useCallback((idx) => {
    if (!selectedSession) return;
    setLocalEvents(prev => prev.map(ev =>
      ev.id === selectedEvent.id
        ? { ...ev, children: ev.children.map(ses =>
            ses.id === selectedSession.id
              ? { ...ses, children: ses.children.filter((_, i) => i !== idx) }
              : ses
          ) }
        : ev
    ));
    setSelectedRoom(null);
  }, [selectedEvent, selectedSession, setLocalEvents, setSelectedRoom]);

  const handleRoomDialogChange = useCallback((e) => {
    setRoomDialogData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleRoomDialogSave = useCallback(() => {
    if (!selectedSession) return;
    setLocalEvents(prev => prev.map(ev =>
      ev.id === selectedEvent.id
        ? { ...ev, children: ev.children.map(ses =>
            ses.id === selectedSession.id
              ? {
                  ...ses,
                  children: roomDialogMode === 'add'
                    ? [...ses.children, { id: Date.now().toString(), name: roomDialogData.name, children: [] }]
                    : ses.children.map((r, i) => i === roomEditIndex ? { ...r, name: roomDialogData.name } : r)
                }
              : ses
          ) }
        : ev
    ));
    setRoomDialogOpen(false);
  }, [selectedEvent, selectedSession, setLocalEvents, roomDialogMode, roomDialogData, roomEditIndex]);

  const handleRoomDialogClose = useCallback(() => setRoomDialogOpen(false), []);

  return {
    roomDialogOpen,
    roomDialogMode,
    roomDialogData,
    roomEditIndex,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
    handleRoomDialogChange,
    handleRoomDialogSave,
    handleRoomDialogClose
  };
}
