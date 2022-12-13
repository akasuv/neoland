const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
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
    markdownBase: {
      code: {
        backgroundColor: colors.gray["600"],
        borderRadius: defaultTheme.borderRadius.sm,
        color: colors.gray["100"],
      },
      blockquote: {
        color: colors.gray["300"],
      },
    },
    extend: {
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans],
        hubot: ["Hubot Sans"],
      },
    },
  },
  plugins: [require("preline/plugin"), tailwindMdBase()],
};
