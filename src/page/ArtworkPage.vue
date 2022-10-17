<script setup>
// This page component is for showing a single artwork
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { apiAddr, imgAddr } from "../config";
import ContactIcon from "../components/ContactIcon.vue";
import axios from "axios";

const workData = ref({});

const props = defineProps({
  id: String,
});
onMounted(async () => {
  workData.value = await axios
    .get(`${apiAddr}/baimianxiao/data/workData/${props.id}`)
    .then((res) => res.data[0]);
});
</script>

<template>
  <div class="2xl:w-[80rem] 2xl:mx-auto sm:mx-[8%] mx-0 my-4 flex">
    <div class="w-full">
      <section class="bg-gray-400 w-full h-[500px]">
        <img :src="imgAddr + '/thumbs/' + id + '.jpg'" />
      </section>
      <section class="sm:w-full h-[200px] mt-4 shadow-lg border"></section>
    </div>
    <section class="min-w-[13rem] ml-4 hidden lg:block">
      <section v-if="workData.authorInfo" class="shadow-lg my-4">
        <div class="flex justify-evenly items-center my-4">
          <img
            :src="imgAddr + '/authorProfile/' + workData?.authorInfo?.image"
            class="h-[50px] w-[50px] rounded-full"
          />
          <p class="inline">{{ workData?.authorInfo?.name }}</p>
        </div>
        <div class="flex flex-wrap justify-evenly mx-auto my-4">
          <ContactIcon
            v-for="item in workData?.authorInfo?.contact"
            v-bind:key="item[0]"
            :type="item[0]"
            :href="item[1]"
          ></ContactIcon>
        </div>
      </section>
    </section>
  </div>
</template>

<style></style>
