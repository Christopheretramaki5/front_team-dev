/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Inter', 'sans-serif'], // Police moderne pour le texte général
        serif: ['Merriweather', 'serif'], // Police classique pour les titres
        mono: ['Fira Code', 'monospace'], // Police monospace pour le code ou les données techniques
        sans: ['Roboto', 'sans-serif'], // Définit Roboto comme police principale
      },
    },
  },
  plugins: [],
}
