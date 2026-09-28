import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const regions = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
];

function RegionFilter({ value, onChange }) {
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
      <InputLabel id="region-filter-label">
        Region
      </InputLabel>

      <Select
        labelId="region-filter-label"
        value={value}
        label="Region"
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem value="">
          All regions
        </MenuItem>

        {regions.map((region) => (
          <MenuItem
            key={region}
            value={region}
          >
            {region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default RegionFilter;