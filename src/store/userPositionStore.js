import { create } from "zustand";

const useUserPositionStore = create((set) => ({
  userPosition: {
    latitude: 0,
    longitude: 0
  },
  setUserPosition: (position) =>
    set({
      userPosition: {
        latitude: position.latitude,
        longitude: position.longitude
      }
    })
}));

export default useUserPositionStore;
