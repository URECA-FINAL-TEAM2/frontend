import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaFolderOpen } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";
import { deleteFavorite, postFavorite } from "@/queries/shopQuery";

const ShopMenuBar = ({ shopId, isFavorite, favoriteCount, scrollToSection }) => {
  const [isFill, setIsFill] = useState(false);
  const [favCnt, setFavCnt] = useState(0);
  const customerId = 46; // TODO

  useEffect(() => {
    setIsFill(isFavorite);
    setFavCnt(favoriteCount);
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

  return (
    <div className="mx-3 my-3 border-y border-gray-200">
      <div className="flex divide-x divide-gray-200">
        <div className="flex flex-1 flex-col items-center py-3">
          <div className="cursor-pointer text-[25px]" onClick={handleFavoriteClick}>
            {isFill ? <GoHeartFill className="text-main" /> : <GoHeart className="text-main" />}
          </div>
          <div className="mt-1 select-none text-[12px]">{favCnt}</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => scrollToSection("portfolio")}
        >
          <FaFolderOpen className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">포트폴리오</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => scrollToSection("groomer")}
        >
          <RiScissors2Fill className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">미용사</div>
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col items-center py-3"
          onClick={() => scrollToSection("reviews")}
        >
          <MdReviews className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">후기</div>
        </div>

        <div className="flex flex-1 cursor-pointer flex-col items-center py-3" onClick={() => {}}>
          <IoChatbubbles className="text-[25px] text-gray-600" />
          <div className="mt-1 select-none text-[12px]">채팅 문의</div>
        </div>
      </div>
    </div>
  );
};

export default ShopMenuBar;
