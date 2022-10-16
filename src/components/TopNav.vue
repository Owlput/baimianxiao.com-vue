<script setup>
import { watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

let { t } = useI18n({});
let router = useRouter();

const route = useRoute();
const activated = ref("");

watchEffect(() => {
  switch (route.path.split("/")[1]) {
    case "": {
      activated.value = "1";
      break;
    }
    case "artwork": {
      activated.value = "2";
      break;
    }
    case "artworks": {
      activated.value = "2";
      break;
    }
    case "permits": {
      activated.value = "3";
      break;
    }
    case "about": {
      activated.value = "4";
      break;
    }
  }
});
function handleSelect(k, path) {
  switch (k) {
    case "0": {
      router.push("/");
      break;
    }
    case "1": {
      router.push("/");
      break;
    }
    case "3": {
      router.push("/permits");
      break;
    }
    case "4": {
      router.push("/about");
      break;
    }
  }
}
</script>

<template>
  <el-menu :default-active="activated" mode="horizontal" @select="handleSelect" :ellipsis="false">
    <div class="h-fit w-[5%]"/>
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">{{ t("topNav.home") }}</el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ t("topNav.works.#main") }}</template>
      <el-menu-item index="2-1">{{
        t("topNav.works.illustrations")
      }}</el-menu-item>
      <el-menu-item index="2-2">{{ t("topNav.works.articles") }}</el-menu-item>
      <el-menu-item index="2-3">{{ t("topNav.works.videos") }}</el-menu-item>
    </el-sub-menu>
    <el-menu-item>{{ t("topNav.permits") }}</el-menu-item>
    <el-menu-item>{{ t("topNav.about") }}</el-menu-item>
    <div class="h-fit w-[5%]"/>
  </el-menu>
</template>
