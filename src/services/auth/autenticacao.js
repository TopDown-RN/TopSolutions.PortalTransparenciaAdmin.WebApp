import api from '../api.js'

export function login(_usuario, _senha) {
  return api
    .post('autenticacao/usuario', {
      txtCpfCnpjEmail: _usuario,
      txtSenha: _senha
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function verifyToken(_token) {
  return api
    .post('usuario/verifyToken', { token: _token })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function redefinirSenha(txtCpfCnpjEmail) {
  return api
    .post('autenticacao/emailredefinirsenha', {
      txtCpfCnpjEmail: txtCpfCnpjEmail
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export default api
