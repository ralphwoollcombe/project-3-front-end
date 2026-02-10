import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import './NavBar.css'

const NavBar = () => {
  const { user } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="brand" to={user ? '/countries' : '/'}>WorldQuest</Link>

        {user && (
          <>
            <Link to="/countries">Map</Link>
            <Link to={`/users/${user._id}/quests`}>My Quests</Link>
            <Link to="/quests/new">New Quest</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/sign-in">Sign In</Link>
              {' | '}
            <Link to="/sign-up">Sign Up</Link>
          </>
        ) : (
          <Link to="/sign-out">Log Out</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
