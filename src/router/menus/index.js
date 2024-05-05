const routes = [
  {
    path: '/menus',
    name: 'menus',
    meta: { requiresAuth: true },
    component: () => import('@/views/menus/MenusView.vue')
  }
]

export default routes
