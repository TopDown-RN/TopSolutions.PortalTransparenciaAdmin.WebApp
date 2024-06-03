const routes = [
  {
    path: '/importacaodadosplanilha',
    name: 'importacao de dados planilha',
    meta: { requiresAuth: true },
    component: () => import('@/views/importacao-planilha/ImportacaoPlanilhaView.vue')
  }
]

export default routes
