import { reportJokes } from "./ddbb";
import type { DataJoke, DataWeather } from "./interfaces";

export const amountSources: number = 3;
export const API_URL = (): string[] => {
  const randomJoke: number = Math.floor(Math.random() * amountSources);
  const card = document.querySelector(".card__joke") as HTMLDivElement;

  let url: string = "";
  switch (randomJoke) {
      case 0:
          url = 'https://icanhazdadjoke.com/';
          card.style.backgroundImage = 'url("./images/emoji-carcajada.png")';
          card.style.backgroundRepeat = 'no-repeat';
          card.style.backgroundSize = 'contain';
          break;
      case 1:
          url = 'https://api.chucknorris.io/jokes/random';
          card.style.backgroundImage = 'url("./images/chuck-norris.png")';
          card.style.backgroundRepeat = 'no-repeat';
          card.style.backgroundSize = 'contain';
          break; 
      case 2:
          url = 'https://official-joke-api.appspot.com/jokes/random';
          card.style.backgroundImage = 'url("./images/cartoon-man.png")';
          card.style.backgroundRepeat = 'no-repeat';
          card.style.backgroundSize = 'contain';
          break;  
      default:
          throw new Error(`Problemas con la fuente de chistes`);
          // break;
  }
  return [url, randomJoke.toString()];
}

export function normalizeJoke(answer: Response, dataJoke: any, randomJoke: number): DataJoke {
  let jokeCatched: string;
  let idCatched: string;
  console.log(randomJoke)
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

export function printWeather (dataWeather: DataWeather): void {
  let messageSky: string = "";
  const code: number = dataWeather.current_weather.weathercode;

  switch (true) {
      case code === 0:
          messageSky = `<img src="./images/weather-icons/day.svg" alt="Dia clar">`;
          break;
      case code >= 1 && code <= 3:
          messageSky = `<img src="./images/weather-icons/cloudy.svg" alt="Dia ennuvolat">`;
          break;
      case code >= 51 && code <= 67:
          messageSky = `<img src="./images/weather-icons/rainy-day.svg" alt="Dia plujós">`;
          break;
      case code >= 71 && code <= 77:
          messageSky = `<img src="./images/weather-icons/snowy-day.svg" alt="Dia amb neu">`;
          break;
      case code >= 80 && code <= 99:
          messageSky = `<img src="./images/weather-icons/thunder.svg" alt="Dia amb neu">`;
          break;
      default:
          messageSky = "temps indeterminat. Mira per la finestra."
          break;
  }
  const messageToPrint: string = `  ${dataWeather.current_weather.temperature}°`;
  
  document.getElementById("icons")!.innerHTML = messageSky;
  document.getElementById("weather")!.innerHTML = messageToPrint;
}