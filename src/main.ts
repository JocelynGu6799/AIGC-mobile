// import './assets/main.css'
import "@/assets/css/index.css";
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ConfigProvider } from 'vant';
// Vue.config
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(ConfigProvider);
app.mount('#app')
