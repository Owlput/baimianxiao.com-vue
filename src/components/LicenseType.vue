<script setup>
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";
import { siteAddr } from "../config";

const { t } = useI18n({});
let part;

const props = defineProps({
  type: String,
  id: String,
});

switch (
  props.type // Compatibility layer for old backend
) {
  case "CC0": {
    part = "/zero/1.0";

  }
  case "CC BY-NC-ND 4.0": {
    part = "/by-nc-nd/4.0";
    break;
  }
  default:
    part = "";
}
let licenseTemplate = `<a rel="license" href="http://creativecommons.org/licenses${part}">
    <img alt="Creative Commons License - ${props.type}" src="https://i.creativecommons.org/l${part}/88x31.png" />
  </a>`;
</script>
<template>
  <div v-html="licenseTemplate" v-if="part"></div>
  <a v-else :href="siteAddr + '/permit/' + props.id">{{
    t("artworkPage.permit.custom")
  }}</a>
</template>
