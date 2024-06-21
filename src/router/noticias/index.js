const routes = [
  {
    path: '/noticias',
    name: 'Noticias',
    meta: { requiresAuth: true },
    component: () => import('@/views/noticias/NoticiasView.vue')
  }
]

export default routes
