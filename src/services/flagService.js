const REST_URL = 'https://restcountries.com/v3.1';

const getByRegion = async (region) => {
  const res = await fetch(`${REST_URL}/region/${region}`);
  if (!res.ok) throw new Error('Failed to fetch flags data');
  return await res.json();
};

const getByCode = async (code) => {
  const res = await fetch(`${REST_URL}/alpha/${code}`);
  if (!res.ok) throw new Error('Failed to fetch country detail');
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
};

export { getByRegion, getByCode };

