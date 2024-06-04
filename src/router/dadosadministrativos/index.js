const routes = [
  {
    path: '/dados-administrativos',
    name: 'dados-administrativos',
    meta: { requiresAuth: true },
    component: () => import('@/views/dados-administrativos/DadosAdministrativosView.vue')
  }
]

export default routes
