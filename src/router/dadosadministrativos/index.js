const routes = [
  {
    path: '/dados-administrativos',
    name: 'Dados Administrativos',
    meta: { requiresAuth: true },
    component: () => import('@/views/dados-administrativos/DadosAdministrativosView.vue')
  }
]

export default routes
