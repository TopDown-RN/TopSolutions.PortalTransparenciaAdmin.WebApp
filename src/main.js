import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import Lara from '@/presents/Lara'
import VueTheMask from 'vue-the-mask'
import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import store from './store'
const app = createApp(App)

app
  .use(router)
  .use(PrimeVue, { unstyled: true, pt: Lara })
  .use(VueTheMask)
  .use(ConfirmationService)
  .use(ToastService)
  .use(store)
app.directive('tooltip', Tooltip)
app.mount('#app')
