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
import { Link } from "react-router-dom";
import Modal from "../common/modal/modal";
import toast from "react-hot-toast";

const NotiComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, DefaultRole } = useAuthStore();
  const userId = id.userId;
  const roleType = DefaultRole;
  const [notifyLink, setNotifyLink] = useState("");
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
      const link = getNotifyLink(response[0].notifyType);
      setNotifyLink(link);
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
    setIsModalOpen(false);
    if (notifications.length) {
      try {
        await clearNotifications(roleType, userId);
        setNotifications([]);
        setUnreadCount(0);
        toast("알림이 모두 삭제되었습니다.", {
          icon: "👋🏻"
        });
      } catch (error) {
        console.error("알림 삭제 중 오류:", error);
      }
    } else {
      toast("삭제할 알림이 없습니다.", {
        icon: "❌"
      });
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

  // 역할 및 알림 타입에 따른 링크 설정
  const getNotifyLink = (type) => {
    const basePath = roleType === "groomer" ? "/groomer" : "/customer";

    switch (type) {
      case "예약 알림":
      case "예약 취소 알림":
        return `${basePath}/reservation`;
      case "견적서 알림":
      case "견적서 요청 알림":
        return `${basePath}/quotes`;
      case "리뷰 알림":
        return `${basePath}/store`;
      case "채팅방 생성 알림":
        return `${basePath}/chat`;
      default:
        return `${basePath}/home`; // 기본 경로
    }
  };

  const [filterType, setFilterType] = useState("all"); // "all" 또는 "unread"

  // 알림 필터링
  const filteredNotifications =
    filterType === "unread"
      ? notifications.filter((noti) => !noti.readCheckYn) // 읽지 않은 알림만
      : notifications; // 전체 알림

  return (
    <div className="">
      {unreadCount > 0 ? (
        <div onClick={toggleSidebar} className="relative cursor-pointer">
          <VscBell size={23} />
          <div className="absolute -right-0 -top-1 rounded-2xl bg-[#ff8e8e] px-[0.4em] py-[0.1px] text-[10px] text-white">
            {unreadCount}
          </div>
        </div>
      ) : (
        <div onClick={toggleSidebar} className="cursor-pointer">
          <VscBell size={23} />
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="min-h-screen w-[400px] overflow-y-scroll rounded-xl bg-white shadow-2xl">
            <div>
              {/* 헤더 */}
              <div className="grid h-[var(--header-height)] w-[400px] grid-cols-[1fr_2fr_1fr] items-center bg-white px-5 text-center">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-start">
                  <GoTrash size={13} className="mr-1" />
                  <span className="text-[10px]">전체 삭제</span>
                </button>

                <span className="text-lg">알림</span>
                <div className="text-end">
                  <button onClick={toggleSidebar} className="text-end">
                    <IoCloseOutline size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex px-5 text-xs">
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
                  <div className="my-3 block rounded-xl bg-white p-4 px-6" key={noti.id}>
                    <div className="flex flex-col">
                      <Link to={notifyLink} className="flex items-center">
                        <span className="mr-2 rounded-2xl bg-main-200 px-2 py-[0.5px] text-[9px] text-main-500">
                          {noti.notifyType}
                        </span>
                        <span className="ml-auto text-right text-xs text-gray-400">
                          {new Date(noti.createdAt).toLocaleString()}
                        </span>
                      </Link>
                      <Link to={notifyLink} className="mt-1 inline-flex items-center">
                        <GoDotFill color={noti.readCheckYn ? "white" : "red"} size={25} />
                        <span className="ml-1 text-sm font-semibold text-gray-900">{noti.content}</span>
                      </Link>
                      <div className="mt-1 flex items-center justify-between">
                        <Link to={notifyLink} className="ml-5 text-xs text-gray-500">
                          견적 내용을 자세히 확인해보세요.
                        </Link>
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClear}
        closeText="닫기"
        confirmText="확인"
      >
        알림을 전체 삭제하시겠습니까?
      </Modal>
    </div>
  );
};

export default NotiComponents;
