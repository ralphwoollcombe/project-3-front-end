import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Continent.css'
import * as countryService from '../../services/countryService'
import * as flagService from '../../services/flagService'

const normalizeForRestCountries = (continentParam) => {
  const c = (continentParam || '').toLowerCase()
  if (c === 'north-america' || c === 'south-america' || c === 'america') {
    return 'americas'
  }
  return c
}

const Continent = () => {
  const { continent } = useParams()
  const navigate = useNavigate()

  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError('')

        const dbCountries = await countryService.index()
        const dbMap = new Map(
          dbCountries.map((c) => [String(c.name || '').toLowerCase(), c._id])
        )
        const restRegion = normalizeForRestCountries(continent)
        const apiCountries = await flagService.getByRegion(restRegion)

        const merged = apiCountries
          .map((c) => {
            const apiName = c.name?.common || 'Unknown'
            const dbId = dbMap.get(apiName.toLowerCase()) || null

            return {
              cca3: c.cca3,
              displayName: apiName,
              flagUrl: c.flags?.png,
              dbId,
            }
          })
          .sort((a, b) => a.displayName.localeCompare(b.displayName))

        setCountries(merged)
      } catch (err) {
        setError(err.message || 'Something went wrong')
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
      <h1 className="continent-title">{continent.toUpperCase()}</h1>

      <div className="countries-grid">
        {countries.map((c) => (
          <div
            key={c.dbId || c.cca3}
            className="country-card"
            onClick={() => c.dbId && navigate(`/countries/${continent}/${c.dbId}`)}
            style={{
              cursor: c.dbId ? 'pointer' : 'not-allowed',
              opacity: c.dbId ? 1 : 0.4,
            }}
          >
            {c.flagUrl && (
              <img
                src={c.flagUrl}
                alt={`${c.displayName} flag`}
                className="country-flag"
              />
            )}
            <div className="country-name">{c.displayName}</div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Continent
