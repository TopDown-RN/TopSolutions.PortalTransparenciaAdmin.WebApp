const routes = [
  {
    path: '/arquivos',
    name: 'Arquivos',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/Arquivos-Tmp.vue')
  }
]
export default routes
