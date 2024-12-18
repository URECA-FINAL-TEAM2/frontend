import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places", "marker"];

export const useMapSetup = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) {
    return {
      isLoaded: false,
      error: (
        <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-red-500">지도를 불러오는데 실패했습니다: {loadError.message}</p>
        </div>
      )
    };
  }

  if (!isLoaded) {
    return {
      isLoaded: false,
      error: (
        <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">지도를 불러오는 중입니다...</p>
        </div>
      )
    };
  }

  return { isLoaded: true, error: null };
};
