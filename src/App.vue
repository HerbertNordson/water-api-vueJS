<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useClimateStore } from './stores/climateStore';

const clima = useClimateStore();
const selected: Ref<String> = ref("Salvador");

function onSubmit(event: Event) {
  event.preventDefault();

  if (selected.value === "") { return }

  clima.handleDataClimate(selected.value)

}


</script>

<template>

  <form @submit="onSubmit" class="flex flex-col justify-center items-center w-80 m-auto">
    <label for="city">Escolha sua cidade</label>
    <select name="city" id="city" v-model="selected" class="bg-black text-white">
      <option value="Salvador">Salvador</option>
      <option value="Sao-paulo">São Paulo</option>
      <option value="Curitiba">Curitiba</option>
    </select>

    <button type="submit">
      {{ clima.state }}
    </button>
  </form>

  <prev class="text-white">{{ clima.climate }}</prev>

  <RouterView />
</template>

<style scoped></style>
