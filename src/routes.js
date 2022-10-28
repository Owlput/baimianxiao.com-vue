import HomePage from "./page/HomePage.vue";
import PageNotFound from "./page/PageNotFound.vue";
import IllustrationPage from "./page/IllustrationPage.vue";
import IllustrationsPage from "./page/IllustrationsPage.vue"
import PermitPage from "./page/PermitPage.vue"
const routes = [
  {
    path: "/illust/:id",
    name:"illustration",
    component: IllustrationPage,
    props: (route)=>{
      return {
        id:route.params.id
      }
    }
  },
  {
    path:"/illustrations",
    component:IllustrationsPage
  },
  {
    path: "/permit/:id",
    name:"permit",
    component: PermitPage,
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
