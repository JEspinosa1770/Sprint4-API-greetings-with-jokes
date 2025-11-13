import './style.css'
import { getJoke } from './joke.ts';
import { voteJoke } from './vote-joke.ts';
import { printJoke, voteSelection, API_URL, clearSelected } from './utils.ts';
import { getWeather } from './weather.ts';

const btnJoke: HTMLButtonElement | null = document.querySelector('.btn__next-joke');
const buttons = document.querySelectorAll('.btn__select') as NodeListOf<HTMLButtonElement>;

let actualJoke: string = "";
let currentValue: number = 0; 

getWeather();

getJoke(API_URL()).then(objectJoke => {  
  printJoke(objectJoke!.joke)
  actualJoke = objectJoke!.joke;
});

btnJoke?.addEventListener('click', () => {
  if (actualJoke.length > 0) {
    voteJoke(actualJoke, currentValue);
    clearSelected(buttons);
    currentValue = 0;
  } else {
    console.warn("No se puede votar. Esperando la carga del chiste.");
  }
  getJoke(API_URL()).then(objectJoke => {  
    printJoke(objectJoke!.joke)
    actualJoke = objectJoke!.joke;
  });
});

buttons.forEach(button => {
  button.addEventListener('click', (event: MouseEvent) => {
    const selectedValue = currentValue;
    currentValue = voteSelection(event, buttons, selectedValue)
  });
});
    
