export interface IResponseAPI {
  location: ILocation
  current: ICurrent
  forecast: IForecast
}

interface ILocation {
  name: String
  region: String
  country: String
}

interface ICurrent {
  temp_c: number
  condition: ICondition
}
interface IForecast {
  forecastday: Array<IForecastday>
}

export interface IForecastday {
  date: String
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: ICondition
  }
  hour: Array<IHour>
}
 
export interface IHour {
  time: String
  temp_c: number
  is_day: number
  condition: ICondition
}

interface ICondition {
  text: String
  icon: String
}

export interface IErrorRequest {
  response: {
    status: number
  }
}