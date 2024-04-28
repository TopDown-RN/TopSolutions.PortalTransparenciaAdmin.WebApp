import api from './api'

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

export function postAnoCategoria(dados) {
  return api
    .post('arquivo/adicionaranocategoriaasync', dados, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

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

export function getCategoriasAgrupadaAno(ano) {
  return api
    .get(`arquivo/listCategoriasAgrupadaPorAno?ano=${ano}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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

export function getAnoCategorias(categoria, ano) {
  console.log('cat e ano', categoria, ano)
  return api
    .get(`arquivo/LerAnoCategoriaAsync?idcategoria=${categoria}&ano=${ano}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export default api
