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

//router.

router.beforeResolve(to => {
  //console.log(router.hasRoute(to.path))
  if (to.meta.requiresAuth && !fnisAuthenticated) return false
  //if (router.hasRoute(to.fullPath)) return false
});


export default router
