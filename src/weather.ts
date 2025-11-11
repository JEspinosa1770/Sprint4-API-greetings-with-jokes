
import type { DataWeather } from "./interfaces";
// import { fetchWeatherApi } from 'openmeteo';

// const params = {
//     "latitude": 41.3888,
//     "longitude": 2.159,
//     "current": ["temperature_2m", "wind_speed_10m", "weather_code", "rain"],
//     "timezone": "Europe/London",
// };
// const url = "https://api.open-meteo.com/v1/forecast";
const API_WEATHER: string = 'https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&language=es'
export const getWeather = async (): Promise<DataWeather | undefined> => {
    try {
        const answer: Response = await fetch(API_WEATHER);
        if (!answer.ok) {
            throw new Error(`Error HTTP: ${answer.status}`);
        }

        const dataWeather = await answer.json();
console.log(dataWeather)
        // const dataWeather = answer[0];
        // const current = dataWeather.current();
        // const current = dataWeather.current();
        // const weatherData = {
        //     current: {
        //         time: current.variables(0).value,
        //         temperature_2m: current.variables(1).value,
        //         wind_speed_10m: current.variables(2).value,
        //         weather_code: current.variables(3).value,
        //         rain: current.variables(4).value
        //     }
        // }
console.log(dataWeather.current_weather.temperature)
        return dataWeather;

    } catch (error) {
        console.error("Hubo un problema con la operación fetch: ", error);
    }

}