const routes = [
  {
    path: '/menu',
    name: 'menu',
    meta: { requiresAuth: true },
    component: () => import('@/views/menu/MenuView.vue')
  },
]

export default routes
