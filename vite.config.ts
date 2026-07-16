import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        evolution: path.resolve(__dirname, 'evolution.html'),
        clientTools: path.resolve(__dirname, 'client-tools.html'),
        modelBoundaries: path.resolve(__dirname, 'model-boundaries.html'),
      },
    },
  },
});
