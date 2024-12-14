import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  unreadCount: 0, // 읽지 않은 알림 갯수
  notifications: [], // 알림 목록

  updateUnreadCount: (count) => set({ unreadCount: count })
}));
