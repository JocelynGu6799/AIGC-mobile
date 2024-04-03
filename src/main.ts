// import './assets/main.css'
import "@/assets/css/index.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ConfigProvider } from 'vant';
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ConfigProvider);
pinia.use(piniaPluginPersistedstate)
app.use(pinia).mount('#app')
