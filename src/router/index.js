import { createRouter, createWebHistory } from 'vue-router'

import AutenticacaoRoutes from '@/router/auth'
import DadosAdminRoutes from '@/router/dadosadministrativos'
import UsuariosRoutes from '@/router/usuarios'
//import AuthService from '@/services/autenticacao'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...AutenticacaoRoutes,
    {
      path: '/home',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/views/home/HomeView.vue')
    },
    ...UsuariosRoutes,
    ...DadosAdminRoutes
  ]
});

function fnisAuthenticated() {
  const token = localStorage.getItem('token');
  // Check if token exists and not expired
  return token !== null;
}

function fnLogout() {
  localStorage.removeItem('token');
}


router.beforeEach(async (to, from, next) => {
  if (to.name.toLocaleLowerCase() == "logout".toLocaleLowerCase()){
    fnLogout()
    router.push({name : 'login'})
  }
  if (to.meta.requiresAuth) {
      const isAuthenticated = await fnisAuthenticated();
      if (!isAuthenticated) {
          next('/'); // Redirect to login if not authenticated
      } else {
          // Verify token before navigating to the route
          try {
              //await AuthService.verifyToken();
              next();
          } catch (error) {
              //fnLogout(); // Token verification failed, logout user
              next('/');
          }
      }
  } else {
      next();
  }
});

export default router
