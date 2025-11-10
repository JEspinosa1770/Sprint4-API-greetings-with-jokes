import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', 
  },
  base: '/Sprint4-API-greetings-with-jokes/'
});