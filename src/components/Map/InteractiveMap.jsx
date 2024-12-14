import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
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
  const address = sidoName + " " + sigunguName;

  const mapRef = useRef(null);
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
    disableDefaultUI: true, // 모든 기본 UI 컨트롤 비활성화
    clickableIcons: false, // POI 아이콘 클릭 비활성화
    scrollwheel: true // 마우스 휠로 줌 활성화
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

          // 지역 크기에 맞춰 자동으로 zoom level과 bounds 설정
          const bounds = results[0].geometry.viewport;
          map.fitBounds(bounds);

          const offset = calculateMapOffset();
          smoothlyAnimateToPosition(location.toJSON(), offset);
        } else {
          setLocationError("주소를 찾을 수 없습니다.");
          console.error("Geocoding error:", status);
        }
      });
    },
    [address, calculateMapOffset, smoothlyAnimateToPosition]
  );

  const navigate = useNavigate();

  // handleShopClick 수정
  const handleShopClick = useCallback(
    (shopInfo) => {
      setSelectedShop({ shopId: shopInfo.shopId, latitude: shopInfo.latitude, longitude: shopInfo.longitude });
      navigate(`/customer/shop/${shopInfo.shopId}`);
    },
    [setSelectedShop]
  );

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

  if (!isLoaded) return error;

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
        options={options}
        onLoad={onMapLoad}
        onClick={() => setSelectedShop(null)}
      >
        {shops.map(
          (shop) =>
            window.google && (
              <MarkerF
                key={shop.shopName}
                position={{ lat: shop.latitude, lng: shop.longitude }}
                onClick={() => handleShopClick(shop)}
                // icon={{
                //   path: google.maps.SymbolPath.CIRCLE,
                //   scale: 6,
                //   fillColor: "#FF0000",
                //   fillOpacity: 0.7,
                //   strokeColor: "#ffffff",
                //   strokeWeight: 1.5
                // }}
                title={shop.shopName}
              />
            )
        )}
      </GoogleMap>
    </div>
  );
};

export default InteractiveMap;
