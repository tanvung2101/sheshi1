/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "regal-red": "#be3544",
        "light-pink": "#fdf2ec",
        "small-font-color": "#616260",
      },
      animation: {
        "spin-slow": "linear 2s alternate",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "-translateY(50px)" },
          "50%": { transform: "-translateY(30px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
