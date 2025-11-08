
// import type { VotedJoke } from "./interfaces";

export function voteJoke(joke: string): boolean {

    try {
        if (joke === "") throw new Error(`Error en grabación de datos`);

        return true;
    } catch (error) {
        console.error("Hubo un problema: ", error);
        return false;
    }
}