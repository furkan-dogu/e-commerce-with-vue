import { useAuthStore } from '@/stores/AuthStore'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: "MainLayout"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: "LoginLayout"
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: "MainLayout"
      }
    },
    {
      path: '/category/:id',
      name: 'category',
      component: CategoryView,
      meta: {
        authRequired: true,
        layout: "MainLayout"
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        authRequired: true,
        layout: "MainLayout"
      }
    },
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if(to.meta.authRequired && !authStore.isAuth) {
    location.href = "/login"
  }
})

export default router
