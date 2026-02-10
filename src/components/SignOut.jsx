import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const SignOut = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }, [setUser, navigate])

  return (
    <main>
      <h1>Signing out...</h1>
    </main>
  )
}

export default SignOut
