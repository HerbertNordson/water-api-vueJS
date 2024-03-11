<script setup lang="ts">
import { useClimateStore } from '../stores/climateStore';
import { formatedDate, formatedHour } from '../utils/scripts';
const data = useClimateStore()

</script>

<template>
    <section class="w-full">
        <h2 class="text-xl font-medium text-center my-2">Histórico de previsão do tempo</h2>

        <div class="overscroll-auto overflow-y-auto max-h-64">
            <div v-for="hr in data.hours" :key="hr.time">
                <div class="flex items-center justify-between gap-2 mb-3">
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
        </div>
        
    </section> 
</template>
