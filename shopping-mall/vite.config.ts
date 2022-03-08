import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactRouterPlugin } from 'vite-plugin-next-react-router';

// https://vitejs.dev/config/
console.log('vite.config.ts!!!');

export default defineConfig({
  plugins: [react(), reactRouterPlugin()],
});
