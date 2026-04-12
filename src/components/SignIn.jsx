import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/authService'
import { AuthContext } from '../contexts/AuthContext'
import './Auth.css'

const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const handleChange = (evt) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const signedInUser = await signIn(formData)
      setUser(signedInUser)
      navigate('/')
    } catch (err) {
      setMessage('Invalid Credentials')
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Sign In</h1>

        {message && <p className="auth-message">{message}</p>}

        <form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-buttons">
            <button type="submit">Sign In</button>
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SignIn