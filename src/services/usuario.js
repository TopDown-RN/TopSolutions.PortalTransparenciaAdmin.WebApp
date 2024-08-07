import api from './api'

export function postSaveUsuario(
  _idUsuario,
  _nome,
  _cpfcnpj,
  _email,
  _senha,
  _blnAcessoExterno,
  _blnAlterarSenha
) {
  return api
    .post(
      'usuario/registro',
      {
        idUsuario: _idUsuario,
        txtCpfCnpj: _cpfcnpj,
        txtNome: _nome,
        txtEmail: _email,
        txtSenha: _senha,
        blnAcessoExterno: _blnAcessoExterno,
        blnAlterarSenha: _blnAlterarSenha
      },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function getListaUsuarios(_blnAcessoExterno) {
  return api
    .get(
      'usuario/listar',
      { params: { blnAcessoExterno: _blnAcessoExterno } },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function getUsuario(_idUsuario) {
  return api
    .get(
      'usuario/ler',
      { params: { idusuario: _idUsuario } },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function getPorToken() {
  return api
    .get(
      'usuario/LerPorToken',
      { params: { token: localStorage.getItem('token') } },
      { Authorization: `Bearer ${localStorage.getItem('token')}` }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function alterarSenha(senha, cpf) {
  console.log(senha, cpf)
  return api
    .patch(`usuario/alterarsenha?novaSenha=${senha}&txtCpfCnpj=${cpf}`, {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function acessoMoviDesk() {
  return api
    .get('usuario/acessomovidesk', {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export default api
