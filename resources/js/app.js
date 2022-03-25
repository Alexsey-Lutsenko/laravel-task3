require("./bootstrap");

import { createApp } from "vue";
import App from "./views/App";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import PrimeVue from "primevue/config";
import router from "./router";
import store from "./store";
import primeVue from "./components/PrimeVue";
import locale from "./options/PrimeVueOption/locale";

const app = createApp(App);

primeVue.forEach((component) => {
    app.component(component.name, component);
});

app.component("QuillEditor", QuillEditor);

app.use(PrimeVue, { locale }).use(router).use(store).mount("#app");
