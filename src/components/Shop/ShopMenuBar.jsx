import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaFolderOpen } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";

const ShopMenuBar = ({ shopDetail, scrollToSection }) => {
  const [isFavorite, setIsFavorite] = useState(shopDetail.isFavorite);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // isFavorite 변경, favorite(찜 개수) 변경
    // 매장 찜 or 찜 취소 API 호출
  };

  return (
    <div className="mx-3 my-3 border-y border-gray-200">
      <div className="flex divide-x divide-gray-200">
        <div className="flex flex-1 flex-col items-center py-3">
          <div className="cursor-pointer text-[25px]" onClick={handleFavoriteClick}>
            {isFavorite ? <GoHeartFill className="text-main" /> : <GoHeart className="text-main" />}
          </div>
          <div className="mt-1 select-none text-[12px]">{shopDetail.favorite}</div>
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
