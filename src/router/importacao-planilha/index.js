const routes = [
  {
    path: '/importacaodadosplanilha',
    name: 'Importar Dados',
    meta: { requiresAuth: true },
    component: () => import('@/views/importacao-planilha/ImportacaoPlanilhaView.vue')
  },

  {
    path: '/importacaodadosplanilha/tour',
    name: 'Importar Dados Tour',
    meta: { requiresAuth: true },
    component: () => import('@/views/importacao-planilha/ImportacaoPlanilhaTourView.vue')
  }
]

export default routes
