import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/basket'
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    },
    {
      path: '/order-confirmation',
      name: 'order-confirmation',
      component: () => import('../views/OrderConfirmationView.vue')
    }
  ]
})

export default router
