import api from './api'

export function postSaveUsuario(_idUsuario, _nome, _cpfcnpj, _email, _senha, _blnAcessoExterno) {
  return api
    .post(
      'usuario/registro',
      {
        idUsuario: _idUsuario,
        txtCpfCnpj: _cpfcnpj,
        txtNome: _nome,
        txtEmail: _email,
        txtSenha: _senha,
        blnAcessoExterno: _blnAcessoExterno
      },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getListaUsuarios(_blnAcessoExterno) {
  return api
    .get(
      'usuario/listar',
      { params: { blnAcessoExterno: _blnAcessoExterno } },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getUsuario(_idUsuario) {
  return api
    .get(
      'usuario/ler',
      { params: { idusuario: _idUsuario } },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export default api
