import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 1337,
    host: true,
    allowedHosts: true,
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: {
        replaceAttrValues: {
          white: 'currentColor',
          '#0098EA': 'currentColor',
        },
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
