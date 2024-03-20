import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    }
  ]
})

export default router
