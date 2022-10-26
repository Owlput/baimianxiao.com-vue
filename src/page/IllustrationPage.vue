<script setup>
// This page component is for showing a single artwork
import { ref, watch } from "vue";
import { apiAddr, imgAddr } from "../config";
import ContactIcon from "../components/ContactIcon.vue";
import ArtworkWindow from "../components/ArtworkWindow.vue";
import LicenseType from "../components/LicenseType.vue";
import { useI18n } from "vue-i18n";
import AuthorVert from "../components/card/AuthorVert.vue";
import { computed } from "@vue/reactivity";
import { handleStatus } from "../helpers";
import { useRoute } from "vue-router";
import useWatchParams from "../hooks/useWatchParams";

const route = useRoute();
const { t } = useI18n({});
const zoomHidden = ref(false);

let { data, axiosError } = useWatchParams(
  route,
  apiAddr + "/baimianxiao/data/workData/"
);
const status = computed(() => {
  handleStatus({ axios: axiosError });
});
const recentWorksFiltered = computed(()=>{
   return data.value.authorInfo.recentWorks.filter((v)=>{return v != route.params.id})
})

//prettier-ignore
function toggleHidden() { zoomHidden.value = !zoomHidden.value; }
</script>

<template>
  <div class="2xl:w-[80rem] 2xl:mx-auto sm:mx-[8%] mx-0 my-4 flex" v-if="data">
    <div class="w-full">
      <ArtworkWindow
        :source="data.source.this"
        :toggleParentHidden="toggleHidden"
        :root="imgAddr + '/artwork/'"
        v-if="data.source"
      />
      <section class="mt-6 h-[15rem] shadow-md" v-show="!zoomHidden">
        <p class="lg:text-2xl text-left ml-6 my-6">{{ data.title }}</p>
        <div
          class="flex flex-row justify-evenly"
          v-if="data?.authorInfo?.image"
        >
          <div>
            <img
              :src="imgAddr + '/authorProfile/' + data.authorInfo.image"
              class="h-[60px] w-[60px] rounded-full"
            />
            <p class="lg:text-lg">{{ data.authorInfo.name }}</p>
          </div>
          <ul class="flex items-center flex-wrap">
            <li v-for="item in data.source.other" :key="item[0]">
              <ContactIcon :type="item[0]" :href="item[1]" />
            </li>
          </ul>
          <div>
            <a
              :href="data?.source?.from"
              class="h-[2rem] w-fit my-3 mx-auto block text-lg"
              >{{ t("artworkPage.origin") }}</a
            >
            <LicenseType :type="data.license.type" :id="data?.uri" />
          </div>
        </div>
      </section>
    </div>
    <section class="min-w-[13rem] ml-4 hidden lg:block" v-show="!zoomHidden">
      <AuthorVert
        v-if="data.authorInfo"
        :data="data.authorInfo"
        :imgRoot="imgAddr + '/authorProfile'"
      >
        <section>
          <p class="mx-auto">{{ t("artworkPage.recentWorks") }}</p>
          <ul class="flex justify-evenly flex-wrap mx-auto">
            <li v-for="item in recentWorksFiltered" :key="item">
              <img
                v-if="item != data.uri"
                class="w-[6rem] h-[6rem] hover:cursor-pointer hover:opacity-80 rounded-md"
                :src="imgAddr + '/thumbs/' + item + '.jpg'"
                @click="this.$router.push('/artwork/' + item)"
              />
            </li>
          </ul>
        </section>
      </AuthorVert>
    </section>
  </div>
</template>

<style></style>
