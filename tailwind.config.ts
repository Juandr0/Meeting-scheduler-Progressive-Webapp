import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brown: {
        900: '#3e2a1c', // Brödtext
        800: '#5b3a29', // Rubrik + Footer
        700: '#7a5b43', // Sekundär nyans
      },
      yellow: {
        50: '#fdf9f4', // Body bakgrund
        100: '#f5ecd9', // Header/Footer
      },
      apricot: '#e6c3a5', // Accentfärg
      sage: '#bcd2c1', // Alternativ accent
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
  },

  plugins: [],
};

export default config;
