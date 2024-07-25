const routes = [
  {
    path: '/tour',
    name: 'Ajuda',
    meta: { requiresAuth: true },
    component: () => import('@/views/tour/TourView.vue')
  },
  {
    path: '/menus/tour?redirect=',
    name: 'MenusTour',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusTourView.vue')
  }
]

export default routes
