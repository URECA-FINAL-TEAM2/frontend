import React from "react";
import StaticMap from "../Map/StaticMap";

function ShopInfo({ shopDetail }) {
  return (
    <div className="m-5">
      <p className="mb-1 text-lg font-semibold">매장 정보</p>
      <div className="py-1">
        <div className="flex">
          <p className="w-20 text-sm font-semibold text-gray-500">영업시간</p>
          <p className="text-sm">{shopDetail.businessTime}</p>
        </div>
        <div className="flex">
          <p className="w-20 text-sm font-semibold text-gray-500">주소</p>
          <p className="text-sm">{shopDetail.address}</p>
        </div>
      </div>
      <div className="mt-2 h-[200px] w-full">
        <StaticMap location={{ lat: shopDetail.latitude, lng: shopDetail.longitude }} shopName={shopDetail.shopName} />
      </div>
    </div>
  );
}

export default ShopInfo;
