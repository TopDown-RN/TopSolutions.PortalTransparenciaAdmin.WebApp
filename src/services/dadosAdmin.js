import api from './api'

export function getDadosAdmin() {
  return api
    .get('dadosadministrativo/listardados')
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function postDadosAdmin(formData) {
  return api
    .post('dadosadministrativo/gravardados', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log('error:', error)
      throw error
    })
}

export function postCredenciais(formData) {
  return api
    .post('dadosadministrativo/gravarcredenciais', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`erro: ${error}`)
    })
}

export function postSobrePortal(formData) {
  return api
    .post('dadosadministrativo/gravarsobreportal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Erro: ${error}`)
    })
}
