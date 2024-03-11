<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';
import { useClimateStore } from '../stores/climateStore';
import { arQuality, formatedDate, formatedHour, formatedResponse } from '../utils/scripts';
import type { IHour, IResponseAPI } from '../utils/interfaces';
import api from '../services/api';


const data = useClimateStore()


const newHours: Ref<IHour[]> = ref(data.climate.forecast.forecastday[0].hour)
const favs: Ref<string[]> = ref([])

function handleHour(data: IHour[]) {
    newHours.value = data;
}

function handleFavorite() {
    const setFav = localStorage.getItem('favoritos') ?? ''
    const arr = setFav.split(",")

    if (arr.includes(data.climate.location.name)) {
        return removeFavorite()
    }

    return addFavorite()
}


async function addFavorite() {
    if (localStorage.getItem("favoritos")) {
        const setFav = localStorage.getItem('favoritos') ?? ''
        const arr = setFav.split(",")
        arr.push(data.climate.location.name)
        const newArr = arr.map((item: string) => item)
        localStorage.setItem("favoritos", `${newArr}`)
        favs.value = arr
        initDataFavorites()
        return
    }

    localStorage.setItem("favoritos", `${data.climate.location.name}`)
    favs.value = [data.climate.location.name]
    initDataFavorites()
}

function removeFavorite() {
    const arr = favs.value.filter((fav: string) => fav !== data.climate.location.name)
    favs.value = arr

    const newFavs = data.favorites.filter((fav: IResponseAPI) => fav.location.name !== data.climate.location.name)
    data.handleDataFavorites(newFavs)

    if (arr.length === 0) return localStorage.removeItem("favoritos")

    localStorage.setItem("favoritos", `${arr}`)
    return
}

async function initDataFavorites() {
    if (localStorage.getItem('favoritos')) {
        const setFav = localStorage.getItem('favoritos') ?? ''
        const arr = setFav.split(',')
        const newArr = []
        for (let item in arr) {
            const response = await api.get(
                `forecast.json?key=6bae648fa89e4356a61194531240703&q=${arr[item]}&days=4&aqi=yes&alerts=yes&lang=pt`
            )
            newArr.push(formatedResponse(response.data))
        }

        data.handleDataFavorites(newArr)
    }
}

onMounted(initDataFavorites)
</script>

<template>
    <header class="flex justify-between items-center ">
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
            <div class="flex justify-end">

                <svg @click="handleFavorite" class="right-0" version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="35px" height="35px" viewBox="0 0 1280.000000 1181.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,1181.000000) scale(0.100000,-0.100000)"
                        :fill="data.favorites.length > 0 && data.favorites.find((item) => item.location.name === data.climate.location.name) ? '#ff0' : '#000'"
                        stroke="none">
                        <path d="M6193 10857 c-133 -402 -411 -1247 -618 -1877 -207 -630 -425 -1291
                -484 -1470 l-108 -325 -2347 -3 c-1510 -1 -2346 -6 -2344 -12 2 -5 844 -613
                1873 -1351 1029 -737 1880 -1351 1893 -1363 l22 -22 -176 -534 c-96 -294 -290
                -881 -429 -1305 -139 -423 -366 -1114 -505 -1535 -138 -421 -271 -825 -295
                -897 -24 -73 -40 -133 -36 -133 5 0 858 610 1897 1356 1348 968 1894 1354
                1909 1352 11 -3 867 -613 1903 -1357 1036 -744 1886 -1351 1888 -1348 5 5
                -157 500 -1061 3252 -364 1108 -377 1145 -373 1156 2 5 851 618 1887 1362
                1036 743 1886 1358 1889 1365 3 9 -477 12 -2336 12 -1860 0 -2341 3 -2349 13
                -5 6 -332 995 -727 2197 -395 1202 -721 2188 -725 2192 -4 4 -115 -322 -248
                -725z" />
                    </g>
                </svg>
            </div>
            <div class="flex justify-between items-center gap-2">
                <p class="font-medium text-lg text-center">{{ data.climate.location.name }}, {{
                data.climate.location.region }}</p>
            </div>
            <p>min: <span class="text-2xl font-bold">{{
                Math.round(data.climate.forecast.forecastday[0].day.mintemp_c) }}°</span>
                | max:
                <span class="text-2xl  font-bold">{{ Math.round(data.climate.forecast.forecastday[0].day.maxtemp_c)
                    }}°</span>
            </p>
        </div>
    </header>
</template>