
import type { DataWeather } from "./interfaces";
import { printWeather } from "./utils";

const API_WEATHER: string = 'https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&language=es'

export const getWeather = async (): Promise<DataWeather | undefined> => {
    try {
        const answer: Response = await fetch(API_WEATHER);
        if (!answer.ok) {
            throw new Error(`Error HTTP: ${answer.status}`);
        }

        const dataWeather = await answer.json();

        let messageSky: string = "";
        const code: number = dataWeather.current_weather.weathercode;

        switch (true) {
            case code === 0:
                messageSky = "cel clar";
                break;
            case code === 1:
                messageSky = "algúns núvols";
                break;
            case code === 2:
                messageSky = "uns quants núvols";
                break;
            case code === 3:
                messageSky = "molts núvols";
                break;
            case code > 60 && code < 70:
                messageSky = "pluja";
                break;
            default:
                messageSky = "temps indeterminat. Mira per la finestra."
                break;
        }
        const messageToPrint: string = `Informació meteorològica: ${dataWeather.current_weather.temperature}° i hi ha ${messageSky}`;
        printWeather(messageToPrint)

        return dataWeather;

    } catch (error) {
        console.error("Hubo un problema con la operación fetch: ", error);
    }

}