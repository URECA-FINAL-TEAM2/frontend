import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // src 디렉토리를 별칭으로 설정
    }
  }
};
