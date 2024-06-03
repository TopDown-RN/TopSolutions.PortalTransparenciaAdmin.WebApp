const routes = [
  {
    path: '/ouvidoria',
    name: 'Ouvidoria',
    meta: { requiresAuth: true },
    component: () => import('@/views/ouvidoria/OuvidoriaView.vue')
  }
]

export default routes
