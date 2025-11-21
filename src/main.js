import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

// Components
import App from './App.vue'
import index from './router/index.js'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2C7DAF',
          secondary: '#96C2DB',
          accent: '#FF6B6B',
          error: '#D32F2F',
          info: '#0288D1',
          success: '#388E3C',
          warning: '#FFA000',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#96C2DB',  // Azul claro para alto contraste en oscuro
          secondary: '#E5EDF1',  // Gris suave
          accent: '#F06292',  // Dorado suave
          error: '#EF9A9A',
          info: '#4FC3F7',
          success: '#81C784',
          warning: '#FFB74D',
        }
      }
    }
  },
  defaults: {
    VBtn: {
      variant: 'elevated',
    }
  }
})

const app = createApp(App)
app.use(index)
app.use(vuetify)
app.mount('#app')
