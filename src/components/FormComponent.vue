<template>
    <v-container class="py-12 d-flex" fluid>
        <v-row justify="center">
            <v-col cols="12" md="10" lg="10">

                <v-card class="elevation-4 rounded-xl pa-8">
                    <v-row max="12">

                        <!-- FORMULARIO -->
                        <v-col cols="12" md="6">
                            <h2 class="text-h5 font-weight-bold mb-6">
                                Crear Orden de Compra
                            </h2>

                            <v-form v-model="isValid" ref="form">
                                <v-row dense>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.userName" label="Usuario" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.firstName" label="Nombre" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.lastName" label="Apellido" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.emailAddress" label="Correo electrónico"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="6"></v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.addressLine" label="Dirección"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.country" label="País" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.state" label="Estado" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.zipCode" label="Código Postal"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>
                                    <v-col cols="12" md="3"></v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.cardName" label="Titular de la Tarjeta"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.cardNumber" label="Número de Tarjeta"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="order.expiration" label="MM/AA" variant="solo-filled"
                                            density="comfortable" required />
                                    </v-col>

                                    <v-col cols="6" md="3">
                                        <v-text-field v-model="order.cvv" type="password" label="CVV"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-select v-model="order.paymentMethod" :items="paymentMethods"
                                            label="Método de pago" variant="solo-filled" density="comfortable"
                                            required />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="order.totalPrice" type="number" label="0.00"
                                            variant="solo-filled" density="comfortable" required />
                                    </v-col>
                                </v-row>

                                <v-row class="mt-6">
                                    <v-col cols="12">
                                        <v-btn color="secondary" block class="py-5" size="large" @click="submitOrder">
                                            Enviar Orden
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>

                        <!-- COLUMNA ANIMADA DE TARJETA -->
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <div class="card-animation-container">
                                <div class="credit-card">
                                    <div class="chip"></div>
                                    <div class="card-number">**** **** **** 4581</div>
                                    <div class="card-holder">NAME CLIENT</div>
                                    <div class="card-exp">MM/AA</div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const isValid = ref(false);
const form = ref(null);

const order = ref({
    userName: "",
    totalPrice: null,
    firstName: "",
    lastName: "",
    emailAddress: "",
    addressLine: "",
    country: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    paymentMethod: 1,
});

const paymentMethods = [
    { title: "Tarjeta de credito", value: 1 },
    { title: "Tarjeta de debito", value: 2 },
    { title: "PayPal", value: 3 },
];

const submitOrder = async () => {
    if (!form.value.validate()) return;

    try {
        await axios.post("https://10.96.124.11:7224/api/v1/Order", order.value);
        alert("Orden creada correctamente");
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error");
    }
};
</script>
<style scoped>
.card-animation-container {
  perspective: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.credit-card {
  width: 260px;
  height: 160px;
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  border-radius: 15px;
  color: white;
  padding: 20px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
  transform-style: preserve-3d;
  animation: float 4s ease-in-out infinite, tilt 6s ease-in-out infinite;
}

/* Animación de flotación */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* Animación de inclinación 3D */
@keyframes tilt {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(8deg); }
}

/* Detalles de la tarjeta */
.chip {
  width: 40px;
  height: 30px;
  background: gold;
  border-radius: 6px;
  margin-bottom: 20px;
}

.card-number {
  font-size: 1rem;
  letter-spacing: 3px;
  margin-bottom: 15px;
}

.card-holder {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-bottom: 4px;
}

.card-exp {
  font-size: 0.8rem;
  opacity: 0.9;
}
</style>
