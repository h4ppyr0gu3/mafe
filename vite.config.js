import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    devtools({autoname: true}),
    solidPlugin(),
    { 
      ...eslint(),
      apply: 'build',
    },
    { 
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post'
    }
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
});
