import { useEffect } from 'react';
import { getCountries } from './services/countriesApi';

function App() {
  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getCountries();

        console.log(data);
        console.log(data.objects);
        console.log(data.meta);
      } catch (error) {
        console.error(error);
      }
    }

    loadCountries();
  }, []);

  return <h1>Travel Explorer</h1>;
}

export default App;