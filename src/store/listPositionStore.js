import { create } from "zustand";

const useListPositionStore = create((set) => ({
  listPosition: 60,
  setListPosition: (listPosition) => set({ listPosition })
}));

export default useListPositionStore;
