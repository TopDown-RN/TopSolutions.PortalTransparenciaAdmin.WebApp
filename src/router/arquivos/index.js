const routes = [
  {
    path: '/arquivos',
    name: 'arquivos',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/Arquivos-Tmp.vue')
  },
  {
    path: '/arquivosview',
    name: 'arquivosview',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/ArquivosView.vue')
  }
]
export default routes
