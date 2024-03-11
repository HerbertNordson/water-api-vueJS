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
    selected.value = ""
}
</script>

<template>
    <section class="w-full md:w-1/5 m-auto">

        <form @submit="onSubmit" class="flex flex-row justify-around items-center w-full m-auto gap-2">
            <div class="flex items-center gap-2">
                <label for="city">Cidade:</label>
                <input name="city" type="text" v-model="selected" class="border-2 p-2 rounded-lg"
                    placeholder="Ex: Salvador" />
            </div>

            <button type="submit" class="text-medium py-2 hover:text-white focus:text-white focus:font-medium">
                {{ conditionClimate.state }}
            </button>
        </form>
    </section>
</template>