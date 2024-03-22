import { createRouter, createWebHistory } from 'vue-router'

import AutenticacaoRoutes from '@/router/auth'
import DadosAdminRoutes from '@/router/dadosadministrativos'
import UsuariosRoutes from '@/router/usuarios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...AutenticacaoRoutes,
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    ...UsuariosRoutes,
    ...DadosAdminRoutes
  ]
})

export default router
