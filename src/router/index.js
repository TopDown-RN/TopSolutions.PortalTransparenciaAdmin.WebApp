import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/services/auth/authStorage'
import AutenticacaoRoutes from '@/router/auth'
import DadosAdminRoutes from '@/router/dadosadministrativos'
import UsuariosRoutes from '@/router/usuarios'
import ArquivosRoutes from '@/router/arquivos'
import MenusRoutes from '@/router/menus'
import OuvidoriaRoutes from '@/router/ouvidoria'
import ImportacaoPlanilhaRoutes from '@/router/importacao-planilha'
import CredenciaisRoutes from '@/router/credenciais'
import NoticiasRoutes from '@/router/noticias'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/components/errors/NotFound.vue'),
      meta: { layout: 'none' }
    },
    ...UsuariosRoutes,
    ...DadosAdminRoutes,
    ...AutenticacaoRoutes,
    ...ArquivosRoutes,
    ...MenusRoutes,
    ...OuvidoriaRoutes,
    ...ImportacaoPlanilhaRoutes,
    ...CredenciaisRoutes,
    ...NoticiasRoutes
  ]
})

// router.beforeResolve((to) => {
//   //next({ path: '/login', query: { redirect: to.fullPath }})
//   if (to.meta.requiresAuth && !fnisAuthenticated) return false
//   //if (router.hasRoute(to.fullPath)) return false
// })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getToken()) {
    next('/login')
  } else if (to.meta.requiresGuest && getToken()) {
    next('/')
  } else {
    next()
  }
})

export default router
