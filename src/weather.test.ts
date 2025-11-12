import { describe, it, expect, vi } from 'vitest'
import { getWeather } from './weather';

describe('Function "getWeather"', () => {
    global.fetch = vi.fn();
    it('should be declared', () => {
        expect(typeof getWeather).toBe('function');
    });

    it('should detect a fecth error or network error', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error("Fallo de conexión simulado")))
        await expect(getWeather()).rejects.toThrow("Fallo de conexión simulado");
    });

    it('should throw an error if the HTTP response is not OK (e.g., 404).', async () => {
        const errorStatus = 404;
        (global.fetch as any).mockResolvedValue({
            ok: false,
            status: errorStatus,
        } as unknown as Response);

        await expect(getWeather()).rejects.toThrow(`Error HTTP: ${errorStatus}`);
    });    
})