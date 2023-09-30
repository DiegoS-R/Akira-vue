import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/store',
      name: 'store main page',
      component: () => import('../views/store.view.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../product/components/product.component.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../account/components/login.component.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../account/components/register.component.vue')
    },
    {
      path: '/edit/directions',
      name: 'edit directions',
      component: () => import('../account/components/account-direction-editor.component.vue')
    },
    {
      path: '/edit/personal',
      name: 'edit personal data',
      component: () => import('../account/components/account-information-editor.component.vue')
    },
    {
      path: '/edit/payment',
      name: 'edit payment data',
      component: () => import('../payment/components/account-payment-editor.component.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../account/components/account.component.vue')
    },
    {
      path: '/user',
      redirect: '/account',
    },
    {
      path: '/facebook',
    },
    {
      path: '/instagram',
    },
    {
      path: '/tiktok',
    },
    {
      path: '/404',
      name: 'Page not Found',
      component: () => import('../public/components/404.component.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

export default router
