import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Continent.css'
import * as countryService from '../../services/countryService'

const normalizeRegion = (continentParam) => {
  if (continentParam === 'north-america' || continentParam === 'south-america') {
    return 'americas'
  }
  return continentParam
}

const Continent = () => {
  const { continent } = useParams()
  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError('')

        const region = normalizeRegion(continent)
        let data = await countryService.getByRegion(region)

        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [continent])

  if (loading) return <h2 className="continent-status">Loading...</h2>
  if (error) return <h2 className="continent-status">{error}</h2>

  return (
    <main className="continent-page">
      <h1 className="continent-title">{continent}</h1>

      <div className="countries-grid">
        {countries.map((c) => (
          <div key={c.cca3} className="country-card">
            <img
              src={c.flags.png}
              alt={`${c.name.common} flag`}
              className="country-flag"
            />
            <div className="country-name">{c.name.common}</div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Continent
