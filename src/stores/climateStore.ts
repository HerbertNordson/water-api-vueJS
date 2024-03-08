import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useClimateStore = defineStore('climate', () => {
  //states
  const climate: Ref<[]> = ref([])
  const state: Ref<String> = ref("Carregar")

  //actions
  async function handleDataClimate(city: String) {
    state.value = "Carregando";
    const response = await api
      .get(`current.json?key=6bae648fa89e4356a61194531240703&q=${city}&aqi=no`)
      .then((res) => {
        climate.value = res.data
        return res.data
      })
      .catch((err) => {
        console.error(err)
        return []
      })

    state.value = "Carregado"
  }

  //getters
  return { climate, state, handleDataClimate }
})
