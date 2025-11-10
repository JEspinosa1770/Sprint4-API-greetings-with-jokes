import './style.css'
import { getJoke } from './joke.ts';
import { haveVotedMessage, printJoke } from './utils.ts';
import { voteJoke } from './vote-joke.ts';
import { voteSelection } from './utils.ts';

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
    haveVotedMessage(false);
  });
});

btnVote?.addEventListener('click', (event) => {
  event.preventDefault();
  if (actualJoke.length > 0) {
    voteJoke(actualJoke, currentValue);
  } else {
    console.warn("No se puede votar. Esperando la carga del chiste.");
  }
});

const buttons = document.querySelectorAll('.btn__select') as NodeListOf<HTMLButtonElement>;
let currentValue: number = 0; 
let defaultActive: boolean = true;

if (defaultActive) {
  const defaultButton = document.querySelector('.btn__select[data-value="2"]') as HTMLButtonElement | null;

  if (defaultButton) {
      currentValue = voteSelection({ currentTarget: defaultButton }, buttons );
      defaultActive = false;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', (event: MouseEvent) => currentValue = voteSelection(event, buttons))
});
    
