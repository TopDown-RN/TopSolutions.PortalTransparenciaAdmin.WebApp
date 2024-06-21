const routes = [
  {
    path: '/arquivosold',
    name: 'Arquivos Old',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/Arquivos-Tmp.vue')
  },
  {
    path: '/arquivos',
    name: 'Arquivos',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/ArquivosView.vue')
  }
]
export default routes
