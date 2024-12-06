import React, { useEffect, useState } from "react";
import ShopList from "./ShopList";
import useShopStore from "../../store/shopStore";
import { getShopList } from "../../queries/shopQuery";
import useDragPosition from "../../hooks/CustomerSearch/useDragPosition";

const CustomerSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const setShops = useShopStore((state) => state.setShops);
  const { isDragging, listPosition, dragHandlers } = useDragPosition();

  useEffect(() => {
    const loadShops = async () => {
      try {
        setIsLoading(true);
        const shopList = await getShopList();
        if (shopList) {
          setShops(shopList);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load shops:", err);
        setError("Failed to load shop data");
      } finally {
        setIsLoading(false);
      }
    };

    loadShops();
  }, [setShops]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[--var(--bottom-bar-height)] h-[calc(100vh-var(--bottom-bar-height)-var(--header-height))] w-full">
      <div
        className={`pointer-events-auto absolute bottom-0 left-0 right-0 z-10 bg-white transition-transform duration-200 ease-in-out ${
          isDragging ? "transition-none" : ""
        }`}
        style={{
          transform: `translateY(${100 - listPosition}%)`,
          height: "100%",
          boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* 드래그 핸들러 div를 pointer-events-auto로 명시적 설정 */}
        <div
          className="pointer-events-auto flex h-10 w-full cursor-grab items-center justify-center active:cursor-grabbing"
          onMouseDown={dragHandlers.onMouseDown}
          onTouchStart={dragHandlers.onTouchStart}
        >
          <div className="h-1.5 w-16 rounded-full bg-gray-300" />
        </div>

        <div className="scrollbar-hide h-[calc(100%-2.5rem)] overflow-y-scroll">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            </div>
          ) : (
            <ShopList />
          )}
        </div>
      </div>

      {/* 드래그 중 오버레이도 pointer-events-auto로 설정 */}
      {isDragging && (
        <div
          className="pointer-events-auto fixed inset-0 z-[30]"
          onMouseMove={dragHandlers.onMouseMove}
          onMouseUp={dragHandlers.onMouseUp}
          onTouchMove={dragHandlers.onTouchMove}
          onTouchEnd={dragHandlers.onTouchEnd}
        />
      )}
    </div>
  );
};

export default CustomerSearch;
