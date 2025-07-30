import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        brightGrotesk: ['var(--font-brightGrotesk)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
