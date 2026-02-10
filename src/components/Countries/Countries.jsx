import './Countries.css'
import worldMap from '../../assets/world.png'
import { useNavigate } from 'react-router-dom'


const Countries = () => {
  const navigate = useNavigate()
  
  return (
    <main className="countries-page">
      <h1>MAP</h1>

      <div className="map-container">
        <img src={worldMap} alt="World map" className="world-map" />

        <div className="buttons-layer">
          <button className="continent asia" onClick={() => navigate('/countries/asia')}>ASIA</button>
          <button className="continent europe" onClick={() => navigate('/countries/europe')}>EUROPE</button>
          <button className="continent africa" onClick={() => navigate('/countries/africa')}>AFRICA</button>
          <button className="continent oceania" onClick={() => navigate('/countries/oceania')}>OCEANIA</button>

          <button className="continent north-america" onClick={() => navigate('/countries/north-america')}>NORTH AMERICA</button>
          <button className="continent south-america" onClick={() => navigate('/countries/south-america')}>SOUTH AMERICA</button>

        </div>
      </div>
    </main>
  )
}

export default Countries
