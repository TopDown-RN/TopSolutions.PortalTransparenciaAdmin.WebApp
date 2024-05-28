import api from './api'

export function getDadosOuvidoria() {
  return api
    .get('dadosouvidoria/listardados')
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

export function postDadosOuvidoria(formData) {
  return api
    .post('dadosouvidoria/gravardados', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}
