const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/auth/LoginView.vue')
  }
]

export default routes
