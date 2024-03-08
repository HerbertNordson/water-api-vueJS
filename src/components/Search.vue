<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue';
import { useClimateStore } from '../stores/climateStore';

const conditionClimate = useClimateStore();
const selected: Ref<String> = ref("");

function onSubmit(event: Event) {
    event.preventDefault();

    if (selected.value === "") { return }

    conditionClimate.handleDataClimate(selected.value)

}
</script>

<template>
    <section class="w-full md:w-80 m-auto">

        <form @submit="onSubmit" class="flex flex-row justify-between items-center w-full m-auto">
            <div class="flex flex-col gap-2">

                <label for="city">Insira o nome da cidade:</label>
                <input name="city" type="text" v-model="selected" class="border-2 border-black p-2 rounded-lg"
                    placeholder="Ex: Salvador" />
            </div>

            <button type="submit" class="text-medium text-xl p-4 border-2 border-black rounded-lg">
                {{ conditionClimate.state }}
            </button>
        </form>
    </section>
</template>