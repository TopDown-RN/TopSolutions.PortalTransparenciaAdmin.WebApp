const routes = [
  {
    path: '/dados-administrativos',
    name: 'dados-administrativos',
    meta: { requiresAuth: true },
    component: () => import('@/views/dados-administrativos/DadosAdministrativosView.vue')
  },
  {
    path: '/credenciais',
    name: 'Credenciais',
    meta: { requiresAuth: true },
    component: () => import('@/views/dados-administrativos/CredenciaisView.vue')
  }
]

export default routes
