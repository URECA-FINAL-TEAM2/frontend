import { deleteGroomerShop, parseAddress } from "@/queries/shopQuery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreInfo = ({ shopInfo }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [detailAddress, setDetailAddress] = useState();
  const handleDeleteShop = async (shopId) => {
    const response = await deleteGroomerShop(shopId);
    navigate("/groomer/home");
  };
  useEffect(() => {
    if (shopInfo?.address) {
      const { address, detailAddress } = parseAddress(shopInfo.address);
      setAddress(address);
      setDetailAddress(detailAddress);
    }
  }, [shopInfo]);

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
        <div className="inputStyle mb-2">{address}</div>
        <div className="inputStyle">{detailAddress}</div>
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
