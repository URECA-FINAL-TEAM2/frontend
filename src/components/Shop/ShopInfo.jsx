import React from "react";
import StaticMap from "../Map/StaticMap";

function ShopInfo({ shopDetail }) {
  return (
    <div className="mx-5 my-3">
      <p className="mb-1 font-semibold">매장 정보</p>
      <div>
        <div className="flex">
          <p className="w-20 font-semibold text-gray-500">영업시간</p>
          <p>{shopDetail.businessTime}</p>
        </div>
        <div className="flex">
          <p className="w-20 font-semibold text-gray-500">주소</p>
          <p>{shopDetail.address}</p>
        </div>
      </div>
      <div className="mt-2 h-[200px] w-full">
        <StaticMap location={{ lat: shopDetail.latitude, lng: shopDetail.longitude }} shopName={shopDetail.shopName} />
      </div>
    </div>
  );
}

export default ShopInfo;
