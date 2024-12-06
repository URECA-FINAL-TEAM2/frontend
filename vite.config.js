import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // 코드를 자동으로 분리하지 않음
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // src 디렉토리를 별칭으로 설정
    }
  },
  server: {
    historyApiFallback: true // SPA 라우팅 지원
  }
};
