import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import routes from "virtual:generated-pages";

const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router).use(pinia).mount("#app");
