import { describe, it, expect, vi } from 'vitest'
import { voteJoke } from './vote-joke';
import * as Utils from './utils'

describe('Function "voteJoke"', () => {
    const haveVotedMessageSpy = vi.spyOn(Utils, 'haveVotedMessage').mockImplementation(() => {});
    it('should be declared', () => {
        expect(typeof voteJoke).toBe('function');
    });

    it('should return true if the data are correctly saved', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const resultTrue = voteJoke("ok", 2)
        expect(resultTrue).toBeTruthy();
        expect(consoleErrorSpy).not.toHaveBeenCalled();
        expect(haveVotedMessageSpy).toHaveBeenCalledWith(true);
    });

    it('should return false if there are an error', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const expectedError = new Error("Error en grabación de datos");
        const resultFalse = voteJoke("", 2)
        expect(resultFalse).toBeFalsy();
        expect(consoleErrorSpy).toHaveBeenCalledWith("Hubo un problema: ", expectedError);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
})

