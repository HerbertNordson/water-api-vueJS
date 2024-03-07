import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://api.weatherapi.com/v1/"
})

export default api;