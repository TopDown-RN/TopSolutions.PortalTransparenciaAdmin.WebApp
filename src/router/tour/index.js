const routes = [
  {
    path: '/tour',
    name: 'Ajuda',
    meta: { requiresAuth: true },
    component: () => import('@/views/tour/TourView.vue')
  },
  {
    path: '/menus/tour',
    name: 'MenusTour',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusTourView.vue')
  },
  {
    path: '/arquivos/tour',
    name: 'ArquivosTour',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/ArquivosTourView.vue')
  }
]

export default routes
