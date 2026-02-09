const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`

const decodeToken = (token) => {
  return JSON.parse(atob(token.split('.')[1])).payload
}

const signUp = async (formData) => {
  const res = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const data = await res.json()

  if (!res.ok || data.err) {
    throw new Error(data.err || 'Sign up failed')
  }

  if (!data.token) {
    throw new Error('Invalid response from server')
  }

  localStorage.setItem('token', data.token)
  return decodeToken(data.token)
}

const signIn = async (formData) => {
  const res = await fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const data = await res.json()

  if (!res.ok || data.err) {
    throw new Error(data.err || 'Sign in failed')
  }

  if (!data.token) {
    throw new Error('Invalid response from server')
  }

  localStorage.setItem('token', data.token)
  return decodeToken(data.token)
}

export { signUp, signIn }
