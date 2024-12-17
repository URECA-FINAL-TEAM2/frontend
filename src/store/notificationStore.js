// store/notificationStore.js
import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set({ notifications }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
      unreadCount: state.unreadCount + 1
    }))
}));

export default useNotificationStore;
