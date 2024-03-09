import getWaterApi from '@/services/waterApiRest'
import type { IError, IResponseAPI } from '@/utils/interfaces'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useClimateStore = defineStore('climate', () => {
  //states
  const climate: Ref<IResponseAPI> = ref({} as IResponseAPI)
  const state: Ref<string> = ref('Carregar')
  const error: Ref<IError> = ref({
    message: '',
    status: 0
  })

  //actions
  function handleDataClimate(data: IResponseAPI) {
    state.value = 'Carregando'
    
    climate.value = data;

    state.value = 'Carregar'
  }

  function resetError() {
    error.value = { message: '', status: 0 }
  }

  //getters
  return { climate, state, error, handleDataClimate, resetError }
})
