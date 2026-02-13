import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as questService from '../../services/questService'
import * as countryService from '../../services/countryService'

const CountryQuests = () => {
  const { continent, countryId } = useParams()
  const [country, setCountry] = useState(null)
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')

        const countryData = await countryService.show(countryId)
        setCountry(countryData)

        setQuests(countryData.quests || [])
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [countryId])

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return (
    <main>
      <h1>{country?.name || continent.toUpperCase()}</h1>

      {quests.length === 0 ? (
        <p>No quests yet for this country.</p>
      ) : (
        quests.map((q) => (
          <div key={q._id}>
            <p><strong>{q.author?.username}</strong></p>
            <Link to={`/users/${q.author._id}/quests/${q._id}`}>Open full quest →</Link>
          </div>
        ))
      )}
    </main>
  )
}

export default CountryQuests