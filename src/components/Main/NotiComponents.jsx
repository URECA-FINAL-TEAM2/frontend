import {
  clearNotifications,
  deleteNotification,
  getNotification,
  getUnreadNotificationCount
} from "@/queries/notificationQuery";
import useAuthStore from "@/store/authStore";
import { useEffect, useRef, useState } from "react";
import { VscBell } from "react-icons/vsc";
import { GoTrash, GoDotFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const NotiComponents = () => {
  const { id, DefaultRole } = useAuthStore();
  const userId = id.userId;
  const roleType = DefaultRole;

  // 상태 관리
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sseSource = useRef(null);

  // 사이드바 열고 닫기
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

    eventSource.onmessage = (event) => {
      console.log("새 알림:", event.data);
      const newNotification = JSON.parse(event.data);

      // 알림 목록 및 개수 업데이트
      setNotifications((prev) => [...prev, newNotification]);
      setUnreadCount((prev) => prev + 1);
    };

    eventSource.onerror = () => {
      console.error("SSE 연결 오류. 다시 연결 시도 중...");
      eventSource.close();
      setTimeout(connectSse, 5000); // 5초 후 재연결
    };

    sseSource.current = eventSource;
  };

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      const response = await getNotification(roleType, userId);
      if (!Array.isArray(response)) {
        throw new Error("응답 데이터가 배열이 아닙니다.");
      }
      setNotifications(response);
    } catch (error) {
      console.error("알림 조회 중 오류:", error);
    }
  };

  // 읽지 않은 알림 개수 가져오기
  const fetchUnreadNotificationCount = async () => {
    try {
      const response = await getUnreadNotificationCount(roleType, userId);
      if (typeof response !== "number") {
        throw new Error("응답 데이터가 숫자가 아닙니다.");
      }
      setUnreadCount(response);
    } catch (error) {
      console.error("알림 개수 조회 중 오류:", error);
    }
  };

  // 개별 알림 삭제
  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(roleType, userId, notificationId);
      setNotifications((prev) => prev.filter((noti) => noti.id !== notificationId));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("알림 삭제 중 오류:", error);
    }
  };

  // 전체 알림 삭제
  const handleClear = async () => {
    try {
      await clearNotifications(roleType, userId);
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("알림 삭제 중 오류:", error);
    }
  };

  // 컴포넌트가 마운트되었을 때 SSE 연결
  useEffect(() => {
    connectSse();
    fetchNotifications();
    fetchUnreadNotificationCount();

    return () => {
      if (sseSource.current) {
        console.log("SSE 연결 종료");
        sseSource.current.close();
      }
    };
  }, [roleType, userId]);

  const [filterType, setFilterType] = useState("all"); // "all" 또는 "unread"

  // 알림 필터링
  const filteredNotifications =
    filterType === "unread"
      ? notifications.filter((noti) => !noti.readCheckYn) // 읽지 않은 알림만
      : notifications; // 전체 알림

  return (
    <div className="relative">
      {unreadCount > 0 ? (
        <div onClick={toggleSidebar} className="relative cursor-pointer">
          <VscBell size={28} />
          <div className="absolute -right-0 -top-1 rounded-2xl bg-[#ff8e8e] px-[0.4em] py-[0.1px] text-[10px] text-white">
            {unreadCount}
          </div>
        </div>
      ) : (
        <div onClick={toggleSidebar} className="cursor-pointer">
          <VscBell size={28} />
        </div>
      )}

      {/* 사이드바 */}
      {isSidebarOpen && (
        <div className="absolute right-0 top-0 h-[95vh] w-[360px] overflow-y-scroll rounded-xl bg-white shadow-2xl">
          <div className="relative">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="mr-2 text-lg font-semibold">알림</h2>
                  <button className="flex items-center rounded-2xl text-[10px]" onClick={handleClear}>
                    <GoTrash size={10} className="mr-1" />
                    <span className="text-[10px]">전체삭제</span>
                  </button>
                </div>
                <button onClick={toggleSidebar} className="text-gray-500 hover:text-black">
                  <IoCloseOutline />
                </button>
              </div>

              <div className="mt-2 flex text-[10px]">
                <button
                  onClick={() => setFilterType("all")}
                  className="mr-2 rounded-2xl border border-main-200 px-2 py-1 shadow-sm"
                >
                  전체 알림 ({notifications.length})
                </button>
                <button
                  onClick={() => setFilterType("unread")}
                  className="rounded-2xl border border-main-200 px-2 py-1 shadow-sm"
                >
                  읽지 않은 알림 ({unreadCount})
                </button>
              </div>

              <div className="mx-auto">
                <div className="mx-auto flex justify-end"></div>
                {filteredNotifications.map((noti) => (
                  <div className="my-3 rounded-xl border border-main-100 bg-white p-4" key={noti.id}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotiComponents;
