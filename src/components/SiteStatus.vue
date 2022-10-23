<script setup>
const props = defineProps({
  status: Array,
});
let message = [];
props.status.map((v) => {
  switch (v) {
    case "beTimeout":
      message.push("Backend didn't respond");
      break;
    case "brokenLib":
      message.push("Broken Library");
      break;
    default:
      message.push("Unknown Error");
  }
});
</script>

<template>
  <div class="block">
    <h1 class="text-[5rem]">:(</h1>
    <ul>
      <li v-for="item in message">
        <p class="text-2xl">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>
