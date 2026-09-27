import { useEffect, useState } from 'react';
import {
  getCountries,
  searchCountries,
} from './services/countriesApi';
import CountryGrid from './components/CountryGrid/CountryGrid';
import SearchBar from './components/SearchBar/SearchBar';
import Loading from './components/Loading/Loading';
import ErrorState from './components/ErrorState/ErrorState';
import EmptyState from './components/EmptyState/EmptyState';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function handleSearch(query) {
    try {
      setLoading(true);
      setError('');

      const data = query.trim()
        ? await searchCountries(query.trim())
        : await getCountries();

      setCountries(data.objects);
    } catch (error) {
      setCountries([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Travel Explorer</h1>
        <p>Explore countries around the world.</p>
      </header>

      <section className="countries-section">
        <SearchBar onSearch={handleSearch} />

        <h2>Countries</h2>

        <p>{countries.length} countries loaded.</p>

        {countries.length === 0 ? (
          <EmptyState />
        ) : (
          <CountryGrid countries={countries} />
        )}
      </section>
    </main>
  );
}

export default App;