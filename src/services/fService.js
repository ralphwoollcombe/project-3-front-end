const BASE_URL = 'https://restcountries.com/v3.1'

const getByRegion = async (region) => {
  const res = await fetch(
    `${BASE_URL}/region/${region}?fields=name,flags,cca2,cca3`
  )

  if (!res.ok) throw new Error('Failed to fetch countries')

  return res.json()
}

export { getByRegion }
