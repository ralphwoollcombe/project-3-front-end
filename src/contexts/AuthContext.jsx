import { createContext, useState } from 'react'

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
})

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    return JSON.parse(atob(token.split('.')[1])).payload
  } catch {
    localStorage.removeItem('token')
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken())

  const value = { user, setUser }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
