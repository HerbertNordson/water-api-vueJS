import type { IErrorRequest, IForecastday, IHour, IResponseAPI } from '@/utils/interfaces'
import api from './api'
import { useClimateStore } from '@/stores/climateStore'

const getWaterApi= async (city: string = "Salvador") => {
  const { handleDataClimate } = useClimateStore()

  try {
    const resp = await api.get(
      `forecast.json?key=6bae648fa89e4356a61194531240703&q=${city}&days=4&aqi=yes&alerts=yes`
    )

    if (resp.status === 200) {
      const value = resp.data
      const data: IResponseAPI = {
        location: {
          name: value.location.name,
          region: value.location.region,
          country: value.location.country,
          localtime: value.location.localtime
        },
        current: {
          temp_c: value.current.temp_c,
          is_day: value.current.is_day,
          condition: {
            text: value.current.condition.text,
            icon: value.current.condition.icon
          }
        },
        forecast: {
          forecastday: value.forecast.forecastday.map((el: IForecastday) => ({
            date: el.date,
            day: {
              maxtemp_c: el.day.maxtemp_c,
              mintemp_c: el.day.mintemp_c,
              condition: {
                text: el.day.condition.text,
                icon: el.day.condition.icon
              }
            },
            hour: el.hour.map((hr: IHour) => {
              return {
                time: hr.time,
                temp_c: hr.temp_c,
                is_day: hr.is_day,
                condition: {
                  text: hr.condition.text,
                  icon: hr.condition.icon
                }
              }
            })
          }))
        }
      }
      handleDataClimate(data)
    }

    return {} as IResponseAPI
  } catch (error: IErrorRequest | any) {
    if (error.response.status === 403) {
      clima.error = { message: 'Ocorreu um erro de autorização.', status: error.response.status }
    } else if (error.response.status === 404) {
      clima.error = {
        message: `Não foi encontrado informações do clima para a cidade: ${city}.`,
        status: error.response.status
      }
    } else {
      clima.error = {
        message: 'Não foi possível se comunicar com o servidor!',
        status: error.response.status
      }
    }
    return {} as IResponseAPI
  }
}

export default getWaterApi
