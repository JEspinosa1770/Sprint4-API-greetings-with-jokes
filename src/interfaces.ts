
export interface DataJoke {
    id: string,
    joke: string,
    status: number
}

export interface VotedJoke {
    joke: string,
    score: number,
    date: string
}