import axiosInstance from "@/api/axiosInstance";
import useSSEStore from "@/store/connectionStore";
import { useNotificationStore } from "@/store/notificationStore";
let eventSource = null;
let retryCount = 0; // 재연결 횟수 제한

export const connectSSE = ({ roleType, userId, onOpen, onMessage, onError }) => {
  const { setSSESource, closeSSE } = useSSEStore.getState();

  let eventSource = useSSEStore.getState().sseSource;
  if (eventSource) {
    eventSource.close();
  }

  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("토큰이 없습니다. 다시 로그인하세요.");
    return;
  }

  const url = `https://www.beautymeongdang.com/notifications/connect?userId=${userId}&roleType=${roleType}&token=${encodeURIComponent(token)}`;
  eventSource = new EventSource(url);

  eventSource.onopen = () => {
    console.log("SSE 연결 성공");
    setSSESource(eventSource);
    retryCount = 0; // 재연결 횟수 초기화
    if (onOpen) onOpen();
  };

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("SSE 메시지 수신:", data);
      if (onMessage) onMessage(data);
    } catch (error) {
      console.error("잘못된 SSE 메시지:", event.data);
    }
  };

  eventSource.onerror = () => {
    console.error("SSE 연결 오류 발생. 다시 연결 시도 중...");
    if (eventSource) {
      eventSource.close();
    }

    retryCount += 1;
    if (retryCount <= 5) {
      setTimeout(() => connectSSE({ roleType, userId, onOpen, onMessage, onError }), 5000);
    } else {
      console.error("SSE 재연결 시도 초과");
      closeSSE();
      if (onError) onError();
    }
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
