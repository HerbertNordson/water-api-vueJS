<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import Modal from './components/Modal.vue';
import Search from './components/Search.vue'
import getWaterApi from './services/waterApiRest';

onMounted(getWaterApi)
</script>

<template>
  <main class="w-full min-h-full p-4">
    <Search />
  </main>

  <Modal />

  <RouterView />
</template>

<style scoped></style>
