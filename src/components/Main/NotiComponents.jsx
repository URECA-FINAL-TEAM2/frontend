import {
  clearNotifications,
  deleteNotification,
  getNotification,
  getUnreadNotificationCount,
  readNotification
} from "@/queries/notificationQuery";
import useAuthStore from "@/store/authStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { VscBell } from "react-icons/vsc";
import { GoTrash, GoDotFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal/modal";
import toast from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";
import useNotificationStore from "@/store/notificationStore";

const NotiComponents = () => {
  const { notifications, setNotifications, unreadCount, setUnreadCount, addNotification } = useNotificationStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, DefaultRole } = useAuthStore();
  const userId = id.userId;
  const roleType = DefaultRole;
  const [notifyLink, setNotifyLink] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sseSource = useRef(null);

  // 사이드바 열고 닫기
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      Promise.all([fetchNotifications(), fetchUnreadNotificationCount()]);
    }
  };

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      const response = await getNotification(roleType, userId);
      console.log("알림 목록 조회", response);
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

  const [filterType, setFilterType] = useState("all"); // "all" 또는 "unread"

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

  useEffect(() => {
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
    console.log("링크 설정", type);
    switch (type) {
      case "예약 알림":
      case "예약 취소 알림":
        return `${basePath}/reservation`;
      case "견적서 알림":
      case "견적서 요청 알림":
      case "견적서 요청 거절 알림":
        return `${basePath}/quotes`;
      case "리뷰 알림":
        return `${basePath}/store`;
      case "채팅방 생성 알림":
        return `${basePath}/chat`;
      default:
        return `${basePath}/home`; // 기본 경로
    }
  };

  // 알림 읽음 처리
  const showNotificationDetail = async (notificationId, notifyType) => {
    try {
      const response = await readNotification(roleType, userId, notificationId);
      console.log(response);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, readCheckYn: true } : notification
        )
      );
      const link = getNotifyLink(notifyType);
      navigate(link);
      toggleSidebar();
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  // 개별 알림 삭제
  const handleDelete = async (notificationId) => {
    // UI 업데이트 먼저 처리
    const updatedNotifications = notifications.filter((noti) => noti.id !== notificationId);
    setNotifications(updatedNotifications);
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      // 백엔드 요청
      await deleteNotification(roleType, userId, notificationId);
    } catch (error) {
      console.error("알림 삭제 중 오류:", error);

      // 요청 실패 시 알림 복구
      const deletedNotification = notifications.find((noti) => noti.id === notificationId);
      if (deletedNotification) {
        setNotifications((prev) => [...prev, deletedNotification]);
      }
      toast.error("알림 삭제에 실패했습니다.");
    }
  };

  //  알림 필터링
  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(notifications)) return []; // `notifications`가 배열이 아닌 경우 빈 배열 반환

    const filtered =
      filterType === "unread"
        ? notifications.filter((noti) => !noti.readCheckYn) // 읽지 않은 알림만 필터링
        : notifications; // 전체 알림

    return filtered.sort((a, b) => {
      // 1. readCheckYn 기준 정렬 (읽지 않은 알림이 먼저 오도록)
      if (a.readCheckYn !== b.readCheckYn) {
        return a.readCheckYn ? 1 : -1; // false가 앞쪽, true가 뒤쪽
      }
      // 2. createdAt 기준 정렬 (최신 날짜가 먼저 오도록)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [notifications, filterType]);

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
        <div className="z-70 fixed left-0 right-0 top-0 flex items-center justify-center">
          <div className="min-h-screen w-[400px] overflow-y-scroll rounded-xl bg-white shadow-2xl scrollbar-hide">
            <div className="pb-[80px]">
              {/* 헤더 */}
              <div className="grid h-[var(--header-height)] w-[400px] grid-cols-[1fr_2fr_1fr] items-center bg-white px-5 text-center">
                <div></div>
                <span className="mt-3 text-lg">
                  <span>알림</span>
                  <div className="flex items-center justify-center text-xs text-gray-300">
                    <IoIosInformationCircleOutline className="mr-1" />
                    알림은 2주 뒤 자동 삭제됩니다.
                  </div>
                </span>

                <div className="text-end">
                  <button onClick={toggleSidebar} className="text-end">
                    <IoCloseOutline size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between px-6 text-xs">
                <div>
                  <button
                    onClick={() => setFilterType("all")}
                    className="mr-2 rounded-2xl border border-main-200 px-2 py-1 shadow-sm"
                  >
                    전체 알림
                  </button>
                  <button
                    onClick={() => setFilterType("unread")}
                    className="rounded-2xl border border-main-200 px-2 py-1 shadow-sm"
                  >
                    읽지 않은 알림
                  </button>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-start text-[red]">
                  <GoTrash size={13} className="mr-1" />
                  <span className="text-[10px]">전체 삭제</span>
                </button>
              </div>

              <div className="mx-auto h-[100vh] overflow-y-scroll scrollbar-hide">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((noti) => (
                    <div className="my-3 block rounded-xl bg-white p-4 px-6" key={noti.id}>
                      <div className="flex flex-col">
                        <button
                          onClick={() => showNotificationDetail(noti.id, noti.notifyType)}
                          className="flex items-center"
                        >
                          <span className="mr-2 rounded-2xl bg-main-200 px-2 py-[0.5px] text-[9px] text-main-500">
                            {noti.notifyType}
                          </span>
                          <span className="ml-auto text-right text-xs text-gray-400">
                            {new Date(noti.createdAt).toLocaleString()}
                          </span>
                        </button>
                        <button
                          onClick={() => showNotificationDetail(noti.id, noti.notifyType)}
                          className="mt-1 inline-flex items-center"
                        >
                          <GoDotFill color={noti.readCheckYn ? "white" : "red"} size={15} />
                          <span className="ml-1 flex w-11/12 text-start text-sm font-semibold text-gray-900">
                            {noti.content}
                          </span>
                        </button>
                        <div className="mt-1 flex items-center justify-between text-start">
                          <button
                            onClick={() => showNotificationDetail(noti.id, noti.notifyType)}
                            className="ml-5 text-xs text-gray-500"
                          >
                            알림 내용을 자세히 확인해보세요.
                          </button>
                          <button onClick={() => handleDelete(noti.id)}>
                            <GoTrash color="red" size={13} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-8 text-center text-gray-500">알림이 없습니다.</div>
                )}
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
