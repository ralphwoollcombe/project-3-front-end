import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const NavBar = () => {
  const { user } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}

      {user ? (
        <>
          <span>Welcome</span>
          {' | '}
          <Link to={`/users/${user._id}/quests`} >My Quests</Link>
          {' | '}
          <Link to={'/quests/new'} >New Quest</Link>
          {' | '}
          <Link to="/sign-out">Sign Out</Link>
        </>
      ) : (
        <>
          <Link to="/sign-in">Sign In</Link>
          {' | '}
          <Link to="/sign-up">Sign Up</Link>
        </>
      )}
    </nav>
  )
}

export default NavBar
