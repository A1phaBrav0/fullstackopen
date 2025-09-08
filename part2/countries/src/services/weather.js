import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY
const baseUrl = "http://api.weatherapi.com/v1"
const currentWeatherUrl = `${baseUrl}/current.json?key=${api_key}&q=`

const getCurrentWeather = (city) => {
    const request = axios.get(`${currentWeatherUrl}${city}`)
    return request.then(response => response.data)
}

export default { getCurrentWeather }