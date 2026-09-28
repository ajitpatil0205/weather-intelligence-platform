/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        command: {
          darkest: '#070d19',
          navy: '#0b132b',
          card: '#111d38',
          border: '#1e293b',
          accent: '#0284c7',
          cyan: '#06b6d4',
          highlight: '#38bdf8'
        }
      }
    },
  },
  plugins: [],
}
