import api from '@/services/api'
import getWaterApi from '@/services/waterApiRest'
import type { IResponseAPI } from '@/utils/interfaces'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface IError {
  message: String
  status: number
}

export const useClimateStore = defineStore('climate', () => {
  //states
  const climate: Ref<IResponseAPI> = ref({} as IResponseAPI)
  const state: Ref<String> = ref('Carregar')
  const error: Ref<IError> = ref({
    message: '',
    status: 0
  })

  //actions
  async function handleDataClimate(city: String) {
    state.value = 'Carregando'

    const response = await getWaterApi(city)

    if (response) {
      return (state.value = 'Carregado')
    }

    state.value = 'Carregar'
    return []
  }

  function resetError() {
    error.value = { message: '', status: 0 }
  }

  //getters
  return { climate, state, error, handleDataClimate, resetError }
})
