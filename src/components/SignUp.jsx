import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/authService'
import { AuthContext } from '../contexts/AuthContext'

const SignUp = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    })

    const { username, password, passwordConf } = formData


    const handleChange = (evt) => {
        setMessage('')
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }


    const handleSubmit = async (evt) => {
        evt.preventDefault()
        if (password !== passwordConf) {
            setMessage('Passwords do not match')
            return
        }

        try {
            const newUser = await signUp(formData)
            setUser(newUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id='username'
                        value={username}
                        name='username'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="passwordConf">Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordConf"
                        value={passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    )

}

export default SignUp