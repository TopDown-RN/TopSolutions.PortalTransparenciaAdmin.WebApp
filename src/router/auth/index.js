const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { requiresGuest: true },
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/esqueceu-senha',
    name: 'Esqueceu Senha',
    meta: { requiresGuest: true },
    component: () => import('@/views/auth/EsqueceuSenhaView.vue')
  },
  {
    path: '/redefinir-senha',
    name: 'Redefinir Senha',
    meta: { requiresGuest: true },
    component: () => import('@/views/auth/RedefinirSenhaView.vue')
  }
]

export default routes
