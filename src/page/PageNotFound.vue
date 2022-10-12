<template>
  <main class="flex flex-col justify-center">
    <h1>The page you want to visit does not exist.</h1>
    <button @click="this.$router.go(-1)">Go Back</button>
  </main>
</template>
