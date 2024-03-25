const routes = [
  {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/auth/LoginView.vue')
  }
]

export default routes
