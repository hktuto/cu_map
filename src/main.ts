import { createApp, h, provide } from "vue";

import { DefaultApolloClient } from '@vue/apollo-composable'
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import routes from "virtual:generated-pages";
import apolloClient from "./vue-apollo";


const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp({
  setup(){
    provide(DefaultApolloClient,apolloClient)
  },
  render: () => h(App),
});
app.use(router).use(pinia).mount("#app");
