const routes = [
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo',
    name: 'novo-usuario',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/DadosUsuario.vue')
  },
  {
    path: '/usuarios/editar/:id',
    name: 'usuario-editar',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/DadosUsuario.vue')
  },
  {
    path: '/usuario/alterarsenha',
    name: 'alterar-senha',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/AlterarSenha.vue')
  }
]

export default routes
