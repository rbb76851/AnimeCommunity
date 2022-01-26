<script setup lang="ts">
import Header from "./components/Header.vue";

</script>

<template>
  <div class="global-min-width">
    <Header />
    <router-view :key="$router.path" />
  </div>
</template>

<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html,body{
  margin:0;
  padding:0;
  background-color: #F7F7F7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Asap,sans-serif;
  font-weight: 700;
  color: #464646;
}
li{
  list-style: none;
}
.global-min-width{
  min-width: 1400px;
}
</style>
