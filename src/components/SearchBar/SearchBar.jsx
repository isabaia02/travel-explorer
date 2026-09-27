import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onSearch(query);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        marginBottom: 4,
        alignItems: 'flex-start',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          gap: 1.5,
        },
      }}
    >
      <TextField
        fullWidth
        label="Search country"
        placeholder="Ex.: Brazil"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          minHeight: 56,
          '@media (max-width: 600px)': {
            width: '100%',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;