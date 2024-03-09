<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import getWaterApi from '../services/waterApiRest';
import { useClimateStore } from '../stores/climateStore';
import { formatedDate, formatedHour } from '../utils/scripts';
import type { IHour } from '../utils/interfaces';


const data = useClimateStore()

const newHours: Ref<IHour[]> = ref(data.climate.forecast.forecastday[0].hour)

function handleHour(data: IHour[]) {
    newHours.value = data;
}
</script>

<template>
    <div class="w-full flex flex-col justify-between items-between gap-8 p-6">
        <header class="flex justify-between items-center">
            <div>
                <p class="text-sm leading-4">{{ formatedDate(data.climate.forecast.forecastday[0].date) }}</p>
                <div class="hour text-right">
                    <p class="text-6xl font-bold">
                        {{ formatedHour(data.climate.location.localtime) }}
                    </p>
                    <p v-if="data.climate.current.is_day === 0" class="text-2xl leading-4">am</p>
                    <p v-else class="text-2xl leading-4">pm</p>
                </div>
            </div>
            <div>
                <p class="font-medium text-lg text-center">{{ data.climate.location.name }}, {{
                    data.climate.location.region }}</p>
                <p>min: <span class="text-2xl font-bold">{{
                    Math.round(data.climate.forecast.forecastday[0].day.mintemp_c) }}°</span>
                    | max:
                    <span class="text-2xl  font-bold">{{ Math.round(data.climate.forecast.forecastday[0].day.maxtemp_c)
                        }}°</span>
                </p>
            </div>
        </header>

        <main class="flex flex-col justify-around items-center">
            <img :src="data.climate.current.condition.icon" alt="imagem contendo representando autal clima"
                class="w-40 h-40">
            <div class="text-center">
                <p class="text-6xl font-bold">{{ Math.round(data.climate.current.temp_c) }}°</p>
                <p class="text-2xl font-bold">{{ data.climate.current.condition.text }}</p>
            </div>
        </main>
        <footer>
            <div class="flex justify-between mb-6">
                <div v-for="fore in data.climate.forecast.forecastday" :key="fore.date">
                    <button @click="() => handleHour(fore.hour)"
                        v-if="fore.date === data.climate.forecast.forecastday[0].date">Hoje</button>
                    <button @click="() => handleHour(fore.hour)" v-else>{{ formatedDate(fore.date) }}</button>
                </div>
            </div>
            <div class="overscroll-auto overflow-y-auto max-h-64">
                <div v-for="hr in newHours" :key="hr.time" class="flex items-center justify-between gap-2 mb-3">
                    <img :src="hr.condition.icon" alt="imagem contendo representando autal clima" />
                    <div class="w-full">
                        <p>{{ Math.round(hr.temp_c) }}°</p>
                        <p>{{ hr.condition.text }}</p>
                    </div>
                    <div>
                        <p>{{ formatedHour(hr.time) }}</p>
                        <p class="text-sm leading-4">{{ formatedDate(hr.time) }}</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped></style>