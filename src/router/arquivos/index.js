const routes = [
  {
    path: '/arquivos',
    name: 'arquivos',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/Arquivos-Tmp.vue')
  }
]
export default routes
