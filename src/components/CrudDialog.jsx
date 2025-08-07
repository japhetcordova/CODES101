// src/CrudDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function CrudDialog({
  open,
  mode = 'add',
  title,
  fields = [],
  data = {},
  onChange,
  onClose,
  onSave
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'add' ? `Add ${title}` : `Edit ${title}`}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        {fields.map(field => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={data[field.name] || ''}
            onChange={onChange}
            fullWidth
            autoFocus={field.autoFocus}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
