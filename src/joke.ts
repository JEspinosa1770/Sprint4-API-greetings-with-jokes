
import type { DataJoke } from "./interfaces";

export async function getJoke(url: string): Promise<DataJoke | undefined> {
    try {
        const answer: Response = await fetch(url,  { headers: {
            'Accept': 'application/json'
            }
        });
        if (!answer.ok) {
            throw new Error(`Error HTTP: ${answer.status}`);
        }

        const dataJoke: DataJoke = await answer.json();

        return dataJoke;

    } catch (error) {
        console.error("Hubo un problema con la operación fetch: ", error);
    }
}

