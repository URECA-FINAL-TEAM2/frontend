/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#000000",
        main: {
          DEFAULT: "#FF8E8E",
          100: "#FFF3F3", // subcolor 3
          200: "#FFDCDC", // subcolor 2
          300: "#FFAEAE", // subcolor 1
          400: "#FF8E8E" // default 색상과 동일
        },
        gray: {
          100: "#FAFAFA", // button, background
          200: "#F5F5F5", // badge background
          300: "#AAAAAA" // dark button
        }
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
