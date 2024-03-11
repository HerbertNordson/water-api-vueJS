import getWaterApi from '@/services/waterApiRest'
import type { IError, IHour, IResponseAPI } from '@/utils/interfaces'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useClimateStore = defineStore('climate', () => {
  //states
  const climate: Ref<IResponseAPI> = ref({} as IResponseAPI)
  const favorites: Ref<Array<IResponseAPI>> = ref({} as Array<IResponseAPI>)
  const state: Ref<string> = ref('Carregar')
  const hours: Ref<IHour[]> = ref({} as Array<IHour>)

  function handleHour(data: IHour[]) {
    hours.value = data
  }

  const error: Ref<IError> = ref({
    message: '',
    status: 0
  })

  //actions
  function handleDataClimate(data: IResponseAPI) {
    climate.value = data

    state.value = 'Carregar'
  }

  function handleDataFavorites(data: Array<IResponseAPI>) {
    favorites.value = data
  }

  function resetError() {
    error.value = { message: '', status: 0 }
  }

  //getters
  return {
    climate,
    state,
    error,
    favorites,
    hours,
    handleDataClimate,
    handleDataFavorites,
    handleHour,
    resetError
  }
})
