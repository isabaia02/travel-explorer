import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const languages = [
  { value: 'English', name: 'English' },
  { value: 'Portuguese', name: 'Portuguese' },
  { value: 'Spanish', name: 'Spanish' },
  { value: 'French', name: 'French' },
  { value: 'German', name: 'German' },
  { value: 'Italian', name: 'Italian' },
  { value: 'Japanese', name: 'Japanese' },
  { value: 'Chinese', name: 'Chinese' },
];

function LanguageFilter({ value, onChange }) {
  return (
    <FormControl
      size="small"
      sx={{
        width: 180,
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <InputLabel id="language-filter-label">
        Language
      </InputLabel>

      <Select
        labelId="language-filter-label"
        value={value}
        label="Language"
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem value="">
          All languages
        </MenuItem>

        {languages.map((languages) => (
            <MenuItem
                key={languages.value}
                value={languages.value}
                >
                {languages.name}
            </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageFilter;