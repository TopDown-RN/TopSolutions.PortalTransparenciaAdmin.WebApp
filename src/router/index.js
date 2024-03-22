import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/views/usuarios/ListaUsuarios.vue')
    },
    {
      path: '/usuarios/novo-usuario',
      name: 'novo-usuario',
      component: () => import('@/views/usuarios/NovoUsuario.vue')
    },
    {
      path: '/dados-administrativos',
      name: 'dados-administrativos',
      component: () => import('@/views/dados-administrativos/EditarDados.vue')
    }
  ]
})

export default router
