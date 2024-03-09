<script setup lang="ts">
import { useClimateStore } from "../stores/climateStore";

const clima = useClimateStore();
</script>

<template>
    <div v-if="clima.error.status !== 0" class="absolute inset-0 z-10 bg-black bg-opacity-50">
        <div class="flex  flex-col items-center justify-center min-h-full">
            <div class="max-w-80 block text-black bg-white rounded-lg p-8">
                <header>
                    <h3 class="w-full text-center font-bold text-2xl">Que climão hein...</h3>
                    <p class="text-center font-medium">{{ clima.error.message }}</p>
                </header>
                <main class="my-8">
                    <p class="text-center  ">Por favor, verifique os dados informados ou tente novamente mais tarde.</p>
                </main>
                <footer>
                    <button class="w-full p-4 text-center rounded-lg bg-black text-white text-xl font-medium" type="button" @click="clima.resetError">Fechar</button>
                </footer>
            </div>
        </div>
    </div>
</template>