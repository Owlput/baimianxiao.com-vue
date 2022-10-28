<script setup>
import { onMounted } from "vue";
import TopNav from "./components/TopNav.vue";
import { useI18n } from "vue-i18n";

const t = useI18n();
let lang = localStorage.getItem("globalLanguage");
onMounted(() => {
  if (!lang || t.availableLocales.filter((v) => v == lang).length < 1) {
    localStorage.setItem("globalLanguage", "en");
  }
  addEventListener("languageChanged", () => {
    t.locale.value = localStorage.getItem("globalLanguage");
  });
});
</script>

<template>
  <TopNav></TopNav>
  <router-view> </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>
