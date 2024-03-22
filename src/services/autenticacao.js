import api from './api'

export function getContratos() {
  return api
    .get('contrato/contratoasync')
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
