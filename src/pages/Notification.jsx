import React, { useState, useEffect, useRef } from "react";
import {
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

const Notification = () => {
  const { id, DefaultRole } = useAuthStore();
  const userId = id.userId;
  const roleType = DefaultRole;
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
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
    console.log("SSE 연결 URL:", url);

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
      fetchNotifications();
      fetchUnreadNotificationCount();
    };

    eventSource.onmessage = async (event) => {
      console.log("새 알림:", event.data);
      console.log(event.data);
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
      setUnreadCount((prev) => prev + 1);

      // 알림 목록 업데이트를 위해 새로 데이터 요청
      const response = fetchNotifications();
      setNotifications(response);
      console.log("업데이트된 알림 목록:", response);
    };

    eventSource.onerror = () => {
      console.error("SSE 연결 오류. 다시 연결 시도 중...");
      eventSource.close();
      setTimeout(connectSse, 5000); // 5초 후 재연결
    };

    sseSource.current = eventSource; // Ref에 저장
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
      console.log(response);
      setUnreadCount(response);
    } catch (error) {
      console.error("알림 개수 조회 중 오류:", error);
    }
  };

  // 개별 알림 삭제
  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(roleType, userId, notificationId);
      setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
      setUnreadCount((prev) => Math.max(0, prev - 1));
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
        {notifications.map((noti) => (
          <>
            <div className="my-3 rounded-xl border border-main-100 bg-white p-4 shadow-md" key={noti.id}>
              <div className="">
                <div className="flex flex-col">
                  {/* 알림 제목+날짜 */}
                  <div className="flex items-center">
                    <span className="mr-2 rounded-2xl bg-main-200 px-2 py-[0.5px] text-[9px] text-main-500">
                      {noti.notifyType}
                    </span>
                    <span className="ml-auto text-right text-xs text-gray-400">
                      {new Date(noti.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {/* 알림 내용 */}
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
            </div>
          </>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Notification;
