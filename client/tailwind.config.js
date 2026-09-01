/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'dark-green': '#1F5A44',
          'med-green': '#4F8A68',
          'cream': '#F7F5EF',
          'white': '#FFFFFF',
          'earth': '#C69B63',
          'text-dark': '#1C2521',
          'text-muted': '#66706A',
          'light-green': '#E8F1EC',
          'cream-card': '#FAF8F3'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1280px',
        'article': '820px'
      }
    },
  },
  plugins: [],
}
