<script setup>
import { ref } from "vue";
import { apiAddr, imgAddr } from "../config";
import AuthorVert from "../components/card/AuthorVert.vue";
import { useRoute } from "vue-router";
import useWatchParams from "../hooks/useWatchParams";
import ArtworkWindow from "../components/ArtworkWindow.vue";
const expandHidden = ref(false);

const route = useRoute();
const { data, axiosError } = useWatchParams(
  route,
  apiAddr + "/baimianxiao/data/permitData/"
);
function toggleHidden() {
  expandHidden.value = !expandHidden.value;
}
</script>
<template>
  <div class="mx-[10%] my-[3rem] flex flex-row" v-if="data?.uri">
    <section class="h-full w-[200px] shrink-0 mr-4">
      <img
        :src="imgAddr + '/thumbs/' + data.uri + '.jpg'"
        class="h-[200px] w-[200px] rounded-md"
      />
      <AuthorVert :data="data.author" :imgRoot="imgAddr + '/authorProfile'" />
    </section>
    <section class="w-full">
      <p class="m-8">{{ data.desp }}</p>
      <ArtworkWindow
        :source="data.prof"
        :toggleParentHidden="toggleHidden"
        :root="imgAddr + '/permit/perm_'"
      />
    </section>
  </div>
</template>
