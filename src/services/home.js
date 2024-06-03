import api from './api'

export function getRegistroImportacao() {
  return api
    .get('registroimportacao/listar')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}


export function getRegistroImportacaoManuais() {
  return api
    .get('registroimportacao/listarmanuais')
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function deletarRegistroImportcaoManuais(idRegistro){
  return api
    .post(`registroimportacao/deletarRegistroManuais?idRegistro=${idRegistro}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}



// .get('/importacaoplanilha/downloadasync', {
//   params: { codPlanilha: codPlanilha },
//   //responseType: 'blob'
// })