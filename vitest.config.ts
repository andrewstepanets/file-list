/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

// Vitest-specific configuration
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
