import type { IForecastday, IHour, IResponseAPI } from './interfaces'

export const formatedHour = (date: string) => {
  const regexValidateDate = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})\s(\d{1}|\d{2})(:)(\d{2})/g
  if (regexValidateDate.test(date)) {
    const regex = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2}) /g
    return date.replace(regex, '')
  }

  return ''
}

export const formatedDate = (date: string) => {
  const regexValidateDate = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})?[\s(\d{2})(:)(\d{2})]/g
  if (regexValidateDate.test(date)) {
    const removeHour = date.replace(/\s(\d{2})(:)(\d{2})/g, '')
    const year = removeHour.replace(/(-|\/)(\d{2})(-|\/)(\d{2})/g, '')
    let middle = removeHour.replace(/(\d{4})(-|\/)/g, '')
    const month = middle.replace(/(-|\/)(\d{2})/g, '')
    const day = removeHour.replace(/(\d{4})(-|\/)(\d{2})(-|\/)/g, '')
    const dateFormated = `${day}/${month}/${year}`
    return dateFormated
  }

  return ''
}

export const arQuality = (value: number) => {
  switch (value) {
    case 1:
      return {color: "#32CD32", value: "Bom"}
      break;
    case 2:
      return {color: "#FFFF00", value: "Moderado"}
      break;
    case 3:
      return {color: "#FFA500", value: "Insalubridade para grupo sensível"}
      break;
    case 4:
      return {color: "#FF8C00", value: "Insalubridade"}
      break;
    case 5:
      return {color: "#FF4500", value: "Muito insalubre"}
      break;
  
    default:
      return {color: "#FF0000", value: "Perigoso"}
      break;
  }
}

export const formatedResponse = (value: IResponseAPI) => {
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
      wind_kph: value.current.wind_kph,
      wind_dir: value.current.wind_dir,
      air_quality: {
        o3: value.current.air_quality.o3,
        "us-epa-index": value.current.air_quality['us-epa-index']
      },
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

  return data
}
