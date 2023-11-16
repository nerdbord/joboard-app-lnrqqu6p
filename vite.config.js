import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   base: '/joboard-app-lnrqqu6p/',
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './tests/setup.ts'
   },
});
