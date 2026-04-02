/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iyya: {
          peach: '#FFDAB9',
          lightblue: '#ADD8E6',
          lightpink: '#FFB6C1',
          lightgreen: '#90EE90',
          purple: '#E6E6FA',
          slate: '#F8FAFC',
          text: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
