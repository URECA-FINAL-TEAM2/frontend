import { create } from "zustand";

const useShopStore = create((set, get) => ({
  // Data
  shops: [],
  originalShops: [], // 원본 데이터 저장용
  selectedShop: null,
  sortType: "favorite", // 'favorite' or 'review'
  searchQuery: "", // New state to track search query

  // Actions
  setShops: (shops) =>
    set({
      shops,
      originalShops: [...shops], // 원본 데이터 저장
      sortType: "favorite",
      searchQuery: "" // Reset search query
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
    const { originalShops, searchQuery } = get();
    let shopsToSort = [...originalShops];

    // Apply search filter if there's a search query
    if (searchQuery) {
      shopsToSort = shopsToSort.filter(
        (shop) =>
          shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.skills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortType === "favorite") {
      set({
        sortType,
        shops: shopsToSort
      });
    } else if (sortType === "review") {
      const sortedShops = shopsToSort.sort((a, b) => b.starCount - a.starCount);
      set({
        sortType,
        shops: sortedShops
      });
    }
  },

  // New search action
  searchShops: (query) => {
    const { originalShops, sortType } = get();

    // If query is empty, reset to original shops
    if (!query) {
      set({
        shops: originalShops,
        searchQuery: ""
      });
      return;
    }

    // Filter shops based on query
    const filteredShops = originalShops.filter(
      (shop) =>
        shop.shopName.toLowerCase().includes(query.toLowerCase()) ||
        shop.address.toLowerCase().includes(query.toLowerCase()) ||
        shop.skills.toLowerCase().includes(query.toLowerCase())
    );

    // If current sort is review, sort filtered shops
    const shopsToSet = sortType === "review" ? filteredShops.sort((a, b) => b.starCount - a.starCount) : filteredShops;

    set({
      shops: shopsToSet,
      searchQuery: query
    });
  }
}));

export default useShopStore;
