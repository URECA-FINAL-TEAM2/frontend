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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        // 하단바 스타일
        ".bottom": {
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          "justify-content": "space-between",
          height: "50px"
        },
        ".bottom-active": {
          color: "#FF8E8E",
          "font-weight": "bold"
        },
        // form style
        ".labelStyle": {
          display: "block",
          fontSize: "1.125rem",
          color: "#FF8E8E",
          width: "75%",
          marginLeft: "auto",
          marginRight: "auto"
        },
        ".inputStyle": {
          paddingBottom: "7px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "1.8rem",
          marginTop: "0.25rem",
          display: "block",
          width: "75%",
          borderWidth: "1px",
          borderBottom: "2px solid #FF8E8E",

          color: "F5F5F5"
        }
      });
    }
  ]
};
