import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://www.beautymeongdang.com",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Refresh Token Lock: 중복 Refresh 방지 변수
let isRefreshing = false;
let refreshSubscribers = [];

// Refresh Token 성공 시 모든 구독된 요청 재시도
const onRrefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Request Interceptor: 요청에 Access Token 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState(); // Zustand에서 Access Token 가져오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 401 에러 시 Refresh Token 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { refreshToken, setAccessToken } = useAuthStore.getState();

          // Refresh Token으로 Access Token 갱신
          const { data } = await axios.post("https://beautymeongdang.duckdns.org/auth/refresh-token", {
            refresh_token: refreshToken
          });

          const newAccessToken = data.access_token;

          // 상태 업데이트
          setAccessToken(newAccessToken);

          // 모든 대기 요청에 새로운 토큰 전달
          onRrefreshed(newAccessToken);

          isRefreshing = false;
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          // Refresh 실패 시 로그아웃 처리
          const { clearAuth } = useAuthStore.getState();
          clearAuth();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // Refresh Token 요청 대기
      return new Promise((resolve) => {
        refreshSubscribers.push((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
