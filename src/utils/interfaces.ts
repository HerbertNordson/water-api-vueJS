export interface IResponseAPI {
  location: ILocation
  current: ICurrent
  forecast: IForecast
}

interface ILocation {
  name: string
  region: string
  country: string
  localtime: string
}

interface ICurrent {
  temp_c: number
  is_day: number
  wind_kph: number
  wind_dir: string
  air_quality: {
    o3: number
    "us-epa-index": number
  }
  condition: ICondition
}
interface IForecast {
  forecastday: Array<IForecastday>
}

export interface IForecastday {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: ICondition
  }
  hour: Array<IHour>
}

export interface IHour {
  time: string
  temp_c: number
  is_day: number
  condition: ICondition
}

interface ICondition {
  text: string
  icon: string
}

export interface IErrorRequest {
  response: {
    status: number
  }
}

export interface IError {
  message: String
  status: number
}
