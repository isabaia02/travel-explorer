import CountryCard from '../CountryCard/CountryCard';
import './CountryGrid.css';

function CountryGrid({ countries }) {
  return (
    <div className="countries-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.codes.alpha_2}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryGrid;