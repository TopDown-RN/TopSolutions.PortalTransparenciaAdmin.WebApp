import api from './api'

export function getNoticias() {
  return api
    .get('noticias/listarasync')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function postNoticias(formData) {
  return api
    .post('noticias/adicionarasync', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
