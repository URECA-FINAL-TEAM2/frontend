import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import { getShopDetail } from "../../queries/shopQuery";
import BottomButton from "../../components/common/button/BottomButton";

function ShopDetailPage(props) {
  const shopId = useParams().shopId;
  const [shopDetail, setShopDetail] = useState({});

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getShopDetail(shopId);
        setShopDetail(response);
      } catch (error) {
        console.error("매장 상세 로드 실패:", error);
      }
    };

    fetchShopDetail();
  }, []);

  return (
    <div>
      <SubHeader title={shopDetail.shopName} navigate={-1} />
      <div className="mb-[60px] mt-[--header-height]"></div>

      <BottomButton styleType="pink" onClick={() => []}>
        견적서 요청하기
      </BottomButton>
    </div>
  );
}

export default ShopDetailPage;
