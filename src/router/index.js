import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrdersView from '@/views/OrdersView.vue'
import MessageComponent from '@/components/MessageComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessageComponent,
      meta: { requiresAuth: true }
    },/*
    {
      path: '/list-orders',
      name: 'list-orders',
      component: OrdersView,
      meta: { requiresAuth: true }
    }*/
  ],
})

// Verificar si el token ha expirado
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('expiresAt')
  if (!expiresAt) return false
  return new Date() > new Date(expiresAt)
}

// Navegación Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  // Si el token existe pero ha expirado, eliminar y redirigir al login
  if (token && isTokenExpired()) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('user')
    next('/login')
    return
  }

  if (to.meta.requiresAuth && !token) {
    // Si la ruta requiere autenticación y no hay token, redirigir al login
    next('/login')
  } else if (to.path === '/login' && token) {
    // Si ya está autenticado y trata de ir al login, redirigir al home
    next('/home')
  } else {
    next()
  }
})

export default router
