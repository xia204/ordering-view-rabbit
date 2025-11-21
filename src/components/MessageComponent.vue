<template>
  <div class="ticket-container pa-6">

    <!-- ENCABEZADO -->
    <div class="text-center mb-4">
      <h3 class="text-h6 font-weight-bold text-on-surface">Recibo de Compra</h3>
      <div class="text-caption text-medium-emphasis">
        {{ formatEventDate(order.EventDate) }}
      </div>
    </div>

    <v-divider class="my-3"></v-divider>

    <!-- Cliente -->
    <div class="mb-3">
      <div class="text-subtitle-2 font-weight-medium text-on-surface">Cliente</div>
      <div>{{ order.FirstName }} {{ order.LastName }}</div>
      <div class="text-caption text-on-surface">{{ order.EmailAddress }}</div>
    </div>

    <v-divider class="my-3"></v-divider>

    <!-- Dirección -->
    <div class="mb-3">
      <div class="text-subtitle-2 font-weight-medium text-on-surface">Dirección</div>
      <div>{{ order.AddressLine }}</div>
      <div>{{ order.State }}, {{ order.Country }}</div>
      <div>{{ order.ZipCode }}</div>
    </div>

    <v-divider class="my-3"></v-divider>

    <!-- Pago -->
    <div class="mb-3">
      <div class="text-subtitle-2 font-weight-medium text-on-surface">Pago</div>
      <div>Tarjeta: **** **** **** {{ order.CardNumber.slice(-4) }}</div>
      <div>Método: {{ getPaymentMethod(order.PaymentMethod) }}</div>
    </div>

    <v-divider class="my-3"></v-divider>

    <!-- TOTAL -->
    <div class="d-flex justify-space-between">
      <strong>Total:</strong>
      <strong class="text-primary">${{ order.TotalPrice }}</strong>
    </div>

    <v-divider class="my-3"></v-divider>

    <div class="text-caption text-medium-emphasis mt-2">
      Evento: {{ order.EventType }}
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  order: { type: Object, required: true }
})

const formatEventDate = (date) => {
  const d = new Date(date)
  return d.toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPaymentMethod = (code) => {
  const methods = {
    1: 'Tarjeta de crédito',
    2: 'Tarjeta de débito',
    3: 'PayPal',
    4: 'Transferencia'
  }
  return methods[code] || 'Método desconocido'
}
</script>

<style scoped>
.ticket-container {
  border: 2px dashed var(--v-theme-outline);
  border-radius: 12px;
  background-color: var(--v-theme-surface);
}
</style>
