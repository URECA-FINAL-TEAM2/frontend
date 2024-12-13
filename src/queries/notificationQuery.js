import axiosInstance from "@/api/axiosInstance";

// SSE 연결
export const connectSSE = () => {
  const token = localStorage.getItem("accessToken"); // 토큰 가져오기
  console.log("token", token);
  console.log("Encoded Token:", encodeURIComponent(token));
  const userId = 28;
  const roleType = "groomer";

  // 쿼리 파라미터로 토큰 포함
  // const url = `https://www.beautymeongdang.com/notifications/connect?userId=${userId}&roleType=${roleType}&token=${encodeURIComponent(token)}`;
  const url = `https://www.beautymeongdang.com/notifications/connect?userId=${userId}&roleType=${roleType}&token=${token}`;
  console.log("SSE 연결 URL:", url);

  const eventSource = new EventSource(url);

  // SSE 이벤트 처리
  eventSource.onopen = () => {
    console.log("SSE 연결이 열렸습니다.");
  };

  eventSource.onmessage = (event) => {
    console.log("SSE 데이터 수신:", event.data);
  };

  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류:", error);
    eventSource.close();
  };

  return eventSource;
};

// 알림 조회
export const getNotification = async (roleType, userId) => {
  try {
    const response = await axiosInstance.get("/notifications", {
      params: { userId, roleType }
    });
    return response.data.data;
  } catch (error) {
    console.error("알림 조회 실패:", error);
    throw error;
  }
};

// 읽지않은 알림 개수 조회
export const getUnreadNotificationCount = async (roleType, userId) => {
  try {
    const response = await axiosInstance.get("/notifications/unread-count", {
      params: { userId, roleType }
    });
    console.log("안읽은알림개수", response.data.unreadCount);
    return response.data.unreadCount;
  } catch (error) {
    console.error("읽지않은 알림 개수 조회 실패:", error);
    throw error;
  }
};

// 특정 알림 삭제
export const deleteNotification = async (roleType, userId, notificationId) => {
  try {
    const response = await axiosInstance.delete(`/notifications/${notificationId}`, {
      params: { userId, roleType }
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("특정 알림 삭제 실패:", error);
    throw error;
  }
};

// 전체 알림 삭제
export const clearNotifications = async (roleType, userId) => {
  try {
    const response = await axiosInstance.delete("/notifications", {
      params: { userId, roleType }
    });
    return response.data;
  } catch (error) {
    console.error("전체 알림 삭제 실패:", error);
    throw error;
  }
};
