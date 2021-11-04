import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import routes from "virtual:generated-pages";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).use(pinia).mount("#app");
