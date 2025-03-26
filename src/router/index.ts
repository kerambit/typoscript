import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      props: true,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
  ],
})

export default router
