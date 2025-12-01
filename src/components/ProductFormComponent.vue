<template>
  <v-container class="py-10" max-width="600">
    <v-card class="pa-6 rounded-xl elevation-3">
      <v-card-title class="text-h5 font-weight-bold">
        Agregar Producto
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="isValid">

          <!-- Nombre -->
          <v-text-field
            label="Nombre del producto"
            v-model="product.name"
            :rules="[rules.required]"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            class="mb-4"
          />

          <!-- Descripción -->
          <v-textarea
            label="Descripción"
            v-model="product.description"
            :rules="[rules.required]"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            rows="3"
            class="mb-4"
          />

          <!-- Precio -->
          <v-text-field
            label="Precio"
            v-model="product.price"
            :rules="[rules.required, rules.numeric]"
            type="number"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            class="mb-4"
          />

          <!-- Cantidad -->
          <v-text-field
            label="Cantidad"
            v-model="product.quantity"
            :rules="[rules.required, rules.integer]"
            type="number"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            class="mb-4"
          />

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="primary"
          variant="elevated"
          rounded="lg"
          :disabled="!isValid"
          @click="saveProduct"
        >
          <v-icon start>mdi-content-save</v-icon>
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_BASES } from '@/api/routes'

const formRef = ref(null)
const isValid = ref(false)

const product = ref({
  name: '',
  description: '',
  price: null,
  quantity: null
})

// ⚠️ Cambia cuando tengas la ruta lista
const API_URL = API_BASES.PRODUCTS.CREATE

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  numeric: v => (!isNaN(v) && v > 0) || 'Debe ser un número válido',
  integer: v => Number.isInteger(Number(v)) || 'Debe ser un número entero'
}

const saveProduct = async () => {
  const isFormValid = await formRef.value.validate()

  if (!isFormValid) return

  try {
    console.log('Enviando producto:', product.value)

    if (API_URL) {
      await axios.post(API_URL, product.value)
    }

    alert('Producto guardado (simulado)')
    formRef.value.reset()
  } catch (err) {
    console.error('Error al guardar producto:', err)
  }
}
</script>
