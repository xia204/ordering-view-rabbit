<template>
  <v-container class="py-10">

    <!-- Bienvenida -->
    <h1 class="text-h4 font-weight-bold mb-6">
      ¡Bienvenido, {{ username }}!
    </h1>

    <!-- Carrusel -->
    <v-carousel
      cycle
      hide-delimiter-background
      height="380"
      class="rounded-xl elevation-4 mb-10"
    >
      <v-carousel-item
        v-for="(item, index) in carouselItems"
        :key="index"
      >
        <v-img :src="item.image" height="100%" cover>
          <div
            class="d-flex flex-column justify-end pa-6"
            style="background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05)); height: 100%;"
          >
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
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card height="100%" class="d-flex flex-column rounded-xl elevation-3">

          <!-- Imagen -->
          <v-img
            :src="product.imageUrl || fallbackImg"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
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
              ${{ product.price.toFixed(2) }}
            </div>
          </v-card-text>

          <!-- Botón -->
          <v-card-actions class="mt-auto px-4 py-4">
            <v-spacer></v-spacer>

            <v-btn
              color="secondary"
              variant="elevated"
              rounded="lg"
              @click="addToCart(product)"
            >
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

// Productos
const products = ref([
  {
    id: 1,
    name: 'Teclado Mecánico',
    description: 'Interruptores azules y retroiluminación RGB.',
    price: 89.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2022/08/14/16/39/keyboard-7386244_1280.jpg'
  },
  {
    id: 2,
    name: 'Mouse Gamer',
    description: '16000 DPI con iluminación personalizable.',
    price: 59.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2014/03/20/00/00/computer-mouse-290950_1280.jpg'
  },
  {
    id: 3,
    name: 'Monitor 27” 144Hz',
    description: 'Pantalla IPS con colores vibrantes.',
    price: 299.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_1280.jpg'
  },
  {
    id: 4,
    name: 'Silla Ergonómica',
    description: 'Comodidad premium para largas sesiones.',
    price: 199.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2021/09/26/11/44/chair-6657314_1280.jpg'
  }
])

// Acción del carrito
const addToCart = (product) => {
  console.log('Producto agregado:', product)
}
</script>
