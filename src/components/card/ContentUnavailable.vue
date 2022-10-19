<script setup>
const props = defineProps({
  type: String,
});
let message = "";
switch (props.type) {
  case "beTimeout":
    message = "Backend didn't respond";
    break;
  case "brokenLib":
    message = "Broken Library";
    break;
  default:
    message = "Unknown Error";
}
console.log(props.type);
</script>

<template>
  <div class="block">
    <h1 class="text-[5rem]">:(</h1>
    <p class="text-2xl">{{ message }}</p>
  </div>
</template>
