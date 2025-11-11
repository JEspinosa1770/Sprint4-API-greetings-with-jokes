
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

export interface DataWeather {
    time: string,
    temperature: number,
    wind_speed: number,
    code: number,
    rain: boolean
}