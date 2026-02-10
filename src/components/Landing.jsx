import { Link } from 'react-router-dom'
import './Landing.css'
import worldMap from '../assets/world.png' 
const Landing = () => {
  return (
    <main className="landing">
      <img className="landing-map" src={worldMap} alt="World map background" />

      <div className="landing-overlay">
        <h1 className="landing-title">Welcome</h1>

        <div className="landing-actions">
          <Link to="/sign-in"><button>Sign In</button></Link>
          <Link to="/sign-up"><button>Sign Up</button></Link>
        </div>
      </div>
    </main>
  )
}

export default Landing
