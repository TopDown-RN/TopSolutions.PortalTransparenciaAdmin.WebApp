const routes = [
  {
    path: '/arquivos',
    name: 'Arquivos',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/Arquivos-Tmp.vue')
  },
  {
    path: '/arquivosview',
    name: 'Arquivos (Novo)',
    meta: { requiresAuth: true },
    component: () => import('@/views/arquivos/ArquivosView.vue')
  }
]
export default routes
