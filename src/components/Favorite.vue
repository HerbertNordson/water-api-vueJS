<script setup lang="ts">
import { useClimateStore } from '../stores/climateStore';
import { formatedDate, formatedHour } from '../utils/scripts';
const data = useClimateStore()

</script>

<template>
    <section class="w-full" v-if="data.favorites.length > 0">
        <h2 class="text-xl font-medium text-center my-4">Favoritos</h2>
        <div class="overscroll-auto overflow-y-auto max-h-64">
            <div v-for="fav in data.favorites" :key="fav.location.name"
                class="flex items-center justify-between gap-2 mb-3">
                <img :src="fav.current.condition.icon" alt="imagem contendo representando atual clima" />
                <div class="w-full">
                    <p class="font-medium"> {{ fav.location.name }} {{ Math.round(fav.current.temp_c) }}°</p>
                    <p>{{ fav.current.condition.text }}</p>
                </div>
                <div>
                    <p>{{ formatedHour(fav.location.localtime) }}</p>
                </div>
            </div>
        </div>
    </section>
</template>