<template>
    <div class="hidden sm:flex justify-around h-12 w-screen">
        <button @click="this.$router.push('/')"><h2>Home</h2></button>
        <button @click="this.$router.push('/permits')"><h2>Permits</h2></button>
        <button @click="this.$router.push('/about')"><h2>About</h2></button>
    </div>
</template>
