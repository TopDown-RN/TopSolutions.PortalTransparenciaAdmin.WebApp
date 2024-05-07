export function addToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function getToken() {
  const token = localStorage.getItem('token')
  return token !== null
}
