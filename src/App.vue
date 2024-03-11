<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Home from './views/Home.vue'
</script>

<template>
  <Home />
  <Modal />

  <RouterView />
</template>

<style scoped></style>
