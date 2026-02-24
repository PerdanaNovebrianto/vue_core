import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import i18n from './plugins/i18n'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import { createPreset } from '@/plugins/primevue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import ErrorLayout from '@/components/layouts/ErrorLayout.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'

const app = createApp(App)

// Plugins
app.use(routes)
app.use(i18n)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: createPreset('zinc'),
    options: {
      darkModeSelector: '.prime-vue-dark',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
      }
    }
  }
})
app.directive('ripple', Ripple)

// Layouts
app.component('auth-layout', AuthLayout)
app.component('admin-layout', AdminLayout)
app.component('error-layout', ErrorLayout)


app.mount('#app')
