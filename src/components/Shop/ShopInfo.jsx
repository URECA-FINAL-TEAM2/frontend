import React from "react";
import StaticMap from "../Map/StaticMap";

function ShopInfo(props) {
  return (
    <div className="mx-5 my-3">
      <p className="mb-1 font-semibold">매장 정보</p>
      <div>
        <div className="flex">
          <p className="w-20 font-semibold text-gray-500">영업시간</p>
          <p>09:00 ~ 20:00 / 매주 금 휴무</p>
        </div>
        <div className="flex">
          <p className="w-20 font-semibold text-gray-500">주소</p>
          <p>서울특별시 엘지구 엘지1길 1-1</p>
        </div>
      </div>
      <div className="mt-2 h-[200px] w-full">
        <StaticMap location={{ lat: 37.5545, lng: 126.978 }} shopName="매장명" />
      </div>
    </div>
  );
}

export default ShopInfo;
