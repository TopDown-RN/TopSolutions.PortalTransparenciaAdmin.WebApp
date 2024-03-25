const routes = [
  {
      path: '/dados-administrativos',
      name: 'dados-administrativos',
      meta: { requiresAuth: true },
      component: () => import('@/views/dados-administrativos/EditarDados.vue')
  }
]

export default routes
