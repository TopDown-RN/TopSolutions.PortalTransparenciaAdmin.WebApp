const routes = [
  {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
  }
]

export default routes
