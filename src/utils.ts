import { reportJokes } from "./ddbb";
import type { DataJoke } from "./interfaces";

export function normalizeJoke(answer: Response, dataJoke: any, randomJoke: number): DataJoke {
  let jokeCatched: string;
  let idCatched: string;
  switch (randomJoke) {
      case 0:
          jokeCatched = dataJoke.joke;
          idCatched = dataJoke.id;
          break;
      case 1:
          jokeCatched = dataJoke.value;
          idCatched = dataJoke.id;
          break;   
      case 2:
          jokeCatched = dataJoke.setup + " -- " + dataJoke.punchline;
          idCatched = dataJoke.id;
          break;   
      default:
          throw new Error(`Problemas con la fuente de chistes`);
          // break;
  }
  const finalJoke: DataJoke = {
      id: idCatched,
      joke: jokeCatched,
      status: answer.status
  }
  return finalJoke;
}

export function printJoke(joke: string): void {
  document.querySelector<HTMLDivElement>('.joke')!.innerHTML = `
    <div>
      <h3>"${joke}"</h3>
    </div>
  `
}

export function voteSelection(event: MouseEvent | { currentTarget: HTMLButtonElement }, 
  buttons: NodeListOf<HTMLButtonElement>): number {
  const selectedButton = event.currentTarget as HTMLButtonElement; 
  const value = parseInt(selectedButton.getAttribute('data-value') || '0');

  buttons.forEach(btn => {
      btn.classList.remove('selected');
  });
  selectedButton.classList.add('selected');
  haveVotedMessage(false);

  return value;
}

export function findJoke(joke: string): number { return reportJokes.findIndex(elem => elem.joke == joke) }

export function haveVotedMessage(voted: boolean): void { 
  let textMessage: HTMLElement = document.getElementById("message__vote")!
  voted ? textMessage.textContent = "Has votat" : textMessage.textContent = "";
}

export function printWeather (message: string): void {
  document.getElementById("weather")!.textContent = message;
}