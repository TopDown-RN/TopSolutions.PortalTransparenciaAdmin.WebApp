import api from './api'

export function postMenu(dados) {
  return api
    .post('menu/InserirAsync', dados)
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getMenus() {
  return api
    .get('menu/ListarTodosAsync')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getMenusArquivo() {
  return api
    .get('menu/ListarMenusArquivoAsync')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
