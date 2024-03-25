import api from './api'

export function Autenticar(_usuario, _senha) {
  return api
    .post('usuario/loginusuario',{
      txtCpfCnpjEmail: _usuario,
      txtSenha: _senha
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function postSaveUsuario(_idUsuario, _nome, _cpfcnpj, _email, _senha, _blnAcessoExterno) {
  return api
    .post('usuario/registro',{
      idUsuario: _idUsuario, txtCpfCnpj: _cpfcnpj, txtNome: _nome, txtEmail: _email, txtSenha: _senha, blnAcessoExterno : _blnAcessoExterno
    }, { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
// export function logout() {
//         localStorage.removeItem('token');
// }

//  const isAuthenticated = () => {
//         const token = localStorage.getItem('token');
//         // Check if token exists and not expired
//         return token !== null;
// }

    export function verifyToken(_token) {
      return api
        .post('usuario/verifyToken', { token: _token })
        .then((response) => response.data)
        .catch((error) => console.error(error))
        //const token = localStorage.getItem('token');
    }
    export default api