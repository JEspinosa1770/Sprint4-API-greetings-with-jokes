
import type { DataJoke } from "./interfaces";
import { normalizeJoke } from "./utils";
export const amountSources: number = 3;
let API_URL_JOKE: string = "";

export async function getJoke(): Promise<DataJoke | undefined> {
    // try {
    const randomJoke: number = Math.floor(Math.random() * amountSources);

    switch (randomJoke) {
        case 0:
            API_URL_JOKE = 'https://icanhazdadjoke.com/';
            break;
        case 1:
            API_URL_JOKE = 'https://api.chucknorris.io/jokes/random';
            break; 
        case 2:
            API_URL_JOKE = 'https://official-joke-api.appspot.com/jokes/random';
            break;  
        default:
            throw new Error(`Problemas con la fuente de chistes`);
            // break;
    }
    const answer: Response = await fetch(API_URL_JOKE,  { headers: {
        'Accept': 'application/json'
        }
    });
    if (!answer.ok) {
        throw new Error(`Error HTTP: ${answer.status}`);
    }
    
    const dataJoke: any = await answer.json();
console.log(dataJoke)
    const finalJoke = normalizeJoke(answer, dataJoke, randomJoke);
    finalJoke.status = answer.status
    // return normalizeJoke(answer, dataJoke, randomJoke); 
    return finalJoke;

    // } catch (error) {
    //     console.error("Hubo un problema con la operación fetch: ", error);
    // }
}

