<template>
  <v-card class="pa-6 rounded-xl elevation-4">

    <h2 class="text-h6 font-weight-bold mb-4">Productos en la Orden</h2>

    <v-table>
      <thead>
        <tr>
          <th>Producto</th>
          <th class="text-center">Cantidad</th>
          <th class="text-right">Precio</th>
          <th class="text-right">Subtotal</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.name }}</td>

          <td class="text-center">
            <v-text-field
              type="number"
              density="compact"
              min="1"
              class="w-25 mx-auto"
              v-model.number="item.quantity"
              @change="updateQty(item.id, item.quantity)"
            />
          </td>

          <td class="text-right">${{ item.price.toFixed(2) }}</td>
          <td class="text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>

          <td>
            <v-btn icon color="red" @click="removeProduct(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>

        <tr v-if="cart.length === 0">
          <td colspan="5" class="text-center py-6 text-grey">
            No hay productos en el carrito.
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-4" />

    <div class="text-right text-h6 font-weight-bold">
      Total: ${{ total.toFixed(2) }}
    </div>

  </v-card>
</template>

<script setup>
import { useCart } from "@/composables/useCart";

const { cart, removeProduct, updateQty, total } = useCart();
</script>
