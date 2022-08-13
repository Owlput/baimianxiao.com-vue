import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";
import ThumbPage from "./page/ThumbPage.vue";
import AuthorData from "./page/datagen/AuthorData.vue";
import ThumbData from './page/datagen/ThumbData.vue'
import ArtworkData from './page/datagen/ArtworkData.vue'
import PermitData from './page/datagen/PermitData.vue'
const routes = [
  { path: "/datagen/author", component: AuthorData },
  { path: "/datagen/thumb", component: ThumbData },
  { path: "/datagen/artwork", component: ArtworkData },
  { path: "/datagen/permit", component: PermitData },
  { path: "/", component: ThumbPage },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
