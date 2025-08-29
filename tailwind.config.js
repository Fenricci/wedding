/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        wedding: ['MyWeddingFont', 'serif'],
        calendar: ['MyCalendarFont', 'sans-serif'],
        title: ['CalendarTitleFont', 'serif']
      },
    },
  },
  plugins: [],
}