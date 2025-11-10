import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Esto activa el entorno JSDOM globalmente para todas tus pruebas
    environment: 'jsdom', 
  },
});