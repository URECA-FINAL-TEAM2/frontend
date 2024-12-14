import React from "react";
import ShopItem from "./ShopItem";
import useShopStore from "../../store/shopStore";
import useListPositionStore from "../../store/listPositionStore";

const ShopList = () => {
  const listPosition = useListPositionStore((state) => state.listPosition);
  const { shops, sortType, setSortType } = useShopStore();

  const marginBottomHeight =
    listPosition === 60 ? "calc((100vh - var(--bottom-bar-height) - var(--header-height)) * 0.4)" : "0";

  return (
    <>
      <div className="mb-1 flex h-[20px] items-center px-7">
        <span
          onClick={() => setSortType("favorite")}
          className={`cursor-pointer rounded-md px-2 py-1 text-sm transition-colors duration-200 ${
            sortType === "favorite" ? "text-primary font-bold" : "hover:text-primary text-gray-600"
          }`}
        >
          찜 많은 순
        </span>
        <span className="text-gray-300">|</span>
        <span
          onClick={() => setSortType("review")}
          className={`cursor-pointer rounded-md px-2 py-1 text-sm transition-colors duration-200 ${
            sortType === "review" ? "text-primary font-bold" : "hover:text-primary text-gray-600"
          }`}
        >
          리뷰 많은 순
        </span>
      </div>

      {shops.map((shopInfo) => (
        <ShopItem key={shopInfo.shopId} shopInfo={shopInfo} />
      ))}

      <div style={{ height: marginBottomHeight }} />
    </>
  );
};

export default ShopList;
