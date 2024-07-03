const routes = [
  {
    path: '/usuarios',
    name: 'Usuários',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo',
    name: 'Cadastrar Usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuarios/editar/:id',
    name: 'Editar Usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuario/alterarsenha',
    name: 'Alterar Senha',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/AlterarSenha.vue')
  },
  {
    path: '/usuario/novousuario',
    name: 'Novo Usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/NovoUsuario.vue')
  }
]

export default routes
