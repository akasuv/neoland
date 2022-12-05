const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindMdBase = require("@geoffcodesthings/tailwind-md-base");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans],
        hubot: ["Hubot Sans"],
      },
    },
  },
  plugins: [require("preline/plugin"), tailwindMdBase()],
};
