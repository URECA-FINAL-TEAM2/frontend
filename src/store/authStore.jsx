import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      userInfo: null,
      isLoggedIn: false,
      DefaultRole: "guest", // guest, customer, groomer

      updateUserInfo: (userData) =>
        set({
          userInfo: userData
        }),

      logout: () =>
        set({
          userInfo: null,
          isLoggedIn: false
        })
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ userInfo: state.userInfo, isLoggedIn: state.isLoggedIn })
    }
  )
);

export default useAuthStore;
