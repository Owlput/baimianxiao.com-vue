<template>
  <div class="hidden sm:flex justify-around h-12 w-screen">
    <button @click="this.$router.push('/')">
      <h2>{{ $t("topNav.home") }}</h2>
    </button>
    <button>
      <h2>{{ $t("topNav.posts") }}</h2>
    </button>
    <button @click="this.$router.push('/permits')">
      <h2>{{ $t("topNav.permits") }}</h2>
    </button>
    <button @click="this.$router.push('/about')">
      <h2>{{ $t("topNav.about") }}</h2>
    </button>
  </div>
</template>
