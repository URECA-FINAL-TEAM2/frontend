import axiosInstance from "@/api/axiosInstance";

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

// 알림 읽음 처리
export const readNotification = async (notificationId) => {
  try {
    const response = await axiosInstance.put("/notifications", {
      params: { notificationId }
    });
    return response.data;
  } catch (error) {
    console.error("알림 읽음 처리 실패:", error);
    throw error;
  }
};
