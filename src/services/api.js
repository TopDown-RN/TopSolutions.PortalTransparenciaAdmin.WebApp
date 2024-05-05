import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://localhost:7011'
    : 'https://demo.topsolutionsrn.com.br/apiportaltranspadmin',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Axios response interceptor
api.interceptors.response.use(
  (response) => {
   // console.log("PASSA")
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401)  {
      const token = localStorage.getItem('token')
      if (token != '') localStorage.removeItem('token')
      window.location.href = "./"
      //console.log(error.response)
      //router.push({ path: '/' }) // Assuming you have Vue Router set up
    } else if (error.response && error.response.status === 404) {
      // Handle specific error codes
      console.log('Page not found')
      // Redirect to home page
      router.push({ path: '/' }) // Assuming you have Vue Router set up
    } else if (error.message === 'Network Error') {
      // Handle network errors
      console.log('Network error')
      // Redirect to home page
      router.push({ path: '/' }) // Assuming you have Vue Router set up
    } 
    return Promise.reject(error.status)
  }
)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      // Handle unauthorized access here, such as redirecting to login page
      router.push({ name: 'login' }) // next('/');
    }
  }
  next()
})

export default api
