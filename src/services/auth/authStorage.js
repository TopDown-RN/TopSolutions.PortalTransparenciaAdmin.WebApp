export function addToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function getToken() {
  const token = localStorage.getItem('token')
  return token
}

export function setIdUsuario(idUsuario) {
  localStorage.setItem('idUsuario', idUsuario)
}

export function getIdUsuario() {
  const idUsuario = localStorage.getItem('idUsuario')
  return idUsuario
}
