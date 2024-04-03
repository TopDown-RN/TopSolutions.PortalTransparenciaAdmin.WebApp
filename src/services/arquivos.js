import api from './api'

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

export default api
