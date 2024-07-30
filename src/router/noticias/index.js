const routes = [
  {
    path: '/noticias',
    name: 'Noticias',
    meta: { requiresAuth: true },
    component: () => import('@/views/noticias/NoticiasView.vue')
  },

  {
    path: '/noticias/tour',
    name: 'Noticias Tour',
    meta: { requiresAuth: true },
    component: () => import('@/views/noticias/NoticiasTourView.vue')
  }
]

export default routes
