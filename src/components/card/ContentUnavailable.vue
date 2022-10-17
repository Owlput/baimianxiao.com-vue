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
console.log(props.type)
</script>

<template>
  <h1>:(</h1>
  <p>{{ message }}</p>
</template>
