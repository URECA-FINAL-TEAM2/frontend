import { create } from "zustand";

const useSSEStore = create((set, get) => ({
  sseSource: null, // SSE 인스턴스
  isConnected: false, // 연결 상태

  // SSE 연결 설정
  setSSESource: (source) => set({ sseSource: source, isConnected: true }),

  // SSE 연결 해제
  closeSSE: () => {
    const source = get().sseSource;
    if (source) {
      source.close();
      set({ sseSource: null, isConnected: false });
    }
  }
}));
export default useSSEStore;
