import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
    // 'Authorization': `Bearer ${yourToken}`
  }
});

// 요청, 응답 인터셉터

export default axiosInstance;
