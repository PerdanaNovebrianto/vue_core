import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import PrimeVue from 'primevue/config'
import { zinc } from '@/plugins/primevue'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'

const app = createApp(App)

app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: zinc,
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
 });

app.mount('#app')
