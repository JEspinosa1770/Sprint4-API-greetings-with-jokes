
import { reportJokes } from "./ddbb";
import type { VotedJoke } from "./interfaces";
import { findJoke } from "./utils";
import { haveVotedMessage } from "./utils";

export function voteJoke(joke: string, score: number): boolean {

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
        haveVotedMessage(true);
        return true;
    } catch (error) {
        console.error("Hubo un problema: ", error);
        return false;
    }
}