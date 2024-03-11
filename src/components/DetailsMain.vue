<script setup lang="ts">
import DetailsHeader from './DetailsHeader.vue';
import Details from './Details.vue';
import HistoryButtons from './HistoryButtons.vue';
import HistoryDetails from './HistoryDetails.vue';
import Favorite from './Favorite.vue';

</script>

<template>
    <main class="w-full lg:w-2/5 flex flex-col justify-between items-between gap-8 p-4 lg:m-auto">
        <DetailsHeader />
        <Details />
        <HistoryButtons />
        <HistoryDetails />
        <Favorite />
    </main>
</template>