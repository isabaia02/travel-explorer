import { Alert } from '@mui/material';

function ErrorState({ message }) {
  return (
    <Alert severity="error">
      {message}
    </Alert>
  );
}

export default ErrorState;