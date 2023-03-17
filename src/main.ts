import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRotate, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faRotate)
library.add(faTrash)

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).component('font-awesome-icon',FontAwesomeIcon).component('font-awesome-icon',FontAwesomeIcon).mount('#app')
