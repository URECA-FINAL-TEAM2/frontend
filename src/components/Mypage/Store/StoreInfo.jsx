import { deleteGroomerShop } from "@/queries/shopQuery";
import { useEffect } from "react";

const StoreInfo = ({ shopInfo }) => {
  const handleDeleteShop = async (shopId) => {
    const response = await deleteGroomerShop(shopId);
  };

  return (
    <div className="mb-20 mt-10">
      <div>
        <div className="labelStyle">매장 명</div>
        <div className="inputStyle">{shopInfo.shopName}</div>
      </div>
      <div>
        <div className="labelStyle">매장 설명</div>
        <div className="inputStyle">{shopInfo.description}</div>
      </div>
      <div>
        <div className="labelStyle">매장 주소</div>
        <div className="inputStyle mb-2">
          {shopInfo.sidoName} {shopInfo.sigunguName}
        </div>
        <div className="inputStyle">{shopInfo.address}</div>
      </div>
      <div>
        <div className="labelStyle">운영 시간</div>
        <div className="inputStyle">{shopInfo.businessTime}</div>
      </div>

      <div className="mt-12 text-center text-sm">
        <button type="button" onClick={() => handleDeleteShop(shopInfo.shopId)} className="text-gray-300 underline">
          매장 삭제하기
        </button>
      </div>
    </div>
  );
};

export default StoreInfo;
