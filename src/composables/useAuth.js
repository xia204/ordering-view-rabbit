import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const router = useRouter()
  const isAuthenticated = ref(false)
  const user = ref(null)

  // Verificar si hay token válido
  const checkAuth = () => {
    const token = localStorage.getItem('accessToken')
    const expiresAt = localStorage.getItem('expiresAt')

    if (!token) {
      isAuthenticated.value = false
      user.value = null
      return false
    }

    // Verificar si el token ha expirado
    if (expiresAt && new Date() > new Date(expiresAt)) {
      logout()
      return false
    }

    isAuthenticated.value = true
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    }
    return true
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('user')
    isAuthenticated.value = false
    user.value = null
    router.push('/login')
  }

  // Verificar al iniciar
  checkAuth()

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    checkAuth,
    logout
  }
}
