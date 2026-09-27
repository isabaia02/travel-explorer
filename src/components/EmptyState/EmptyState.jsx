import { Alert } from '@mui/material';

function EmptyState() {
  return (
    <Alert severity="info">
      No countries found.
    </Alert>
  );
}

export default EmptyState;