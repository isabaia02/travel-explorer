import { Box, CircularProgress, Typography } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 6,
      }}
    >
      <CircularProgress />

      <Typography variant="body1">
        Loading countries...
      </Typography>
    </Box>
  );
}

export default Loading;