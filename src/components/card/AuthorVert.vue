<script setup>
const props = defineProps({
  data: Object,
  imgRoot: String,
});
</script>
<template>
  <section class="shadow-lg my-4">
    <div class="flex justify-evenly items-center my-4">
      <img
        :src="imgRoot + '/' + data.image"
        class="h-[50px] w-[50px] rounded-full"
      />
      <p class="inline">{{ data.name }}</p>
    </div>
    <ul class="flex flex-wrap justify-evenly mx-auto my-4">
      <ContactIcon
        v-for="item in data.contact"
        v-bind:key="item[0]"
        :type="item[0]"
        :href="item[1]"
      ></ContactIcon>
    </ul>
    <slot></slot>
  </section>
</template>
