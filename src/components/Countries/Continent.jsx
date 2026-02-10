import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Continent.css'
import * as countryService from '../../services/countryService'
import * as flagService from '../../services/flagService'

const normalizeForRestCountries = (continentParam) => {
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

        const dbCountries = await countryService.index()

        const param = continent.toLowerCase()

        let filtered = dbCountries.filter((c) => {
          const dbCont = (c.continent || c.region || '').toLowerCase()
          return dbCont === param
        })
        if (
          filtered.length === 0 &&
          (param === 'north-america' || param === 'south-america')
        ) {
          filtered = dbCountries.filter((c) => {
            const dbCont = (c.continent || c.region || '').toLowerCase()
            return dbCont === 'americas'
          })
        }

        const restRegion = normalizeForRestCountries(continent)
        const apiCountries = await flagService.getByRegion(restRegion)

        const apiMap = new Map(
          apiCountries.map((c) => [
            c.cca3,
            { flag: c.flags?.png, name: c.name?.common },
          ])
        )

        const merged = filtered.map((c) => {
          const code = (c.cca3 || c.code || c.alpha3Code || '').toUpperCase()
          const extra = apiMap.get(code)

          return {
            ...c,
            cca3: code,
            displayName: extra?.name || c.name || c.countryName || 'Unknown',
            flagUrl: extra?.flag,
          }
        })

        merged.sort((a, b) => a.displayName.localeCompare(b.displayName))
        setCountries(merged)
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
      <h1 className="continent-title">{continent.toUpperCase()}</h1>

      <div className="countries-grid">
        {countries.map((c) => (
          <div key={c._id || c.cca3} className="country-card">
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
