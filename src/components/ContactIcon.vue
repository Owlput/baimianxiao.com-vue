<script setup>
import pixiv from "../assets/icons/pixiv.ico";
import bcy from "../assets/icons/bcy.svg";
import bilibili from "../assets/icons/bilibili.svg";
import lofter from "../assets/icons/lofter.svg";
import twitter from "../assets/icons/twitter.svg";
import weibo from "../assets/icons/weibo.svg";
const props = defineProps({
  type: String,
  href: String,
});
let source = "";
//prettier-ignore
switch (props.type) {
  case "bcy": source = bcy; break;
  case "bilibili": source = bilibili; break;
  case "lofter": source = lofter; break; 
  case "pixiv": source = pixiv; break;
  case "twitter": source = twitter; break;
  case "weibo": source = weibo; break;
  default : break;
}
</script>
<template>
  <li class="hover:cursor-pointer">
    <img :src="source" @click="Window.location.assign(href)" width="50" class="rounded-lg"/>
  </li>
</template>
