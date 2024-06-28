const routes = [
  {
    path: '/usuarios',
    name: 'Usuários',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/usuarios/novo',
    name: 'Cadastrar usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuarios/editar/:id',
    name: 'Editar usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/CrudUsuario.vue')
  },
  {
    path: '/usuario/alterarsenha',
    name: 'Alterar senha',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/AlterarSenha.vue')
  },
  {
    path: '/usuario/novousuario',
    name: 'Novo usuário',
    meta: { requiresAuth: true },
    component: () => import('@/views/usuarios/NovoUsuario.vue')
  }
]

export default routes
