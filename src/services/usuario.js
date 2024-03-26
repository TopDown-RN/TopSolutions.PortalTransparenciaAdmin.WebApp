import api from './api'


export function postSaveUsuario(_idUsuario, _nome, _cpfcnpj, _email, _senha, _blnAcessoExterno) {
  return api
    .post('usuario/registro',{
      idUsuario: _idUsuario, txtCpfCnpj: _cpfcnpj, txtNome: _nome, txtEmail: _email, txtSenha: _senha, blnAcessoExterno : _blnAcessoExterno
    }, { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getUsuarios(_blnAcessoExterno) {
  return api
    .get('usuario/listar',{
      blnAcessoExterno : _blnAcessoExterno
    }, { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export default api