
export function printJoke(joke: string): void {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <h3>${joke}</h3>
    </div>
  `
}
