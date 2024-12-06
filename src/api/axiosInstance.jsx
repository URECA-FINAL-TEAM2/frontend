import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.beautymeongdang.com",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// 요청 인터셉터 : 헤더에 토큰 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
