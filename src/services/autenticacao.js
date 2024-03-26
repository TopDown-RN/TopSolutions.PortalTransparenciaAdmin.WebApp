import api from './api'

export function Autenticar(_usuario, _senha) {
  return api
    .post('autenticacao/usuario',{
      txtCpfCnpjEmail: _usuario,
      txtSenha: _senha
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function verifyToken(_token) {
  return api
    .post('usuario/verifyToken', { token: _token })
    .then((response) => response.data)
    .catch((error) => console.error(error))
    //const token = localStorage.getItem('token');
}
export default api