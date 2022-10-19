<script setup>
import { ref, watchEffect } from "vue";
import { imgAddr } from "../config.js";
const expand = ref("");

function toggleZoom(target = "") {
  expand.value = target;
}

const props = defineProps({
  source: Array,
  toggleParentHidden: Function,
});
</script>
<template>
  <section class="sm:max-h-[40rem] w-full min-w-[15rem] shadow-md relative z-1">
    <button
      v-if="source.length > 1"
      class="bg-gray-200 absolute left-4 top-[20rem] opacity-70 w-12 h-20 rounded-full"
    >
      P
    </button>
    <img
      @click="
        () => {
          toggleZoom(props.source[0]);
        }
      "
      v-if="source.length < 2"
      class="hover:cursor-zoom-in max-h-[40rem] h-fit m-auto"
      :src="imgAddr + '/artwork/' + props.source[0]"
    />
    <ul
      v-else
      class="w-full h-[40rem] flex flex-row items-center overflow-auto"
    >
      <li
        class="h-full"
        v-for="item in props.source"
        :key="item"
        :src="imgAddr + '/artwork/' + item"
      ></li>
    </ul>
    <button
      v-if="source.length > 1"
      class="bg-gray-200 absolute right-4 top-[20rem] opacity-70 w-12 h-20 rounded-full"
    >
      N
    </button>
  </section>
  <section
    v-if="expand"
    class="absolute top-0 left-0 z-20 bg-white h-max w-max hover:cursor-zoom-out"
    @click="toggleZoom()"
  >
    <img :src="imgAddr + '/artwork/' + expand" />
  </section>
</template>
