/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bone: '#F4F2ED',
        sand: { DEFAULT: '#E9E5DB', dark: '#D6D0C1' },
        ink: { DEFAULT: '#14171F', soft: '#3A3F4B', muted: '#6B6F7B', faint: '#9A9DA8' },
        brand: { DEFAULT: '#1F3FA8', dark: '#152C78', light: '#E6EAF7' },
        accent: { DEFAULT: '#C0801E', dark: '#8A5A12', light: '#F8EFDC' },
      },
    },
  },
  plugins: [],
};
