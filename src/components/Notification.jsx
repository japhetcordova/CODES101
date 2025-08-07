import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Notification({ notification, setNotification }) {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={notification.severity}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
