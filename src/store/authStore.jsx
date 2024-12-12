import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      DefaultRole: "guest", // guest, customer, groomer
      id: {
        customerId: null,
        groomerId: null
      },
      userInfo: {
        email: "",
        username: ""
      },

      // userInfo 업데이트
      updateUserInfo: (userData) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...userData }
        })),

      // DefaultRole 업데이트
      updateDefaultRole: (role) =>
        set({
          DefaultRole: role
        }),

      // id 업데이트
      updateId: (idData) =>
        set((state) => ({
          id: {
            ...state.id, // 기존 id 유지
            ...idData // 업데이트된 값 적용
          }
        })),

      // 로그인 상태 업데이트
      setLoginStatus: (status) =>
        set({
          isLoggedIn: status
        }),

      // 로그아웃: 상태 및 로컬 스토리지 초기화
      logout: () => {
        localStorage.clear(); // 로컬 스토리지 완전히 비우기
        set({
          isLoggedIn: false,
          DefaultRole: "guest",
          id: {
            customerId: null,
            groomerId: null
          },
          userInfo: {
            email: "",
            username: ""
          }
        });
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        DefaultRole: state.DefaultRole,
        id: state.id,
        userInfo: state.userInfo
      })
    }
  )
);

export default useAuthStore;
