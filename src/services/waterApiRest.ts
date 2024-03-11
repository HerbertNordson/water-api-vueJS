import type { IErrorRequest, IForecastday, IHour, IResponseAPI } from '@/utils/interfaces'
import api from './api'
import { useClimateStore } from '@/stores/climateStore'
import { formatedResponse } from '@/utils/scripts'

const getWaterApi= async (city: string = localStorage.getItem("cidade") ?? "") => {
  const clima = useClimateStore()
  clima.state = 'Carregando'
  try {
    const resp = await api.get(
      `forecast.json?key=6bae648fa89e4356a61194531240703&q=${city}&days=4&aqi=yes&alerts=no&lang=pt`
    )

    if (resp.status === 200) {
      const data = formatedResponse(resp.data);
      clima.handleDataClimate(data)
      return data;
    }

    return {} as IResponseAPI
  } catch (err: IErrorRequest | any) {
    if (err.response.status === 403) {
      clima.error = { message: 'Ocorreu um erro de autorização.', status: err.response.status }
    } else if (err.response.status === 404) {
      clima.error = {
        message: `Não foi encontrado informações do clima para a cidade: ${city}.`,
        status: err.response.status
      }
    } else {
      clima.error = {
        message: 'Não foi possível se comunicar com o servidor!',
        status: err.response.status
      }
    }
    return {} as IResponseAPI
  }
}

export default getWaterApi
