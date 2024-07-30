const routes = [
  {
    path: '/menus',
    name: 'Menus',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusView.vue')
  },
  {
    path: '/menus/tour',
    name: 'Menus Tour',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusTourView.vue')
  }
]

export default routes
