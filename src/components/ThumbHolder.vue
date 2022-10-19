<script setup>
import axios from "axios";
import { apiAddr, imgAddr } from "../config";
import { ref, watchEffect, computed, onMounted } from "vue";
import ViewCount from "./ViewCount.vue";
import { useI18n } from "vue-i18n";
import ContentUnavailable from "./card/ContentUnavailable.vue";

let { t } = useI18n({});
const thumbs = ref([]);
const page = ref([1, 1]);
const timeOrd = ref(1);
const numToDisp = ref(10);
const status = ref("");

//prettier-ignore
function limitNumToDisp() {numToDisp.value = 4;}
const displayed = computed(() => {
  // prettier-ignore
  return thumbs.value
    ? thumbs.value.slice( (page.value[0] - 1) * numToDisp.value, page.value[0] * numToDisp.value)
    : [];
});
const timeOrderList = ref([{ value: "none", label: "none" }]);
function timeSort(ord) {
  //prettier-ignore
  if (!thumbs.value) return; // Skip sorting when no data present.
  ord
    ? thumbs.value.sort((s, t) => {
        let a = s.date;
        let b = t.date;
        if (a >= b) return -1;
        else if (a < b) return 1;
        else return -1;
      })
    : thumbs.value.sort((s, t) => {
        let a = s.date;
        let b = t.date;
        if (a >= b) return 1;
        else if (a < b) return -1;
        else return 1;
      });
}

// Side effects
watchEffect(async () => {
  thumbs.value = await (
    await axios.get(`${apiAddr}/baimianxiao/data/thumbData/all`).catch((e) => {
      switch (e.message) {
        case "Network Error":
          status.value = "beTimeout";
          break;
        default:
          status.value = "brokenLib";
      }
    })
  )?.data;
  //prettier-ignore
  if (!thumbs.value) {page.value = [1, 0];return;} // Set maximum page to 0 when no data present.
  page.value = [1, Math.ceil(thumbs.value.length / numToDisp.value)];
});
watchEffect(() => {
  timeSort(timeOrd.value);
});
onMounted(() => {
  if (window.innerWidth < 640) {
    limitNumToDisp();
  }
  // prettier-ignore
  timeOrderList.value = [{value: 1,label: t("timeOrder.newToOld"),},{value: 0,label: t("timeOrder.oldToNew"),},]; //Generate translation on the fly.
});
</script>

<template>
  <div
    class="2xl:w-[80rem] sm:mx-[8%] sm:my-4 lg:mx-[10%] 2xl:mx-auto max-w-[600px] sm:max-w-none m-auto"
  >
    <div class="flex w-full flex-row justify-evenly">
      <el-select v-model="timeOrd">
        <el-option
          v-for="item in timeOrderList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <ul
      v-if="displayed.length"
      class="flex flex-wrap w-full sm:justify-around justify-center"
    >
      <li
        class="h-fit w-[200px] flex flex-col flex-shrink-0 border-spacing-4 shadow-md sm:m-4 rounded-md m-1"
        v-for="thumb in displayed"
        :key="thumb.uri"
      >
        <img
          class="h-[200px] w-[200px] rounded-t-md hover:opacity-80"
          :src="imgAddr + '/thumbs/' + thumb.uri + '.jpg'"
          @click="this.$router.push(`/artwork/${thumb.uri}`)"
        />
        <div class="mt-1 mb-1 ml-1.5 hidden sm:block">
          <p class="ml-1.5">{{ thumb.title }}</p>
          <img
            class="rounded-full h-8 w-8 inline float-left"
            :src="imgAddr + '/authorProfile/' + thumb.author.image"
          />
          <p class="text-md ml-2 inline float-left mt-1">
            {{ thumb.author.name }}
          </p>
          <ViewCount :count="5247" class="inline float-right"></ViewCount>
        </div>
      </li>
    </ul>
    <ContentUnavailable v-else-if="status" :type="status" />
    <div class="w-full h-fit" v-if="numToDisp >= 10">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="page[1]"
        v-model:current-page="page[0]"
        class="mx-auto w-fit"
      ></el-pagination>
    </div>
  </div>
</template>
