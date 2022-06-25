<script>
import TopNav from './components/TopNav.vue';
import ThumbHolder from './components/ThumbHolder.vue';

export default{
  name:'App',
  components:{
    TopNav,
    ThumbHolder
},
  data(){
    return {
      thumb:[1,2,3,4,5,6,7,8,9,10]
    }
  }
}

</script>

<template>
  <TopNav></TopNav>
  <ThumbHolder></ThumbHolder>
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
