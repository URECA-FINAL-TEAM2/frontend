import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

// Request Interceptors : 요청 인터셉터
// 클라이언트 -> 서버 모든 요청시 Authorization 헤더에 Access Token 포함해서 보냄
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Intercepters : 응답 인터셉터
// Access Token 만료 시 Refresh Token을 사용해 갱신, 또는 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refresh_token");
      try {
        const { data } = await axios.post("/auth/refresh-token", { refresh_token: refreshToken });

        sessionStorage.setItem("access_token", data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
