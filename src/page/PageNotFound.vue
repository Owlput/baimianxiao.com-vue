<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
</script>
<template>
  <main class="flex flex-col justify-center">
    <h1 class="text-xl m-16">{{ t("notFound.page") }}</h1>
    <button @click="router.go(-1)">{{ t("notFound.back") }}</button>
  </main>
</template>
