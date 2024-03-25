const routes = [
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo-usuario',
    name: 'novo-usuario',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/NovoUsuario.vue')
  }
]

export default routes
