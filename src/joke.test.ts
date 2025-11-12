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

        const result: DataJoke | undefined = await getJoke()
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
        const result: DataJoke | undefined = await getJoke()
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
        const result: DataJoke | undefined = await getJoke()
        expect(result).toEqual(expectedResult);
    });

    it('should detect a fecth error or network error', async () => {
        // const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        // const networkError = new Error("Fallo de conexión simulado");
        // (global.fetch as any).mockRejectedValue(networkError);
        global.fetch = vi.fn(() => Promise.reject(new Error("Fallo de conexión simulado")))

        // const result = await getJoke(API_URL);

        // expect(result).toBeUndefined(); 
        await expect(getJoke()).rejects.toThrow("Fallo de conexión simulado");
        // expect(fetch).toHaveBeenCalledWith(API_URL, expect.any(Object)); 
        // expect(consoleErrorSpy).toHaveBeenCalledWith( 
        //     "Hubo un problema con la operación fetch: ",
        //     networkError
        // );

        // consoleErrorSpy.mockRestore();
    });

    it('should throw an error if the HTTP response is not OK (e.g., 404).', async () => {
        const errorStatus = 404;
        // const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        (global.fetch as any).mockResolvedValue({
            ok: false,
            status: errorStatus,
        } as unknown as Response);

        // const result = await getJoke(API_URL);

        // expect(result).toBeUndefined();
        await expect(getJoke()).rejects.toThrow(`Error HTTP: ${errorStatus}`);
        // expect(consoleErrorSpy).toHaveBeenCalledWith(
        //     "Hubo un problema con la operación fetch: ",
        //     new Error(`Error HTTP: ${errorStatus}`) 
        // );

        // consoleErrorSpy.mockRestore();
    });    
})

