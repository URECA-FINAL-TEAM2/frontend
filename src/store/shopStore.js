import { create } from "zustand";

const useShopStore = create((set, get) => ({
  // Data
  shops: [],
  originalShops: [], // 원본 데이터 저장용
  selectedShop: null,
  sortType: "favorite", // 'favorite' or 'review'

  // Actions
  setShops: (shops) =>
    set({
      shops,
      originalShops: [...shops], // 원본 데이터 저장
      sortType: "favorite"
    }),

  setSelectedShop: (shop) =>
    set({
      selectedShop: {
        shopId: shop.shopId,
        latitude: shop.latitude,
        longitude: shop.longitude
      }
    }),

  // Sort action
  setSortType: (sortType) => {
    if (sortType === "favorite") {
      // 저장해둔 원본 데이터(favorite 정렬)로 복원
      set({
        sortType,
        shops: [...get().originalShops]
      });
    } else if (sortType === "review") {
      // review 순 정렬
      const sortedShops = [...get().shops].sort((a, b) => b.starCount - a.starCount);
      set({
        sortType,
        shops: sortedShops
      });
    }
  }
}));

export default useShopStore;
