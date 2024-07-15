import defaultTheme from 'tailwindcss/defaultTheme';

// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Space Mono"', 'sans-serif'],
        display: ['"Neuton"', 'serif'],
        sans: ['"Space Mono"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        main: '3fr 1fr',
        mainFullscreen: '1fr 0fr',
      }
    },
  },
  plugins: [],
}

