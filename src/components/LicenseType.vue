<script setup>
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({});
let part;

const props = defineProps({
  type: String,
  id: String,
});

// Compatibility layer for old backend
//prettier-ignore
switch ( props.type ) {
  case "CC0": part = "/zero/1.0"; break;
  case "CC BY-NC-ND 4.0": part = "/by-nc-nd/4.0"; break;
  default: part = "";
}
let licenseTemplate = `
  <a rel="license" href="http://creativecommons.org/licenses${part}">
    <img alt="Creative Commons License - ${props.type}" src="https://i.creativecommons.org/l${part}/88x31.png" />
  </a>
  `;
</script>
<template>
  <div v-html="licenseTemplate" v-if="part"></div>
  <a
    v-else
    @click="router.push(`/permit/${props.id}`)"
    class="hover:cursor-pointer"
    >{{ t("artworkPage.permit.custom") }}</a
  >
</template>
