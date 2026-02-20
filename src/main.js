import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import i18n from './plugins/i18n'
import PrimeVue from 'primevue/config'
import { createPreset } from '@/plugins/primevue'
// import AuthLayout from '@/layouts/AuthLayout.vue'
// import AdminLayout from '@/layouts/AdminLayout.vue'
// import ErrorLayout from '@/layouts/ErrorLayout.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'

const app = createApp(App)

// Plugins
app.use(routes)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: createPreset('zinc'),
    ripple: true,
    options: {
      prefix: 'prime-vue',
      darkModeSelector: '.prime-vue-dark',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
      }
    }
  }
})

// Layouts
// app.component('auth-layout', AuthLayout)
// app.component('admin-layout', AdminLayout)
// app.component('error-layout', ErrorLayout)


app.mount('#app')
