<script>
import axios from "axios";
import { apiAddr, siteAddr, imgAddr } from "../config";
import { ref, watchEffect, computed } from "vue";
import ViewCount from "./ViewCount.vue";

const thumbs = ref([]);
const page = ref([1, 1]);
const timeOrd = ref(true);
const displayed = computed(() => {
  return thumbs.value
    ? thumbs.value.slice((page.value[0] - 1) * 10, page.value[0] * 10)
    : [];
});

function timeSort(ord) {
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
watchEffect(async () => {
  thumbs.value = await (
    await axios.get(`${apiAddr}/baimianxiao/data/thumbData/all`)
  ).data;
  page.value = [1, Math.ceil(thumbs.value.length / 10)];
});
watchEffect(() => {
  timeSort(timeOrd.value);
});

export default {
  name: "ThumbHolder",
  setup() {
    return {
      displayed,
      page,
      timeOrd,
      siteAddr,
      imgAddr,
    };
  },
  components: {
    ViewCount,
  },
  methods: {
    setTimeOrd(ord) {
      this.timeOrd = ord;
      console.log(`ord:${this.timeOrd}`);
    },
    setPage(page) {
      if (page <= 0) return;
      if (page >= this.page[1]) {
        this.page[0] = this.page[1];
        return;
      }
      this.page[0] = page;
    },
  },
};
</script>

<template>
  <div
    class="flex flex-wrap  sm:justify-around justify-center sm:ml-12 sm:mr-12 sm:mb-4 sm:mt-4 lg:ml-[8%] lg:mr-[8%] m-2"
  >
    <div
      class="h-fit w-[200px] flex flex-col flex-shrink-0 border-spacing-4 shadow-md sm:m-1.5 rounded-md m-1"
      v-for="thumb in displayed"
      :key="thumb.uri"
    >
      <!-- Please include the key prop to help update stale content -->
      <img
        class="h-[200px] w-[200px] rounded-t-md hover:opacity-80"
        :src="imgAddr + '/thumbs/' + thumb.uri + '.jpg'"
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
    </div>
  </div>
  <button @click="setTimeOrd(true)">从新到旧</button>
  <button @click="setTimeOrd(false)">从旧到新</button>
  <button @click="setPage(page[0] + 1)">下一页</button>
  <button @click="setPage(page[0] - 1)">上一页</button>
</template>
