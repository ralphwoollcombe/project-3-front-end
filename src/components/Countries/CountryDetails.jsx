import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as countryService from '../../services/countryService'

const CountryDetails = () => {
    const { countryId } = useParams()
    const [country, setCountry] = useState (null)
    const [loading, setLoading] = useState (true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading (true)
                const data = await countryService.show(countryId)
                setCountry(data)
            } catch (err) {
                setError (err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCountry()
    }, [countryId])
    
    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>{error}</h2>
    if (!country) return null 

    return (
        <main>
            <h1>{country.name}</h1>

            {country.quests.length === 0 ? (
                <p>No quests yet for this country.</p>
            ) : (
                <ul>
                    {country.quests.map((quest) => (
                        <li key={quest._id}>
                            <Link to={`/quests/${quest._id}`}>
                                <strong>{quest.general}</strong>
                            </Link>
                        </li>                        
                    ))}
                </ul>
            )}
        </main>
    )
}

export default CountryDetails