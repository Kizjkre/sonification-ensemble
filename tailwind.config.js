import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        body: ['"Space Mono"', 'sans-serif'],
        display: ['"Neuton"', 'serif'],
        sans: ['"Space Mono"', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        explorer: 'repeat(auto-fill, minmax(15%, 1fr))'
      },
      gridTemplateRows: {
        main: '75% 25%',
        mainFullscreen: '100% 25%'
      }
    }
  },

  plugins: [typography]
};
