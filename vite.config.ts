import { readFileSync } from 'fs';
// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [viteBasicSslPlugin(), sveltekit()],
  // REF: https://stackoverflow.com/a/72141502
  define: {
    meta: { version: JSON.parse(readFileSync('package.json', 'utf8')).version }
  },
  // REF: https://stackoverflow.com/a/75839023
  build: {
    target: 'esnext'
  }
});
