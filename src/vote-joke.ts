
import { reportJokes } from "./ddbb";
import type { VotedJoke } from "./interfaces";
import { findJoke } from "./utils";

export function voteJoke(joke: string, score: number): boolean {
    if (score > 0) {
        try {
            if (joke === "") throw new Error(`Error en grabación de datos`);
            const date: string = (new Date()).toISOString();
            const jokeToRecord: VotedJoke = {joke, score, date};
            const resultFind: number = findJoke(joke);
            if (resultFind >= 0) {
                reportJokes[resultFind].score = score;
            } else {
                reportJokes.push(jokeToRecord);
            }
            const consoleMessage: string = `${jokeToRecord.date} - S'ha votat l'acudit ${jokeToRecord.joke} amb una puntuació de ${jokeToRecord.score}. Contingut actual de l'array d'acudits: `;
            console.clear();
            console.log(consoleMessage);
            console.log(reportJokes);
            return true;
        } catch (error) {
            console.error("Hubo un problema: ", error);
            return false;
        }
    }
    return true;
}