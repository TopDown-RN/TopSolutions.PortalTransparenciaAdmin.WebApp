import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Lara from '@/presents/Lara'
import pt_BR from './lang/pt-BR.json'
import VueTheMask from 'vue-the-mask'
import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

const pinia = createPinia()
const app = createApp(App)

app
  .use(router)
  .use(PrimeVue, { unstyled: true, pt: Lara, locale: pt_BR })
  .use(VueTheMask)
  .use(ConfirmationService)
  .use(ToastService)
  .use(pinia)

app.directive('tooltip', Tooltip)
app.mount('#app')
