<script setup lang="ts">
import type { IHour } from "../utils/interfaces";
import { onMounted, ref, type Ref } from "vue";
import { formatedDate, formatedHour } from '../utils/scripts';
import { useClimateStore } from "../stores/climateStore";

const data = useClimateStore()

onMounted(() => data.handleHour(data.climate.forecast.forecastday[0].hour))
</script>

<template>
    <div class="flex justify-between mb-2">
        <div v-for="fore in data.climate.forecast.forecastday" :key="fore.date">
            <button class="cursor-pointer hover:text-white focus:text-white focus:font-medium" @click="() => data.handleHour(fore.hour)"
                v-if="fore.date === data.climate.forecast.forecastday[0].date">Hoje</button>
            <button class="cursor-pointer hover:text-white focus:text-white focus:font-medium" @click="() => data.handleHour(fore.hour)" v-else>{{ formatedDate(fore.date) }}</button>
        </div>
    </div>
</template>