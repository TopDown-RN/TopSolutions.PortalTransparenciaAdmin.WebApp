import api from './api'

export function postArquivos(_oData) {
  return api
    .post('usuario/registro',{ _oData }, { 
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
   }})
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export default api