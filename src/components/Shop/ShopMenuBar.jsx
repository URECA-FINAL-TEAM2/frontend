import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineReviews } from "react-icons/md";
import { RiScissors2Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { deleteFavorite, postFavorite } from "@/queries/shopQuery";
import { PiImagesSquareFill } from "react-icons/pi";

const ShopMenuBar = ({ shopId, isCustomer, isFavorite, favoriteCount, scrollToSection }) => {
  // TODO
  const customerId = 47;
  const groomerId = 4;

  const [isFill, setIsFill] = useState(false);
  const [favCnt, setFavCnt] = useState(0);

  useEffect(() => {
    setFavCnt(favoriteCount);
    if (isCustomer) setIsFill(isFavorite);
  }, []);

  const handleFavoriteClick = () => {
    // isFavorite 변경, favorite(찜 개수) 변경
    if (isFill) {
      // 찜 취소
      setFavCnt(favCnt - 1);
      setIsFill(false);
      deleteFavorite(customerId, shopId);
    } else {
      // 찜 등록
      setFavCnt(favCnt + 1);
      setIsFill(true);
      postFavorite(customerId, shopId);
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
          <MdOutlineReviews className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">후기</div>
        </div>

        {isCustomer ? (
          <div className="flex flex-1 cursor-pointer flex-col items-center py-3" onClick={() => {}}>
            <IoChatbubblesOutline className="text-[25px] text-gray-600" />
            <div className="mt-1 select-none text-[12px]">채팅 문의</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShopMenuBar;
