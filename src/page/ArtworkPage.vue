<script setup>
// This page component is for showing a single artwork
import { imgAddr } from "../config";

defineProps({
  id: String,
});
</script>

<template>
  <div class="mx-[12%] my-4 flex flex-row flex-nowrap">
    <div class="w-full">
      <section class="bg-gray-400 w-full h-[500px]">
        <img :src="imgAddr + '/thumbs/' + id + '.jpg'" />
      </section>
      <section class="bg-gray-400 w-full h-[200px] mt-4"></section>
    </div>
    <section class="bg-gray-400 w-48 h-auto float-right ml-4"></section>
  </div>
</template>

<style></style>
