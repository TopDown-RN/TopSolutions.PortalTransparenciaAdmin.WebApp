const routes = [
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo-usuario',
    name: 'novo-usuario',
    component: () => import('@/views/usuarios/NovoUsuario.vue')
  }
]

export default routes
