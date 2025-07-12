/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'typewriter': 'typewriter 2s steps(11) infinite alternate',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
      }
    },
  },
  plugins: [],
}

