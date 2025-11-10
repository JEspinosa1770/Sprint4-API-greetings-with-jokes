import { describe, it, expect, vi } from 'vitest'
import { getJoke } from './joke';
import type { DataJoke } from './interfaces';

const API_URL = 'https://icanhazdadjoke.com/'

describe('Function "getJoke"', () => {
    global.fetch = vi.fn();
    it('should be declared', () => {
        expect(typeof getJoke).toBe('function');
    });

    it('should return the expected data', async () => {
        const mockData: DataJoke = {id:"1", joke:"Ok", status: 200};
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => Promise.resolve(mockData)
        } as unknown as Response)

        const result = await getJoke(API_URL)
        expect(result).toEqual(mockData);
    });

    it('should detect a fecth error or network error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const networkError = new Error("Fallo de conexión simulado");
        (global.fetch as any).mockRejectedValue(networkError);

        const result = await getJoke(API_URL);

        expect(result).toBeUndefined(); // que devuelva undefined
        expect(fetch).toHaveBeenCalledWith(API_URL, expect.any(Object)); // que haya sido llamada con la url correcta
        expect(consoleErrorSpy).toHaveBeenCalledWith( // que el error se mostró por consola
            "Hubo un problema con la operación fetch: ",
            networkError
        );

        consoleErrorSpy.mockRestore();
    });

    it('should throw an error if the HTTP response is not OK (e.g., 404).', async () => {
        const errorStatus = 404;
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        (global.fetch as any).mockResolvedValue({
            ok: false,
            status: errorStatus,
        } as unknown as Response);

        const result = await getJoke(API_URL);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Hubo un problema con la operación fetch: ",
            new Error(`Error HTTP: ${errorStatus}`) 
        );

        consoleErrorSpy.mockRestore();
    });    
})

