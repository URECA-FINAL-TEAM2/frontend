/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,jsx,ts,tsx}" // shadcn/ui 경로 추가
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#000000",
        main: {
          100: "#FFF3F3",
          200: "#FFDCDC",
          300: "#FFAEAE",
          400: "#FF8E8E",
          500: "#FC7272",
          600: "#F25A5A",
          DEFAULT: "#FF8E8E"
        },
        gray: {
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#AAAAAA"
        }
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"]
      },
      scale: {
        103: "1.03"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
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
          height: "45px",
          color: "#c3c3c3",
          padding: "2px"
        },
        ".bottom-active": {
          color: "#FF8E8E",
          "font-weight": "bold",
          padding: 0
        },
        // form style
        ".labelStyle": {
          display: "block",
          fontSize: "0.8rem",
          color: "#FF8E8E",
          width: "75%",
          marginLeft: "auto",
          marginRight: "auto"
        },
        ".inputStyle": {
          paddingBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "1.5rem",
          marginTop: "0.25rem",
          display: "block",
          width: "75%",
          borderBottom: "1px solid #FFAEAE",
          color: "F5F5F5"
        },
        // 공통 컴포넌트 bottom
        ".bottomButtonPink": {
          backgroundColor: "#FF8E8E",
          color: "white",
          width: "400px",
          height: "60px",
          fontSize: "1.2rem",
          position: "fixed",
          bottom: "0",
          borderRadius: "10px 10px 0 0",
          transition: "all 300ms"
        },
        // 박스 내부 버튼
        ".buttonInBox-main": {
          color: "#FF8E8E",
          width: "48%",
          backgroundColor: "#FFDCDC",
          borderRadius: "8px",
          padding: "3px",
          margin: "3px"
        },
        ".buttonInBox-sub": {
          color: "white",
          width: "48%",
          backgroundColor: "#FF8E8E",
          borderRadius: "8px",
          padding: "3px",
          margin: "3px"
        },
        ".img-border": {
          borderRadius: "50%",
          border: "1px solid #FF8E8E"
        },
        ".editInput": {
          marginRight: "0.25rem",
          flexGrow: 1,
          backgroundColor: "#eee",
          padding: "0.25rem",
          color: "#000000"
        }
      });
    },
    tailwindcssAnimate,
    tailwindScrollbarHide
  ]
};
