import { create } from "zustand";

const useRegionStore = create((set) => ({
  sidoName: "",
  sigunguName: "",

  // 지역 정보 업데이트
  setRegion: (newSidoName, newSigunguName) =>
    set({
      sidoName: newSidoName,
      sigunguName: newSigunguName
    }),

  // 지역 정보 초기화
  clearRegion: () => set({ sidoName: "", sigunguName: "" })
}));

export default useRegionStore;
