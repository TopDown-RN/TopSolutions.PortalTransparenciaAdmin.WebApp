import api from './api'

export function Autenticar(_usuario, _senha) {
  return api
    .post('contrato/contratoasync',{
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
