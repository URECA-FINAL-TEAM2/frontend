import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  unreadCount: 0, // 읽지 않은 알림 수
  updateUnreadCount: (count) => set({ unreadCount: count })
}));
