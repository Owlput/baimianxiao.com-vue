import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";
import routes from "./routes";
import i18n from "./i18n";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).use(i18n).mount("#app");
