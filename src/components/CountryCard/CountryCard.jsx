import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';

function CountryCard({ country }) {
  const {
    names,
    flag,
    capitals,
    region,
    population,
  } = country;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={flag?.url_png}
        alt={flag?.description || `Flag of ${names.common}`}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3">
          {flag?.emoji} {names.common}
        </Typography>

        <Typography variant="body2">
          Capital: {capitals?.[0]?.name || 'N/A'}
        </Typography>

        <Typography variant="body2">
          Population: {population?.toLocaleString() || 'N/A'}
        </Typography>

        <Chip
          label={region || 'Unknown region'}
          size="small"
          sx={{ marginTop: 1 }}
        />
      </CardContent>
    </Card>
  );
}

export default CountryCard;