import { describe, it, expect, vi } from 'vitest'
import { getWeather } from './weather';

describe('Function "getWeather"', () => {
    global.fetch = vi.fn();
    it('should be declared', () => {
        expect(typeof getWeather).toBe('function');
    });

    it('should detect a fecth error or network error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const networkError = new Error("Fallo de conexión simulado");
        (global.fetch as any).mockRejectedValue(networkError);

        const result = await getWeather();

        expect(result).toBeUndefined(); 
        expect(consoleErrorSpy).toHaveBeenCalledWith( 
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

        const result = await getWeather();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Hubo un problema con la operación fetch: ",
            new Error(`Error HTTP: ${errorStatus}`) 
        );

        consoleErrorSpy.mockRestore();
    });    
})