<script setup>
import { watch, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

let { t } = useI18n({});
let router = useRouter();

const route = useRoute();
const activated = ref("");
const dialogTableVisible = ref(false);
const lang = ref(localStorage.getItem("globalLanguage"))

//prettier-ignore
watch(()=>{route.path},() => {
  handleActivated(route.path)
},{deep:true});
function handleActivated(path) {
  switch (path.split("/")[1]) {
    case "": {
      activated.value = "1";
      break;
    }
    case "illust": {
      activated.value = "2-1";
      break;
    }
    case "illustrations": {
      activated.value = "2-1";
      break;
    }
    case "articles": {
      activated.value = "2-2";
      break;
    }
    case "videos": {
      activated.value = "2-3";
      break;
    }
    case "about": {
      activated.value = "3";
      break;
    }
    default:
      console.log(path);
  }
}
//prettier-ignore
function handleSelect(key, path) {
  switch (key) {
    case "0": { router.push("/"); break; }
    case "1": { router.push("/"); break; }
    case "2-1": { router.push("/illustrations"); break;}
    case "2-2": { router.push("/articles"); break; }
    case "2-3": { router.push("/videos"); break; }
    case "3": { router.push("/about"); break; }
  }
}
const languageOptions = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" },
];
watch(()=>{
  route.path
},()=>{
  handleActivated(route.path)
},{deep:true})
watchEffect(()=>{
  localStorage.setItem("globalLanguage",lang.value)
  dispatchEvent(new Event("languageChanged"))
})
</script>

<template>
  <el-menu
    :default-active="activated"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
  >
    <div class="h-fit w-[5%]"></div>
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow"></div>

    <el-menu-item index="1">{{ t("topNav.home") }}</el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ t("topNav.works.#main") }}</template>
      <el-menu-item index="2-1">{{
        t("topNav.works.illustrations")
      }}</el-menu-item>
      <el-menu-item index="2-2">{{ t("topNav.works.articles") }}</el-menu-item>
      <el-menu-item index="2-3">{{ t("topNav.works.videos") }}</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">{{ t("topNav.about") }}</el-menu-item
    ><el-menu-item-group
      ><img
        class="mx-4 my-auto"
        @click="
          () => {
            dialogTableVisible = true;
          }
        "
        src="../assets/icons/translate.svg"
    /></el-menu-item-group>
    <div class="h-fit w-[5%]"></div>
  </el-menu>
  <el-dialog
    v-model="dialogTableVisible"
    v-on:close="
      () => {
        x;
        handleActivated(route.path);
      }
    "
  >
    <p>语言 / Language</p>
    <el-select v-model="lang">
      <el-option
        v-for="item in languageOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-dialog>
</template>
