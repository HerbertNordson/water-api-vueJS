<script setup lang="ts">
import { ref } from "vue";
import { useClimateStore } from "../stores/climateStore";
import { arQuality } from "../utils/scripts";

const data = useClimateStore()
const ar = ref(arQuality(data.climate.current.air_quality['us-epa-index']))

</script>

<template>
    <section class="flex items-center justify-between w-full">
        <img :src="data.climate.current.condition.icon" alt="imagem contendo representando atual clima"
            class="w-40 h-40 m-auto">
        <div class="text-left">
            <p class="text-6xl font-bold">{{ Math.round(data.climate.current.temp_c) }}°</p>
            <p class="text-lg font-bold">{{ data.climate.current.condition.text }}</p>
        </div>
    </section>
    <section class="flex flex-col items-center justify-between w-full gap-2 mb-4">
        <div class="flex items-center justify-between w-full gap-2">
            <p>Velocidade do vento <span class="block text-xl font-medium">{{
            Math.round(data.climate.current.wind_kph) }}
                    km/h</span></p>
            <p>Direção do vento <span class="block text-xl font-medium">{{ data.climate.current.wind_dir
                    }}</span></p>
        </div>
        <div class="flex items-start justify-between w-full gap-2">
            <p>Qualidade do ar <span class="block text-xl font-medium" :style="{ color: ar.color }">{{
            ar.value }}
                </span></p>
            <p>O3: <span class="text-xl font-medium">{{ data.climate.current.air_quality.o3 }} µg/m3</span></p>
        </div>
    </section>
</template>