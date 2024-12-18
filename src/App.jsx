import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import CustomerRoutes from "./Routes/CustomerRoutes";
import GroomerRoutes from "./Routes/GroomerRoutes";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Routes/PrivateRoutes";
import MypageBoth from "./pages/MypageBoth";
import Chat from "./pages/Chat/Chat";
import useAuthStore from "./store/authStore";
import useNotificationStore from "./store/notificationStore"; // Zustand 알림 스토어
import { useEffect, useRef } from "react";

function App() {
  const { isLoggedIn, DefaultRole, id } = useAuthStore();
  const { setNotifications, addNotification, setUnreadCount } = useNotificationStore();
  const sseSource = useRef(null);

  if (import.meta.env.MODE === "production") {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }

  useEffect(() => {
    const connectSse = () => {
      if (sseSource.current) {
        sseSource.current.close();
      }

      const token = localStorage.getItem("accessToken");
      if (!token || !id?.userId || !DefaultRole) return;

      const url = `https://www.beautymeongdang.com/notifications/connect?userId=${id.userId}&roleType=${DefaultRole}&token=${encodeURIComponent(token)}`;

      console.log("SSE 연결 URL:", url);

      const eventSource = new EventSource(url);
      eventSource.onopen = () => {
        console.log("SSE 연결이 열렸습니다.");
        console.log("readyState:", eventSource.readyState); // 1이면 OPEN 상태
      };

      eventSource.onmessage = (event) => {
        try {
          const newNotification = JSON.parse(event.data);
          console.log("새 알림:", newNotification);
          addNotification(newNotification);
        } catch (error) {
          console.error("SSE 데이터 파싱 실패:", error);
        }
      };

      const MAX_RETRY_COUNT = 3;
      const RETRY_DELAY = 5000;
      let retryCount = 0;

      eventSource.onerror = (error) => {
        console.error("SSE 연결 오류:", error);
        console.log("readyState:", eventSource.readyState);
        eventSource.close();
        if (retryCount < MAX_RETRY_COUNT) {
          retryCount++;
          setTimeout(connectSse, RETRY_DELAY * retryCount);
        } else {
          console.error("최대 재시도 횟수 초과");
        }
      };

      sseSource.current = eventSource;
    };

    connectSse();

    return () => {
      if (sseSource.current) {
        sseSource.current.close();
        console.log("SSE 연결 종료");
      }
    };
  }, [id?.userId, DefaultRole, addNotification]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/chat/:roomId" element={<Chat />} />
          <Route
            path="/customer/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} role="customer" userRole={DefaultRole}>
                <CustomerRoutes />
              </PrivateRoute>
            }
          />
          <Route
            path="/groomer/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} role="groomer" userRole={DefaultRole}>
                <GroomerRoutes />
              </PrivateRoute>
            }
          />
          <Route path="/customer/mypage" element={<MypageBoth />} />
          <Route path="/groomer/mypage" element={<MypageBoth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
