import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Lara from '@/presents/Lara'
import VueTheMask from 'vue-the-mask'

const app = createApp(App)

app.use(router).use(PrimeVue, { unstyled: true, pt: Lara }).use(VueTheMask)

app.mount('#app')
