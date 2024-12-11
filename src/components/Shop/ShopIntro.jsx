import { getShopDetail } from "@/queries/shopQuery";
import StarRating from "@/utils/StarRating";
import React, { useState, useEffect } from "react";

const ShopIntro = () => {
  // TODO : starScore -> starScoreAvg
  const [shopDetail, setShopDetail] = useState(null);

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const detail = await getShopDetail(1);
        setShopDetail(detail);
      } catch (error) {
        console.error("Failed to fetch shop detail:", error);
      }
    };

    fetchShopDetail();
  }, []);

  if (!shopDetail) return <div>Loading...</div>;

  return (
    <div className="mx-5 mb-3 justify-items-center">
      {" "}
      <img className="h-[150px] w-[150px] rounded-lg object-cover" src={shopDetail.shopLogo} alt="Shop" />
      <p className="mt-2 text-[20px] font-bold">{shopDetail.shopName}</p>
      <div className="mt-[-2px] flex text-[18px]">
        <StarRating starScore={shopDetail.starScore} />
      </div>
      <p className="mx-10 mt-3 text-center text-[12px] font-normal text-gray-400">{shopDetail.description}</p>
    </div>
  );
};

export default ShopIntro;
