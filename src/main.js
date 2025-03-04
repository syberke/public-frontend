import './assets/main.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'flowbite';
import { createPinia } from 'pinia';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp, markRaw } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App)

const pinia = createPinia()
app.use(ElementPlus);

app.use(router)
app.use(pinia)
app.use(VueSweetalert2);
pinia.use(({store}) => {
    store.router = markRaw(router)
})


app.mount('#app')
AOS.init();
