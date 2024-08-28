import { useAuthStore } from '@/stores/AuthStore'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authRequired: true,
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
        authRequired: true,
        layout: "MainLayout"
      }
    }
  ]
})

//% Private Router gibi
// router.beforeEach((to, from, next) => {
//   if (to.name == "about" && to.query.user == "furkan") {
//     next()
//   }
// })

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if(to.meta.authRequired && !authStore.isAuth) {
    location.href = "/login"
  }
})

export default router
