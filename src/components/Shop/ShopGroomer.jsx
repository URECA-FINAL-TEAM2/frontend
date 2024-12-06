import { getShopDetail } from "@/queries/shopQuery";
import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";

function ShopGroomer(props) {
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

  return (
    <div className="mx-5 my-3">
      <p className="mb-1 font-semibold">미용사</p>
      <div className="w-full justify-items-center rounded-lg border-2 border-main-300 py-3">
        <img
          className="mb-1 h-[100px] w-[100px] rounded-md bg-gray-500 object-cover"
          src={shopDetail?.groomerProfileImage}
        ></img>
        <p className="text-[18px] font-bold">{shopDetail?.groomerUsername} 디자이너</p>
        <p className="mb-1 text-[12px] text-gray-600">{shopDetail?.skills}</p>
        <Button styleType="lightPink">채팅 문의하기</Button>
      </div>
    </div>
  );
}

export default ShopGroomer;
