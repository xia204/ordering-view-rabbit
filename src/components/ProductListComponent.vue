<template>
    <v-container class="py-10">
        <!-- Loading -->
        <v-row v-if="loading">
            <v-col cols="12" class="text-center py-10">
                <v-progress-circular indeterminate color="primary" size="48" />
            </v-col>
        </v-row>

        <!-- Error -->
        <v-row v-else-if="error">
            <v-col cols="12" class="text-center">
                <v-alert type="error" border="start" prominent>
                    {{ error }}
                </v-alert>
            </v-col>
        </v-row>

        <!-- Grid de Productos -->
        <v-row v-else>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
                <v-card height="100%" class="d-flex flex-column rounded-xl elevation-3">

                    <!-- Imagen -->
                    <v-img :src="product.imageUrl || fallbackImg" height="200" cover class="bg-grey-lighten-2">
                        <template #placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="primary" />
                            </v-row>
                        </template>
                    </v-img>

                    <!-- Título -->
                    <v-card-title class="text-truncate">
                        {{ product.name }}
                    </v-card-title>

                    <!-- Descripción + Precio -->
                    <v-card-text>
                        <div class="text-truncate mb-2">
                            {{ product.description }}
                        </div>

                        <div class="text-h6 text-success">
                            ${{ product.price?.toFixed(2) }}
                        </div>
                    </v-card-text>

                    <!-- Botón -->
                    <v-card-actions class="mt-auto px-4 py-4">
                        <v-spacer></v-spacer>

                        <v-btn color="secondary" variant="elevated" rounded="lg" @click="addToCart">
                            <v-icon start>mdi-cart</v-icon>
                            Agregar
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { axiosClient } from '@/api/axiosClient'
import API_ROUTES from '@/api/routes'

const products = ref([])
const loading = ref(true)
const error = ref(null)

// Producto de prueba para mostrar siempre algo
const defaultProduct = {
    id: 999,
    name: "Producto de muestra",
    description: "Este es un producto de prueba mientras se habilita el backend.",
    price: 199.99,
    imageUrl: "https://picsum.photos/400/300?random=1"
}

// Imagen de respaldo en caso de error
const fallbackImg =
    'https://via.placeholder.com/400x300/cccccc/000000?text=Sin+imagen'

// Ruta centralizada
const API_URL = API_ROUTES.PRODUCTS.LIST

onMounted(async () => {
    try {
        loading.value = true

        const resp = await axiosClient.get(API_URL)

        if (Array.isArray(resp.data) && resp.data.length > 0) {
            products.value = resp.data
        } else {
            console.warn("⚠️ API vacía. Cargando producto por defecto.")
            products.value = [defaultProduct]
        }
    } catch (err) {
        error.value = 'No se pudieron cargar los productos. Mostrando productos de prueba.'
        console.error('Error al obtener productos:', err)

        // fallback para errores
        products.value = [defaultProduct]
    } finally {
        loading.value = false
    }
})

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(["add"])

const addToCart = () => {
  emit("add", props.product)
}

</script>
