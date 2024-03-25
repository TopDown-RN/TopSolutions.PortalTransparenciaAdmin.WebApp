import axios from 'axios'
import router from '@/router'; 

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://localhost:7011'
    : 'https://demo.topsolutionsrn.com.br/apiportaltransp',
  headers: {
    'Content-Type': 'application/json'
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Handle unauthorized access here, such as redirecting to login page
      router.push({name: 'login'});// next('/');
    }
  }
  next();
});

export default api
