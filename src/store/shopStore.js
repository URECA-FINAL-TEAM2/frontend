import { create } from "zustand";

const useShopStore = create((set, get) => ({
  // Data
  shops: [],
  originalShops: [], // 원본 데이터 저장용
  selectedShop: null,
  sortType: "favoriteCount", // 'favoriteCount' or 'reviewCount'
  searchQuery: "", // New state to track search query

  // Actions
  setShops: (shops) =>
    set({
      shops: [...shops].sort((a, b) => b.favoriteCount - a.favoriteCount), // favoriteCount로 정렬,
      originalShops: [...shops], // 원본 데이터 저장
      sortType: "favoriteCount",
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

    // 검색 필터링 (searchQuery가 있는 경우)
    if (searchQuery) {
      shopsToSort = shopsToSort.filter(
        (shop) =>
          shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.skills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬 로직
    if (sortType === "favoriteCount") {
      // 찜 많은 순으로 정렬
      shopsToSort.sort((a, b) => b.favoriteCount - a.favoriteCount);
    } else if (sortType === "reviewCount") {
      // 리뷰 많은 순으로 정렬 (리뷰 카운트로 정렬)
      shopsToSort.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    set({
      sortType,
      shops: shopsToSort
    });
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
