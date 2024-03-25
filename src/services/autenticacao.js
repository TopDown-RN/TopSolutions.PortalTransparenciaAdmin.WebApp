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

export function getContratoDetalhe(idContrato) {
  return api
    .get('contrato/ContratoDetAsync', {
      params: { idContrato: idContrato }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
export function logout() {
        localStorage.removeItem('token');
    }

 const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        // Check if token exists and not expired
        return token !== null;
}

    export function verifyToken(_token) {
      return api
        .post('usuario/verifyToken', { token: _token })
        .then((response) => response.data)
        .catch((error) => console.error(error))
        //const token = localStorage.getItem('token');
    }
    export default api