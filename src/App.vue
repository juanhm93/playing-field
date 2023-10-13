<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import FieldComponent from "./components/FieldComponent.vue";
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <FieldComponent />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

body {
  overflow: hidden;
}
.title {
  margin: 5px 0;
}
</style>
