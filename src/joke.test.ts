import { describe, it, expect, vi } from 'vitest'
import { getJoke } from './joke';
import type { DataJoke } from './interfaces';
import { amountSources } from './joke';

describe('Function "getJoke"', () => {
    global.fetch = vi.fn();
    it('should be declared', () => {
        expect(typeof getJoke).toBe('function');
    });

    it('should return the expected data API1', async () => {
        const mockData: any = {id:"1", joke:"Ok", status: 200};
        const randomMocked: number = 0.1;
        vi.spyOn(Math, 'random').mockReturnValue(randomMocked / amountSources);
        (global.fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => Promise.resolve(mockData)
        } as unknown as Response)

        const result: DataJoke | undefined = await getJoke(['https://icanhazdadjoke.com/', "0"])
        expect(result).toEqual(mockData);
    });

    it('should return the expected data API2', async () => {
        const mockData: any = {id:"1", value:"Ok", status: 200};
        const randomMocked: number = 1.1;
        vi.spyOn(Math, 'random').mockReturnValue(randomMocked / amountSources);
        (global.fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => Promise.resolve(mockData)
        } as unknown as Response)
        const expectedResult: DataJoke = {id:"1", joke: mockData.value, status: 200};
        const result: DataJoke | undefined = await getJoke(['https://api.chucknorris.io/jokes/random', "1"])
        expect(result).toEqual(expectedResult);
    });

    it('should return the expected data API3', async () => {
        const mockData: any = {id:"1", setup:"Ok", punchline:"2", status: 200};
        const randomMocked: number = 2.1;
        vi.spyOn(Math, 'random').mockReturnValue(randomMocked / amountSources);
        (global.fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => Promise.resolve(mockData)
        } as unknown as Response)
        const expectedResult: DataJoke = {id:"1", joke: mockData.setup + " -- " + mockData.punchline, status: 200};
        const result: DataJoke | undefined = await getJoke(['https://official-joke-api.appspot.com/jokes/random', "2"])
        expect(result).toEqual(expectedResult);
    });

    it('should detect a fecth error or network error', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error("Fallo de conexión simulado")))
        await expect(getJoke(['https://icanhazdadjoke.com/', "1"])).rejects.toThrow("Fallo de conexión simulado");
    });

    it('should throw an error if the HTTP response is not OK (e.g., 404).', async () => {
        const errorStatus = 404;
        (global.fetch as any).mockResolvedValue({
            ok: false,
            status: errorStatus,
        } as unknown as Response);
        await expect(getJoke(['https://icanhazdadjoke.com/', "1"])).rejects.toThrow(`Error HTTP: ${errorStatus}`);
    });    
})

