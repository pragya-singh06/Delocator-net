/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to look in your components!
  ],
  theme: {
    extend: {
      colors: {
        'delocator-green': '#1d6331',
      }
    },
  },
  plugins: [],
}