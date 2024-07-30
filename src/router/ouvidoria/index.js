const routes = [
  {
    path: '/ouvidoria',
    name: 'Ouvidoria',
    meta: { requiresAuth: true },
    component: () => import('@/views/ouvidoria/OuvidoriaView.vue')
  },

  {
    path: '/ouvidoria/tour',
    name: 'Ouvidoria Tour',
    meta: { requiresAuth: true },
    component: () => import('@/views/ouvidoria/OuvidoriaTourView.vue')
  }
]

export default routes
