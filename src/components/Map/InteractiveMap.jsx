import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import useShopStore from "../../store/shopStore";
import { useMapSetup } from "./MapBase";
import useListPositionStore from "../../store/listPositionStore";
import { useNavigate } from "react-router-dom";
import useRegionStore from "@/store/regionStore";

const InteractiveMap = () => {
  const listPosition = useListPositionStore((state) => state.listPosition);
  const shops = useShopStore((state) => state.shops);
  const setSelectedShop = useShopStore((state) => state.setSelectedShop);
  const selectedShop = useShopStore((state) => state.selectedShop);

  const { sidoName, sigunguName } = useRegionStore();
  const address = `${sidoName} ${sigunguName}`;

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRefs = useRef([]); // AdvancedMarkerElement 참조를 위한 배열
  const [mapCenter, setMapCenter] = useState({
    lat: 37.5665,
    lng: 126.978
  });

  const [locationError, setLocationError] = useState(null);

  const { isLoaded, error } = useMapSetup();

  const mapContainerStyle = {
    width: "100%",
    height: "100%"
  };

  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
    scrollwheel: true
  };

  const calculateMapOffset = useCallback(() => {
    return listPosition >= 60 ? -window.innerHeight * 0.25 : 0;
  }, [listPosition]);

  const smoothlyAnimateToPosition = useCallback((position, offset = 0) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const targetZoom = map.getZoom();

    const tryAnimation = () => {
      if (!map.getProjection()) {
        requestAnimationFrame(tryAnimation);
        return;
      }

      const projection = map.getProjection();
      try {
        const point = projection.fromLatLngToPoint(new google.maps.LatLng(position));
        const adjustedPoint = new google.maps.Point(point.x, point.y - offset / Math.pow(2, targetZoom));
        const adjustedLatLng = projection.fromPointToLatLng(adjustedPoint);

        const animationDuration = 500;
        const fps = 60;
        const frames = (animationDuration / 1000) * fps;
        let frame = 0;

        const animate = () => {
          if (frame >= frames) return;

          const progress = frame / frames;
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          const currentCenter = map.getCenter();
          const newLat = currentCenter.lat() + (adjustedLatLng.lat() - currentCenter.lat()) * easeProgress;
          const newLng = currentCenter.lng() + (adjustedLatLng.lng() - currentCenter.lng()) * easeProgress;

          map.panTo({ lat: newLat, lng: newLng });
          frame++;

          if (frame < frames) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      } catch (error) {
        map.panTo(position);
      }
    };

    tryAnimation();
  }, []);

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng()
          });

          const bounds = results[0].geometry.viewport;
          map.fitBounds(bounds);

          const offset = calculateMapOffset();
          smoothlyAnimateToPosition(location.toJSON(), offset);

          // 맵 로드가 완료되었음을 표시
          setIsMapLoaded(true);
        } else {
          setLocationError("주소를 찾을 수 없습니다.");
          console.error("Geocoding error:", status);
        }
      });
    },
    [address, calculateMapOffset, smoothlyAnimateToPosition]
  );

  const navigate = useNavigate();

  const handleShopClick = (shopInfo) => {
    setSelectedShop({ shopId: shopInfo.shopId, latitude: shopInfo.latitude, longitude: shopInfo.longitude });
    navigate(`/customer/shop/${shopInfo.shopId}`);
  };

  // selectedShop 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    if (selectedShop && mapRef.current) {
      const offset = calculateMapOffset();
      const position = {
        lat: selectedShop.latitude,
        lng: selectedShop.longitude
      };
      smoothlyAnimateToPosition(position, offset);
    }
  }, [selectedShop, calculateMapOffset, smoothlyAnimateToPosition]);

  // UseEffect to update map center when the address changes
  useEffect(() => {
    if (!address || !window.google) return; // Check if google is defined

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setMapCenter({
          lat: location.lat(),
          lng: location.lng()
        });

        const bounds = results[0].geometry.viewport;
        if (mapRef.current) {
          const map = mapRef.current;
          map.fitBounds(bounds);
        }

        const offset = calculateMapOffset();
        smoothlyAnimateToPosition(location.toJSON(), offset);
      } else {
        setLocationError("주소를 찾을 수 없습니다.");
        console.error("Geocoding error:", status);
      }
    });
  }, [address, calculateMapOffset, smoothlyAnimateToPosition]);

  useEffect(() => {
    if (!isMapLoaded) return;

    console.log("shops", shops);
    const map = mapRef.current;

    // 마커를 초기화
    markerRefs.current.forEach((marker) => marker?.setMap(null));
    markerRefs.current = [];

    // Custom Advanced Marker 생성
    shops.forEach((shop) => {
      const markerContent = document.createElement("div");
      markerContent.className = "shop-marker";
      markerContent.innerHTML = `
        <div style="
          background-color: #FFFFFF;
          // border: 2px solid #FF8E8E;
          border-radius: 8px;
          color: #FC7272;
          font-size: 14px;
          padding: 4px 8px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          transition: transform 0.2s;
          font-family: 'Pretendard', sans-serif;
        ">
          ${shop.shopName}
          <div style="
            content: '';
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translate(-50%, 0);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #FFFFFF;
          "></div>
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: shop.latitude, lng: shop.longitude },
        map: map,
        content: markerContent
      });

      // 클로저 문제를 피하기 위해 화살표 함수를 사용
      marker.addListener("click", () => handleShopClick(shop));
      markerRefs.current.push(marker);
    });
  }, [shops, isMapLoaded]);

  if (!isLoaded || !window.google) return error;

  return (
    <div className="relative h-full w-full">
      {locationError && (
        <div className="absolute right-4 top-16 z-[5] rounded-lg bg-red-100 px-4 py-2 text-red-700 shadow-md">
          {locationError}
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        options={{ ...options, mapId: import.meta.env.VITE_GOOGLE_MAP_ID }}
        onLoad={onMapLoad}
        onClick={() => setSelectedShop(null)}
      />
    </div>
  );
};

export default InteractiveMap;
