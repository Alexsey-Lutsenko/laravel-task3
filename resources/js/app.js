require("./bootstrap");

import { createApp } from "vue";
import App from "./views/App";
import PrimeVue from "primevue/config";
import router from "./router";
import store from "./store";
import primeVue from "./components/PrimeVue";
import component from "./components/ui";
import locale from "./options/PrimeVueOption/locale";

const app = createApp(App);

primeVue.forEach((component) => {
    app.component(component.name, component);
});

component.forEach((component) => {
    app.component(component.name, component);
});

app.use(PrimeVue, { locale }).use(router).use(store).mount("#app");
