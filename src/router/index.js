import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/UsersList.vue')
    },
    {
      path: '/users/new-user',
      name: 'new-user',
      component: () => import('@/views/users/NewUser.vue')
    }
  ]
})

export default router
