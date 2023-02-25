import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Notifications from '@kyvg/vue3-notification'

import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash, faPenToSquare, faSearch } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add([faTrash, faPenToSquare, faSearch])
const app = createApp(App)

app.use(Notifications)
app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
