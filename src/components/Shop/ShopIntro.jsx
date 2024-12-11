import StarRating from "@/utils/StarRating";
import React, { useState, useEffect } from "react";

const ShopIntro = ({ shopDetail }) => {
  if (!shopDetail) return <div>Loading...</div>;

  return (
    <div className="mx-5 mb-3 justify-items-center">
      <img className="h-[150px] w-[150px] rounded-lg object-cover" src={shopDetail.shopLogo} alt="Shop" />
      <p className="mt-2 text-[20px] font-bold">{shopDetail.shopName}</p>
      <div className="mt-[-2px] flex text-[18px]">
        <StarRating starScore={Number(shopDetail.starScoreAvg)} />
      </div>
      <p className="mx-10 mt-3 text-center text-[12px] font-normal text-gray-400">{shopDetail.description}</p>
    </div>
  );
};

export default ShopIntro;
