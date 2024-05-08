import axios from 'axios'
import { getToken } from '@/services/auth/authToken.js'

function getBaseUrl() {
  if (import.meta.env.DEV) {
    return 'https://localhost:7011'
  }

  return window.location.hostname ===
    'top-solutions-portal-transparencia-admin-web-app-develop.vercel.app'
    ? 'https://demo.topsolutionsrn.com.br/apiportaltranspadmin'
    : `http://api.${window.location.hostname}`
}

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// Axios response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // console.log("PASSA")
//     return response
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const token = localStorage.getItem('token')
//       if (token != '') localStorage.removeItem('token')
//       window.location.href = './'
//       //console.log(error.response)
//       //router.push({ path: '/' }) // Assuming you have Vue Router set up
//     } else if (error.response && error.response.status === 404) {
//       // Handle specific error codes
//       console.log('Page not found')
//       // Redirect to home page
//       router.push({ path: '/' }) // Assuming you have Vue Router set up
//     } else if (error.message === 'Network Error') {
//       // Handle network errors
//       console.log('Network error')
//       // Redirect to home page
//       router.push({ path: '/' }) // Assuming you have Vue Router set up
//     }
//     return Promise.reject(error.status)
//   }
// )

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     } else {
//       // Handle unauthorized access here, such as redirecting to login page
//       router.push({ name: 'login' }) // next('/');
//     }
//   }
//   next()
// })

export default api
