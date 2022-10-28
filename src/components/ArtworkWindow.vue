<script setup>
import { ref } from "vue";
const props = defineProps({
  source: Array,
  root: String,
  toggleParentHidden: Function,
});
const windowExpand = ref(props.source.length > 1 ? false : true); // false for 'row', true for 'col'
const zoom = ref("");

function toggleZoom(target = "") {
  zoom.value = target;
}
function toggleWindowExpand() {
  windowExpand.value = !windowExpand.value;
}
function scroll(direction) {
  document.getElementById("dispList").scrollBy({
    left: window.innerWidth * 0.8 * direction,
    behavior: "smooth",
  });
}
</script>
<template>
  <section class="sm:h-max w-full min-w-[15rem] shadow-md relative z-1">
    <button
      v-if="source.length > 1 && !windowExpand"
      class="bg-gray-200 absolute left-4 top-[20rem] opacity-70 w-12 h-20 rounded-full"
      @click="() => scroll(-1)"
    >
      P
    </button>
    <ul
      id="dispList"
      :class="
        'w-full h-full items-center flex overflow-auto snap-x snap-mandatory flex-' +
        (windowExpand ? 'col' : 'row')
      "
    >
      <li
        class="w-full h-full shrink-0 first-of-type:snap-start last-of-type:snap-end snap-center"
        v-for="item in props.source"
        :key="item"
      >
        <img
          class="hover:cursor-zoom-in max-h-[40rem] m-auto"
          @click="() => toggleZoom(item)"
          :src="root + item"
        />
      </li>
    </ul>
    <button
      v-if="source.length > 1 && !windowExpand"
      class="bg-gray-200 absolute right-4 top-[20rem] opacity-70 w-12 h-20 rounded-full"
      @click="() => scroll(1)"
    >
      N
    </button>
    <div
      v-if="source.length > 1"
      :class="
        'absolute bottom-0 right-[25%] w-[50%] h-[8%] hover:cursor-' +
        (windowExpand ? 'n' : 's') +
        '-resize'
      "
      @dblclick="toggleWindowExpand"
    ></div>
  </section>
  <section
    v-if="zoom"
    :class="'absolute top-0 left-0 z-20 bg-white hover:cursor-zoom-out min-h-[100vh] min-w-[100vw]'"
    @click="() => toggleZoom()"
  >
    <img :src="root + zoom" class="m-auto" style="max-width: unset" />
  </section>
</template>
