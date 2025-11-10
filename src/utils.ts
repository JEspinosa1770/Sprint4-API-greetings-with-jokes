import { reportJokes } from "./ddbb";

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
