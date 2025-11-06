import './style.css'
import { getJoke } from './joke.ts';
import { printJoke } from './utils.ts';

const btnJoke: HTMLButtonElement | null = document.querySelector('.btn__next-joke');
const API_URL: string = 'https://icanhazdadjoke.com/';

getJoke(API_URL).then(objectJoke => {  
  printJoke(objectJoke!.joke)
});

btnJoke?.addEventListener('click', () => {
  getJoke(API_URL).then(objectJoke => {  
    printJoke(objectJoke!.joke)
  });

})
