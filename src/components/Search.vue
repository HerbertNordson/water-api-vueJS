<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { useClimateStore } from '../stores/climateStore';
import getWaterApi from '../services/waterApiRest';

const conditionClimate = useClimateStore();
const selected: Ref<string> = ref("");

function onSubmit(event: Event) {
    event.preventDefault();

    if (selected.value === "") { return }

    getWaterApi(selected.value)

}
</script>

<template>
    <section class="w-full md:w-80 m-auto">

        <form @submit="onSubmit" class="flex flex-row justify-between items-center w-full m-auto">
            <div class="flex items-center gap-2">
                <label for="city">Cidade:</label>
                <input name="city" type="text" v-model="selected" class="border-2 border-black p-2 rounded-lg"
                    placeholder="Ex: Salvador" />
            </div>

            <button type="submit" class="text-medium px-4 py-2 border-2 border-black rounded-lg">
                {{ conditionClimate.state }}
            </button>
        </form>
    </section>
</template>