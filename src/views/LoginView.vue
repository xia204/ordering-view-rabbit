<template>
    <v-container class="fill-height pa-0" fluid>
        <v-row no-gutters class="fill-height">

            <!-- Columna izquierda con imagen a pantalla completa -->
            <v-col cols="12" md="6" class="d-none d-md-flex">
                <div :style="`
                    background-image: url('${loginImg}');
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 100%;
                `"></div>
            </v-col>

            <!-- Columna derecha con card minimalista -->
            <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
                <v-card elevation="8" class="px-8 py-10 flex-grow-1" max-width="600" rounded="xl">
                    <div class="text-h5 font-weight-bold mb-6 text-center">
                        Bienvenido
                    </div>


                    <v-form @submit.prevent="handleLogin" ref="form">
                        <v-text-field v-model="credentials.username" label="Usuario" variant="solo-filled"
                            prepend-inner-icon="mdi-account" density="comfortable"
                            :rules="[v => !!v || 'Usuario es requerido']" />


                        <v-text-field v-model="credentials.password" label="Contraseña" variant="solo-filled"
                            prepend-inner-icon="mdi-lock" density="comfortable"
                            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append-inner="showPassword = !showPassword"
                            :rules="[v => !!v || 'Contraseña es requerida']" />


                        <v-alert v-if="error" type="error" class="mb-4" density="comfortable" rounded="lg">
                            {{ error }}
                        </v-alert>


                        <v-btn color="primary" size="large" class="mt-4" type="submit" block :loading="loading"
                            rounded="lg">
                            Iniciar Sesión
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axiosClient } from '@/api/axiosClient'
import API_ROUTES from '@/api/routes'
import loginImg from '../img/login.jpg'

const router = useRouter()
const form = ref(null)
const loading = ref(false)
const error = ref(null)
const showPassword = ref(false)

const credentials = ref({
    username: '',
    password: ''
})

const handleLogin = async () => {
    const { valid } = await form.value.validate()
    if (!valid) return

    loading.value = true
    error.value = null

    try {
        const response = await axiosClient.post(API_ROUTES.AUTH.LOGIN, credentials.value)
        const { accessToken, refreshToken, expiresAt, user } = response.data

        if (!accessToken) throw new Error('Respuesta inválida del servidor: falta accessToken')

        localStorage.setItem('accessToken', accessToken)
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
        if (expiresAt) localStorage.setItem('expiresAt', expiresAt)
        if (user) localStorage.setItem('user', JSON.stringify(user))

        router.push('/home')
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al iniciar sesión'
    } finally {
        loading.value = false
    }
}
</script>
