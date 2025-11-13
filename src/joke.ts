
import type { DataJoke } from "./interfaces";
import { normalizeJoke } from "./utils";
export const amountSources: number = 3;

export async function getJoke(jokeParams: Array<string>): Promise<DataJoke | undefined> {
    const answer: Response = await fetch(jokeParams[0],  { headers: {
        'Accept': 'application/json'
        }
    });
    if (!answer.ok) {
        throw new Error(`Error HTTP: ${answer.status}`);
    }
    
    const dataJoke: any = await answer.json();
    const finalJoke = normalizeJoke(answer, dataJoke, parseInt(jokeParams[1]));
    finalJoke.status = answer.status

    return finalJoke;
}

