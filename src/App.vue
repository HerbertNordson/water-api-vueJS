<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import Modal from './components/Modal.vue';
import Search from './components/Search.vue'
import Apresentation from './components/Apresentation.vue';
import { useClimateStore } from './stores/climateStore';
import getWaterApi from './services/waterApiRest';

const data = useClimateStore()

onMounted(getWaterApi)
</script>

<template>
  <main class="w-full min-h-screen p-4">
    <Search />
    <section
      v-if="data.climate.current !== undefined && data.climate.forecast !== undefined && data.climate.location !== undefined"
      class="min-h-full">
      <Apresentation />
    </section>
  </main>

  <Modal />

  <RouterView />
</template>

<style scoped></style>
