import api from './api'

// export const getDownloadPlanilha = (codPlanilha) => {
//     return api
//       .get('/importacaoplanilha/downloadasync', {
//         params: { codPlanilha: codPlanilha },
//         responseType: 'blob'
//       })
//       .then((response) => response)
//       .catch((error) => {
//         throw error
//       })
//   }

export function postPlanilha(formData) {
  return api
    .post('importacaoplanilha/importar', formData, {
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

export function visualizaDados(formData) {
  return api
    .post('importacaoplanilha/visualizarDados', formData, {
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

export function visualizarDadosImportados(_idRegistroImportacao) {
  return api
    .get('importacaoplanilha/visualizardadosimportados', {
      params: { idRegistoImportacao: _idRegistroImportacao }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log('error:', error)
      throw error
    })
}
