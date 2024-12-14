import { create } from "zustand";

export const useToastStore = create((set) => ({
  toastMessage: null,
  toastIcon: null,
  setToast: (message, icon) => set({ toastMessage: message, toastIcon: icon }),
  clearToast: () => set({ toastMessage: null, toastIcon: null })
}));
