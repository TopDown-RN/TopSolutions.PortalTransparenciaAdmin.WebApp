import api from './api'

export function getArquivos() {
  return api
    .get(`arquivo/listararquivosAsync`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export const LerArquivoPorIdApi = (idArquivo) => {
  return api
    .get('/arquivo/downloadarquivoporidasync', {
      params: { idArquivo: idArquivo },
      responseType: 'blob'
    })
    .then((response) => response)
    .catch((error) => console.error(error))
}

export function postArquivos(_oData) {
  console.log(_oData)
  return api
    .post('arquivo/salvarasync', _oData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function atualizarArquivo(dados) {
  return api
    .post('arquivo/atualizararquivosasync', dados, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function deleteArquivo(ids) {
  return api
    .delete('arquivo/DeletarCategoriaArquivoAsync', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: ids
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function getCategorias() {
  return api
    .get(`arquivo/listCategoriasArquivosAsync`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function postCategoria(dados) {
  return api
    .post('arquivo/adicionarcategoriaarquivoasync', dados, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export function deleteCategoria(idCategoria) {
  return api
    .delete(`arquivo/ExcluirCategoriaAsync`, {
      params: { idCategoria: idCategoria }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

// export function postAnoCategoria(dados) {
//   return api
//     .post('arquivo/adicionaranocategoriaasync', dados, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then((response) => response.data)
//     .catch((error) => console.error(error))
// }

// export function getCategoriasAgrupadaAno(ano, idmenu) {
//   console.log('ano e idmenu', ano, idmenu)
//   return api
//     .get(`arquivo/listCategoriasAgrupadaPorAno?ano=${ano}&idmenu=${idmenu}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then((response) => response.data)
//     .catch((error) => console.error(error))
// }

// export function getAnoCategorias(categoria, ano) {
//   return api
//     .get(`arquivo/LerAnoCategoriaAsync?idcategoria=${categoria}&ano=${ano}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then((response) => response.data)
//     .catch((error) => console.error(error))
// }

export default api
