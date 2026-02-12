import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as questService from '../../services/questService'

const CountryQuests = () => {
  const { countryId } = useParams()
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await questService.getByCountry(countryId)
        setQuests(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [countryId])

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  const countryName = quests[0]?.country?.name || 'Country'

  return (
    <main>
      <h1>{countryName}</h1>

      {quests.length === 0 ? (
        <p>No quests yet for this country.</p>
      ) : (
        quests.map((q) => (
          <div key={q._id}>
            <Link to={`/quests/${q._id}`} >
              <h3>{q.general}</h3>
          </Link>
              <p>By: {q.author?.username}</p>
          </div>

        ))
      )}
    </main>
  )
}

export default CountryQuests
