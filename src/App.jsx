import { useEffect, useState } from 'react';
import { getCountries } from './services/countriesApi';
import CountryCard from './components/CountryCard/CountryCard';
import CountryGrid from './components/CountryGrid/CountryGrid';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true);
        setError('');

        const data = await getCountries();

        setCountries(data.objects);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Travel Explorer</h1>
        <p>Explore countries around the world.</p>
      </header>

      <section className="countries-section">
        <h2>Countries</h2>

        <p>{countries.length} countries loaded.</p>

        <CountryGrid countries={countries} />
      </section>
    </main>
  );
}

export default App;