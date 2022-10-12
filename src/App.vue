<script>
import TopNav from "./components/TopNav.vue";
import ThumbHolder from "./components/ThumbHolder.vue";

export default {
  name: "App",
  components: {
    TopNav,
    ThumbHolder,
  },
};
</script>

<template>
  <TopNav></TopNav>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
