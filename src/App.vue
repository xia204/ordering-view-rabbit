<template>
  <v-app id="inspire">

    <!-- Si está en login, no mostramos navbar -->
    <template v-if="!isLoginRoute">
      <v-app-bar flat>
        <v-container class="mx-auto d-flex align-center justify-center">
          <v-avatar class="me-4" color="grey-darken-1" size="32">U</v-avatar>

          <!-- botones del navbar -->
          <v-btn v-for="route in routes" :key="route.name" :to="route.path" variant="text">
            {{ route.name }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-responsive max-width="160">
            <v-text-field density="compact" label="Buscar" rounded="lg" variant="solo-filled" flat hide-details
              single-line></v-text-field>
          </v-responsive>
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
const { isAuthenticated, checkAuth } = useAuth()

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
]

// → Ocultar navbar en login
const isLoginRoute = computed(() => route.path === '/login')
</script>
