import api from './api'

export function getRegistroImportacao() {
  return api
    .get('registroimportacao/listar')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
