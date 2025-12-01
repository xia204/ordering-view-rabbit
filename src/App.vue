<template>
  <v-app id="inspire">

    <!-- Si está en login, no mostramos navbar -->
    <template v-if="!isLoginRoute">
      <v-app-bar flat>
        <v-container class="mx-auto d-flex align-center justify-center">
          <v-avatar v-if="isAuthenticated" class="me-4" color="grey-darken-1" size="32">
            {{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}
          </v-avatar>
          <v-avatar v-else class="me-4" color="grey-darken-1" size="32">U</v-avatar>

          <!-- botones del navbar -->
          <v-btn v-for="route in routes" :key="route.name" :to="route.path" variant="text">
            {{ route.name }}
          </v-btn>

          <v-spacer></v-spacer>

          <!-- Botón de Logout visible cuando el usuario está autenticado -->
          <v-btn v-if="isAuthenticated" variant="text" class="ms-4" @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Cerrar sesión
          </v-btn>
        </v-container>
      </v-app-bar>
    </template>

    <!-- CONTENIDO -->
    <v-main class="bg-grey-lighten-3 d-flex">
      <v-sheet class="flex-grow-1" height="100%" rounded="0">
        <router-view />
      </v-sheet>
    </v-main>


  </v-app>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, checkAuth, logout, user } = useAuth()

// Verificar autenticación al cargar la app
onMounted(() => {
  const isAuth = checkAuth()

  // Si no está autenticado y no está en login, redirigir al login
  if (!isAuth && route.path !== '/login') {
    router.push('/login')
  }
})

// RUTAS DEL NAVBAR
const routes = [
  { name: 'Inicio', path: '/home' },
  { name: 'Ordenar', path: '/orders' },
  { name: 'Pedidos', path: '/messages' },
  { name: 'Productos', path: '/list-products' },
]
// → Ocultar navbar en login
const isLoginRoute = computed(() => route.path === '/login')
</script>
