
export function printJoke(joke: string): void {
  document.querySelector<HTMLDivElement>('.joke')!.innerHTML = `
    <div>
      <h3>"${joke}"</h3>
    </div>
  `
}
