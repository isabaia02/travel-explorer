const API_URL = 'https://api.restcountries.com/countries/v5';

const API_TOKEN = import.meta.env.VITE_REST_COUNTRIES_TOKEN;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

async function request(endpoint = '', params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  const url = queryString
    ? `${API_URL}${endpoint}?${queryString}`
    : `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`REST Countries API error: ${response.status}`);
  }

  const result = await response.json();

  return result.data;
}

export async function getCountries({
  region = '',
  language = '',
  limit = 100,
  offset = 0,
} = {}) {
  return request('', {
    region,
    languages: language,
    limit,
    offset,
  });
}

export async function searchCountries(
  query,
  {
    region = '',
    language = '',
    limit = 100,
    offset = 0,
  } = {}
) {
  return request('/name', {
    q: query,
    region,
    languages: language,
    limit,
    offset,
  });
}

export function filterCountries(countries, { region = '', language = '' } = {}) {
  return countries.filter((country) => {
    const matchesRegion = !region || country.region === region;

    if (!matchesRegion || !language) {
      return matchesRegion;
    }

    const countryLanguages = country.languages;

    if (Array.isArray(countryLanguages)) {
      return countryLanguages.some((item) => (
        item === language
        || item.code === language
        || item.name === language
      ));
    }

    return Object.values(countryLanguages || {}).some((item) => (
      item === language || item?.name === language
    ));
  });
}