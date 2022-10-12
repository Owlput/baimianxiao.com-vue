import HomePage from "./page/HomePage.vue";
import PageNotFound from "./page/PageNotFound.vue";
import ArtworkPage from "./page/ArtworkPage.vue";
const routes = [
  {
    path: "/artwork/:id",
    component: ArtworkPage,
    props: (route)=>{
      return {
        id:route.params.id
      }
    }
  },
  { path: "/", component: HomePage  },
  { path: "/:catchAll(.*)*", component: PageNotFound },
];

export default routes;
