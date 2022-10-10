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
  <section
    class="bg-black flex min-h-fit justify-around items-center flex-wrap"
  >
    <a
      href="https://beian.miit.gov.cn/"
      class="sm:text-xl lg:text-3xl h-fit text-white m-2"
      >赣ICP备2021006793号-2</a
    >
    <address class="sm:text-xl lg:text-3xl text-white h-fit m-2">
      DrHuangMHT@owlput.org
    </address>
  </section>
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
