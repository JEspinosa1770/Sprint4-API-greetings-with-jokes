import './style.css'
import { getJoke } from './joke.ts';
import { printJoke } from './utils.ts';
import { voteJoke } from './vote-joke.ts';

const btnJoke: HTMLButtonElement | null = document.querySelector('.btn__next-joke');
const btnVote: HTMLButtonElement | null = document.querySelector('.btn__vote-joke');
const API_URL: string = 'https://icanhazdadjoke.com/';
let actualJoke: string = "";

getJoke(API_URL).then(objectJoke => {  
  printJoke(objectJoke!.joke)
  actualJoke = objectJoke!.joke;
});

btnJoke?.addEventListener('click', () => {
  getJoke(API_URL).then(objectJoke => {  
    printJoke(objectJoke!.joke)
    actualJoke = objectJoke!.joke;
  });
});

btnVote?.addEventListener('click', () => {
  if (actualJoke.length > 0) {
    voteJoke(actualJoke);
    console.log("Votando: ", actualJoke);
  } else {
    console.warn("No se puede votar. Esperando la carga del chiste.");
  }
});
