import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      defaultRole: null,
      id: { customer: null, groomer: null },
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setDefaultRole: (role) => set({ role }),
      clearAuth: () => set({ accessToken: null, user: null })
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage
    }
  )
);

export default useAuthStore;
