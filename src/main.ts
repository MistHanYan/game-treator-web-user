import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import { Icon } from 'vant'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Icon)
app.mount('#app')
