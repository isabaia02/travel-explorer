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

export async function getCountries({ limit = 100, offset = 0 } = {}) {
  const data = await request('', {
    limit,
    offset,
  });

  return data;
}

export async function searchCountries(
  query,
  { limit = 100, offset = 0 } = {},
) {
  if (!query?.trim()) {
    return {
      objects: [],
      meta: {
        total: 0,
        count: 0,
        limit,
        offset,
        more: false,
      },
    };
  }

  const data = await request('/name', {
    q: query.trim(),
    limit,
    offset,
  });

  return data;
}

export async function getCountryByCode(code) {
  return request(`/codes.alpha_2/${encodeURIComponent(code)}`);
}

export async function getCountryByName(name) {
  return request(`/names.common/${encodeURIComponent(name)}`);
}

export async function getCountriesByRegion(region) {
  return request(`/region/${encodeURIComponent(region)}`);
}

export async function getCountriesBySubregion(subregion) {
  return request(`/subregion/${encodeURIComponent(subregion)}`);
}

export async function getCountriesByCurrency(currency) {
  return request(`/currencies/${encodeURIComponent(currency)}`);
}