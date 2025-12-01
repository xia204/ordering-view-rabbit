<template>
  <v-container class="py-10">

    <!-- Bienvenida -->
    <h1 class="text-h4 font-weight-bold mb-6">
      ¡Bienvenido, {{ username }}!
    </h1>

    <!-- Carrusel -->
    <v-carousel cycle hide-delimiter-background height="380" class="rounded-xl elevation-4 mb-10">
      <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <v-img :src="item.image" height="100%" cover>
          <div class="d-flex flex-column justify-end pa-6"
            style="background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05)); height: 100%;">
            <h2 class="text-h5 text-white font-weight-bold">
              {{ item.title }}
            </h2>
            <p class="text-white">
              {{ item.description }}
            </p>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <!-- Grid de Productos -->
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <product-list-component :product="product" @add="addToCart" />
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup>
import ProductListComponent from '@/components/ProductListComponent.vue'
import { ref, onMounted } from 'vue'
import { useCart } from '@/composables/useCart';

const { addProduct } = useCart();

const addToCart = (product) => {
  addProduct(product);
};

// Usuario
const username = ref('Usuario')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.username) username.value = user.username
})

// Imagen fallback
const fallbackImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-c9FqbMJa_MeWGXe2GQaRH2ND8W0bk5nZw&s'

// Items del carrusel
const carouselItems = ref([
  {
    title: 'Laptop Gamer',
    description: 'Potencia y rendimiento para jugar al máximo.',
    image: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg'
  },
  {
    title: 'Audífonos Inalámbricos',
    description: 'Sonido envolvente de alta calidad.',
    image: 'https://cdn.pixabay.com/photo/2017/08/14/16/15/earphone-2640990_1280.jpg'
  },
  {
    title: 'Smartwatch Pro',
    description: 'Tecnología avanzada para tu día a día.',
    image: 'https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_1280.jpg'
  }
])

// Aquí van tus productos reales (si quieres, luego los conecto)
const products = ref([
  {
    id: 1,
    name: "Producto demo",
    description: "Para probar grid",
    price: 200,
    imageUrl: null
  }
])
</script>
