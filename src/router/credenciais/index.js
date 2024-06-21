const routes = [
  {
    path: '/credenciais',
    name: 'Credenciais',
    meta: { requiresAuth: true },
    component: () => import('@/views/credenciais/CredenciaisView.vue')
  }
]

export default routes
