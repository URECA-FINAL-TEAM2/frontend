import React, { useState, useEffect, useRef } from "react";
import {
  clearNotifications,
  connectSSE,
  deleteNotification,
  getNotification,
  getUnreadNotificationCount
} from "@/queries/notificationQuery";
import useAuthStore from "@/store/authStore";
import SubHeader from "@/components/common/SubHeader";
import { GoDotFill } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { useNotificationStore } from "@/store/notificationStore";

const Notification = () => {
  const updateUnreadCount = useNotificationStore((state) => state.updateUnreadCount);
  const { id, DefaultRole } = useAuthStore();
  const userId = id.userId;
  const roleType = DefaultRole;
  const [notifications, setNotifications] = useState([]);
  const sseSource = useRef(null);

  // SSE 연결
  const connectSse = () => {
    if (sseSource.current) {
      sseSource.current.close();
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    const url = `https://www.beautymeongdang.com/notifications/connect?userId=${userId}&roleType=${roleType}&token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(url);

    // const eventSource = connectSSE(roleType, userId);

    eventSource.onopen = () => {
      fetchNotifications();
      fetchUnreadNotificationCount();
    };

    eventSource.onmessage = (event) => {
      console.log("새로운 이벤트 발생", event);
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
      updateUnreadCount((prev) => prev + 1);
    };

    eventSource.onerror = () => {
      console.error("SSE 연결 오류. 다시 연결 시도 중...");
      if (sseSource.current) {
        sseSource.current.close();
      }
      setTimeout(connectSse, 5000);
    };

    sseSource.current = eventSource;
  };

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      const response = await getNotification(roleType, userId);
      setNotifications(response);
    } catch (error) {
      console.error("알림 조회 중 오류:", error);
    }
  };

  // 알림 개수 가져오기
  const fetchUnreadNotificationCount = async () => {
    try {
      const response = await getUnreadNotificationCount(roleType, userId);
      updateUnreadCount(response);
    } catch (error) {
      console.error("알림 개수 조회 중 오류:", error);
    }
  };

  // 개별 알림 삭제
  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(roleType, userId, notificationId);
      setNotifications((prev) => prev.filter((noti) => noti.id !== notificationId));
      updateUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("알림 삭제 중 오류:", error);
    }
  };

  const handleClear = async () => {
    try {
      await clearNotifications(roleType, userId);
      setNotifications([]);
      updateUnreadCount(0);
    } catch (error) {
      console.error("알림 삭제 중 오류:", error);
    }
  };

  useEffect(() => {
    connectSse();
    fetchUnreadNotificationCount();
    fetchNotifications();

    return () => {
      if (sseSource.current) {
        sseSource.current.close();
      }
    };
  }, []);

  return (
    <div id="notification-container" className="notification-container">
      <SubHeader title={"알림"} />
      <div className="mx-auto mt-[80px] w-11/12">
        <div className="mx-auto flex w-11/12 justify-end">
          <button className="flex items-center text-xs" onClick={handleClear}>
            전체삭제
            <GoTrash size={11} className="ml-1" />
          </button>
        </div>
        {notifications.map((noti) => (
          <div className="my-3 rounded-xl border border-main-100 bg-white p-4 shadow-md" key={noti.id}>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 rounded-2xl bg-main-200 px-2 py-[0.5px] text-[9px] text-main-500">
                  {noti.notifyType}
                </span>
                <span className="ml-auto text-right text-xs text-gray-400">
                  {new Date(noti.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 inline-flex items-center">
                <GoDotFill color={noti.readCheckYn ? "white" : "red"} size={25} />
                <span className="ml-1 text-sm font-semibold text-gray-900">{noti.content}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="ml-5 text-xs text-gray-500">견적 내용을 자세히 확인해보세요.</p>
                <button onClick={() => handleDelete(noti.id)}>
                  <GoTrash color="red" size={13} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Notification;
