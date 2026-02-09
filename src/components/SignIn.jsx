import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleFakeSignIn = () => {
    setUser({ username: 'adil' })
    navigate('/')
  }

  return (
    <main>
      <h1>Sign In</h1>
      <button onClick={handleFakeSignIn}>Fake Sign In</button>
    </main>
  )
}

export default SignIn
