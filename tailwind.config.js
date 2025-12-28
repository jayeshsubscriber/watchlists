/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        upstox: {
          purple: '#6C3FB5',
          'purple-dark': '#5A2E9C',
          green: '#00C48C',
          red: '#FF6B6B',
          'bg-light': '#F5F5F5',
          'bg-dark': '#1A1A1A'
        }
      }
    },
  },
  plugins: [],
}
