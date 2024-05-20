const routes = [
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo',
    name: 'usuario-novo',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuarios/editar/:id',
    name: 'usuario-editar',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuario/alterarsenha',
    name: 'alterar-senha',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/AlterarSenha.vue')
  },
  {
    path: '/usuario/novousuario',
    name: 'novo-usuario',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/NovoUsuario.vue')
  }
]

export default routes
