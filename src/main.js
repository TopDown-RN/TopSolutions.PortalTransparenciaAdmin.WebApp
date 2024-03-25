import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Lara from '@/presents/Lara'
import Checkbox  from "primevue/checkbox"

const app = createApp(App)
app.component('Checkbox', Checkbox)

app.use(PrimeVue, { unstyled: true, pt: Lara }).use(router)

app.mount('#app')
