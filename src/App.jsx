import { useEffect, useState, useMemo } from 'react';
import {
  filterCountries,
  getCountries,
  searchCountries,
} from './services/countriesApi';
import CountryGrid from './components/CountryGrid/CountryGrid';
import SearchBar from './components/SearchBar/SearchBar';
import RegionFilter from './components/RegionFilter/RegionFilter';
import LanguageFilter from './components/LanguageFilter/LanguageFilter';
import Loading from './components/Loading/Loading';
import ErrorState from './components/ErrorState/ErrorState';
import EmptyState from './components/EmptyState/EmptyState';
import SortSelect from './components/SortSelect/SortSelect';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const sortedCountries = useMemo(() => {
    const sorted = [...countries];

    switch (sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) =>
          a.names.common.localeCompare(b.names.common)
        );

      case 'name-desc':
        return sorted.sort((a, b) =>
          b.names.common.localeCompare(a.names.common)
        );

      case 'population-desc':
        return sorted.sort(
          (a, b) => b.population - a.population
        );

      case 'population-asc':
        return sorted.sort(
          (a, b) => a.population - b.population
        );

      case 'area-desc':
        return sorted.sort(
          (a, b) =>
            b.area.kilometers - a.area.kilometers
        );

      case 'area-asc':
        return sorted.sort(
          (a, b) =>
            a.area.kilometers - b.area.kilometers
        );

      default:
        return sorted;
    }
  }, [countries, sortOption]);

  async function handleSearch(
    searchQuery = query,
    selectedRegion = region,
    selectedLanguage = language
  ) {
    try {
      setLoading(true);
      setError('');

      const normalizedQuery = searchQuery.trim();
      const data = normalizedQuery
        ? await searchCountries(normalizedQuery, {
          region: selectedRegion,
          language: selectedLanguage,
        })
        : await getCountries({
          region: selectedRegion,
          language: selectedLanguage,
        });

      setCountries(filterCountries(data.objects, {
        region: selectedRegion,
        language: selectedLanguage,
      }));
    } catch (error) {
      setCountries([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleRegionChange(nextRegion) {
    setRegion(nextRegion);
    handleSearch(query, nextRegion);
  }

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage);
    handleSearch(query, region, nextLanguage);
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
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        <div className="filters-row">
          <RegionFilter
            value={region}
            onChange={handleRegionChange}
          />

          <LanguageFilter
            value={language}
            onChange={handleLanguageChange}
          />

          <SortSelect
            value={sortOption}
            onChange={setSortOption}
          />
        </div>

        <h2>Countries</h2>

        <p>{sortedCountries.length} countries loaded.</p>

        {countries.length === 0 ? (
          <EmptyState />
        ) : (
          <CountryGrid countries={sortedCountries} />
        )}
      </section>
    </main>
  );
}

export default App;