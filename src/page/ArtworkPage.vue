<script setup>
// This page component is for showing a single artwork
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { apiAddr, imgAddr } from "../config";
import ContactIcon from "../components/ContactIcon.vue";
import ArtworkWindow from "../components/ArtworkWindow.vue";
import LicenseType from "../components/LicenseType.vue"
import axios from "axios";
import { useI18n } from "vue-i18n";

const workData = ref({});
const { t } = useI18n({});
const zoomHidden = ref(false);

const props = defineProps({
  id: String,
});

function toggleHidden() {
  zoomHidden.value = !zoomHidden.value;
}

onMounted(async () => {
  workData.value = await axios
    .get(`${apiAddr}/baimianxiao/data/workData/${props.id}`)
    .then((res) => res.data[0]);
});
</script>

<template>
  <div class="2xl:w-[80rem] 2xl:mx-auto sm:mx-[8%] mx-0 my-4 flex">
    <div class="w-full">
      <ArtworkWindow
        :source="workData.source.this"
        :toggleParentHidden="toggleHidden"
        v-if="workData.source"
      />
      <section class="mt-6 h-[15rem] shadow-md" v-show="!zoomHidden">
        <p class="lg:text-2xl text-left ml-6 my-6">{{ workData?.title }}</p>
        <div class="flex flex-row justify-evenly" v-if="workData?.authorInfo?.image">
          <div>
            <img
              :src="imgAddr + '/authorProfile/' + workData?.authorInfo?.image"
              class="h-[60px] w-[60px] rounded-full"
            />
            <p class="lg:text-lg">{{ workData?.authorInfo?.name }}</p>
          </div>
          <ul class="flex items-center flex-wrap">
            <li v-for="item in workData?.source?.other" :key="item[0]">
              <ContactIcon :type="item[0]" :href="item[1]"/>
            </li>
          </ul>
          <div>
            <a :href="workData?.source?.from" class="h-[2rem] w-fit my-3 mx-auto block text-lg">{{t("artworkPage.origin")}}</a>
            <LicenseType :type="workData?.license?.type" :id="workData?.uri"/>
          </div>
        </div>
      </section>
    </div>
    <section class="min-w-[13rem] ml-4 hidden lg:block" v-show="!zoomHidden">
      <section v-if="workData.authorInfo" class="shadow-lg my-4">
        <div class="flex justify-evenly items-center my-4">
          <img
            :src="imgAddr + '/authorProfile/' + workData?.authorInfo?.image"
            class="h-[50px] w-[50px] rounded-full"
          />
          <p class="inline">{{ workData?.authorInfo?.name }}</p>
        </div>
        <ul class="flex flex-wrap justify-evenly mx-auto my-4">
          <ContactIcon
            v-for="item in workData?.authorInfo?.contact"
            v-bind:key="item[0]"
            :type="item[0]"
            :href="item[1]"
          ></ContactIcon>
        </ul>
        <section>
          <p class="mx-auto">{{ t("artworkPage.recentWorks") }}</p>
          <ul class="flex justify-evenly flex-wrap mx-auto">
            <li v-for="item in workData?.authorInfo?.recentWorks" :key="item">
              <img
                v-if="item != workData.uri"
                class="w-[6rem] h-[6rem]"
                :src="imgAddr + '/thumbs/' + item + '.jpg'"
              />
            </li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<style></style>
