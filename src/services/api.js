import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://localhost:7011'
    : 'https://demo.topsolutionsrn.com.br/apiportaltransp',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
