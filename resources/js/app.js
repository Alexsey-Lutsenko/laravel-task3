
require('./bootstrap');

import {createApp} from "vue";
import App from "./views/App"
import PrimeVue from 'primevue/config';
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(PrimeVue).use(router).use(store).mount("#app")
