const routes = [
  {
    path: '/menus',
    name: 'Menus',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusView.vue')
  }
]

export default routes
