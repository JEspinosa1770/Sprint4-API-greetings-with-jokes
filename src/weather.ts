
import type { DataWeather } from "./interfaces";
import { printWeather } from "./utils";


export const getWeather = async (): Promise<DataWeather | undefined> => {
    const API_WEATHER: string = 'https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&language=es'
    // try {
        const answer: Response = await fetch(API_WEATHER);
        if (!answer.ok) {
            throw new Error(`Error HTTP: ${answer.status}`);
        }

        const dataWeather = await answer.json();

        printWeather(dataWeather)

        return dataWeather;

    // } catch (error) {
    //     console.error("Hubo un problema con la operación fetch: ", error);
    // }

}