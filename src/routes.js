import ThumbPage from "./page/ThumbPage.vue";
import AuthorData from "./page/datagen/AuthorData.vue";
import ThumbData from "./page/datagen/ThumbData.vue";
import ArtworkData from "./page/datagen/ArtworkData.vue";
import PermitData from "./page/datagen/PermitData.vue";
import PageNotFound from "./page/PageNotFound.vue";
import ArtworkPage from "./page/ArtworkPage.vue";
const routes = [
  { path: "/datagen/author", component: AuthorData },
  { path: "/datagen/thumb", component: ThumbData },
  { path: "/datagen/artwork:id", component: ArtworkData },
  { path: "/datagen/permit", component: PermitData },
  {
    path: "/artwork/:id",
    component: ArtworkPage,
    props: (route)=>{
      return {
        id:route.params.id
      }
    }
  },
  { path: "/", component: ThumbPage },
  { path: "/:catchAll(.*)*", component: PageNotFound },
];

export default routes;
