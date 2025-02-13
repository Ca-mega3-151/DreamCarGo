import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cacheV1_ramda: ['ramda'],
          cacheV1_antd: ['antd'],
          'cacheV1_@ant-design/iconsV1': ['@ant-design/icons'],
        },
      },
    },
  },

  server: {
    port: 8080,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },
});
