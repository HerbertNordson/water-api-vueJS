<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';

import Search from '../components/Search.vue'
import DetailsMain from '../components/DetailsMain.vue';

import { useClimateStore } from '../stores/climateStore';
import getWaterApi from '../services/waterApiRest';

const data = useClimateStore()
const def = ref(localStorage.getItem("cidade"))
const col = ref()
function addDefault() {
  localStorage.setItem("cidade", `${data.climate.location.name}`)
  def.value = data.climate.location.name
}

if (localStorage.getItem("cidade")) {
  onMounted(getWaterApi)
}

</script>

<template>
  <main class="w-full min-h-screen p-4 flex flex-col justify-center" :style="{
    background: data.climate.current && data.climate.current.is_day === 0 ? 'radial-gradient(circle, rgba(6,43,52,1) 58%, rgba(245,245,245,0.9150035014005602) 100%)' : 'radial-gradient(circle, rgba(34,163,195,1) 60%, rgba(253,235,45,0.8673844537815126) 100%)',
    color: data.climate.current && data.climate.current.is_day === 0 ? '#ffffff' : '#10111e',
  }">

      <Search />
      <section
        v-if="data.climate.current !== undefined && data.climate.forecast !== undefined && data.climate.location !== undefined"
        class="min-h-full my-10">
        <div v-if="def !== data.climate.location.name" class="flex justify-center gap-2 ">
          <p>Deseja tornar {{ data.climate.location.name }} como cidade padrão?</p>
          <input type="button" @click="addDefault" value="Sim"
            class="text-blue-700 cursor-pointer font-medium hover:text-white focus:text-white focus:font-medium" />
        </div>
        <DetailsMain />
      </section>
    </main>
</template>