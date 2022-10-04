/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],

    plugins: [require("daisyui")],
    theme: {
        colors: {
            'background-yellow': '#FAF0E4',
            'blue': '#5A7ED4',
            'orange': '#D78F41',
            'yellow': '#E9C273',
            'grey': '#D9D9D9',
        },
        fontFamily: {
          sans: ['Graphik', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
    }
  }