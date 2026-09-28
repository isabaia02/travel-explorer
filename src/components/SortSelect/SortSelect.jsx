import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'population-desc', label: 'Population (high to low)' },
  { value: 'population-asc', label: 'Population (low to high)' },
  { value: 'area-desc', label: 'Area (largest to smallest)' },
  { value: 'area-asc', label: 'Area (smallest to largest)' },
];

function SortSelect({ value, onChange }) {
  return (
    <FormControl
      size="small"
      sx={{
        width: 220,
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <InputLabel id="sort-select-label">
        Sort by
      </InputLabel>

      <Select
        labelId="sort-select-label"
        value={value}
        label="Sort by"
        onChange={(event) => onChange(event.target.value)}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortSelect;