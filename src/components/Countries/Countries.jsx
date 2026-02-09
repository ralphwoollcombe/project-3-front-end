import './Countries.css'
import worldMap from '../../assets/world.png'

const Countries = () => {
  return (
    <main className="countries-page">
      <h1>MAP</h1>

      <div className="map-container">
        <img src={worldMap} alt="World map" className="world-map" />

        <div className="buttons-layer">
          <button className="continent north-america">NORTH AMERICA</button>
          <button className="continent south-america">SOUTH AMERICA</button>
          <button className="continent europe">EUROPE</button>
          <button className="continent africa">AFRICA</button>
          <button className="continent asia">ASIA</button>
          <button className="continent oceania">OCEANIA</button>
        </div>
      </div>
    </main>
  )
}

export default Countries
