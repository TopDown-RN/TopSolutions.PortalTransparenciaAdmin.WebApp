import { createRouter, createWebHistory } from 'vue-router'

import AutenticacaoRoutes from '@/router/auth'
import DadosAdminRoutes from '@/router/dadosadministrativos'
import UsuariosRoutes from '@/router/usuarios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/views/home/HomeView.vue')
    },
    ...UsuariosRoutes,
    ...DadosAdminRoutes,
    ...AutenticacaoRoutes
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
  //next({ path: '/login', query: { redirect: to.fullPath }})
  if (to.meta.requiresAuth && !fnisAuthenticated) return false
  //if (router.hasRoute(to.fullPath)) return false
});


export default router
