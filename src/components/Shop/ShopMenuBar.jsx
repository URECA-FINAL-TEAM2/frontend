import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineRateReview } from "react-icons/md";
import { RiScissors2Line } from "react-icons/ri";
import { deleteFavorite, postFavorite } from "@/queries/shopQuery";
import { PiImagesSquareFill } from "react-icons/pi";
import useAuthStore from "@/store/authStore";
import { BsShop } from "react-icons/bs";

const ShopMenuBar = ({ shopId, isCustomer, isFavorite, favoriteCount, scrollToSection }) => {
  const { id } = useAuthStore();

  const [isFill, setIsFill] = useState(false);
  const [favCnt, setFavCnt] = useState(0);

  useEffect(() => {
    setFavCnt(favoriteCount);
    if (isCustomer) setIsFill(isFavorite);
  }, []);

  const handleFavoriteClick = async () => {
    if (!isCustomer) return;

    if (isFill) {
      // 찜 취소
      const status = await deleteFavorite(id.customerId, shopId);
      if (status === 200) {
        setFavCnt((prev) => prev - 1);
        setIsFill(false);
      } else {
        console.error("찜 취소 실패");
      }
    } else {
      // 찜 등록
      const status = await postFavorite(id.customerId, shopId);
      if (status === 200) {
        setFavCnt((prev) => prev + 1);
        setIsFill(true);
      } else {
        console.error("찜 등록 실패");
      }
    }
  };

  const handleSectionClick = (sectionName) => {
    console.log("Clicked section:", sectionName);
    scrollToSection(sectionName);
  };

  return (
    <div className="mx-6 my-3 border-y border-gray-200">
      <div className="flex divide-x divide-gray-200">
        <div className="flex flex-1 flex-col items-center py-3">
          {isCustomer ? (
            <div className="cursor-pointer text-[25px]" onClick={handleFavoriteClick}>
              {isFill ? <GoHeartFill className="text-main" /> : <GoHeart className="text-main" />}
            </div>
          ) : (
            <div className="cursor-default text-[25px]">
              <GoHeartFill className="text-main" />
            </div>
          )}
          <div className="mt-1 select-none text-[12px]">{favCnt}</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => handleSectionClick("storeInfo")}
        >
          <BsShop className="p-[2px] text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">매장 정보</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => handleSectionClick("portfolio")}
        >
          <PiImagesSquareFill className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">포트폴리오</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => handleSectionClick("groomer")}
        >
          <RiScissors2Line className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">미용사</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => handleSectionClick("reviews")}
        >
          <MdOutlineRateReview className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">후기</div>
        </div>
      </div>
    </div>
  );
};

export default ShopMenuBar;
