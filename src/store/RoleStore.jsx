import { create } from "zustand";

const useRoleStore = create((set) => ({
  role: localStorage.getItem("DefaultRole") || "customer",
  setRole: (newRole) => {
    localStorage.setItem("DefaultRole", newRole);
    set({ role: newRole });
  }
}));

export default useRoleStore;
