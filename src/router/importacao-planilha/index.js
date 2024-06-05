const routes = [
  {
    path: '/importacaodadosplanilha',
    name: 'Importar Dados',
    meta: { requiresAuth: true },
    component: () => import('@/views/importacao-planilha/ImportacaoPlanilhaView.vue')
  }
]

export default routes
