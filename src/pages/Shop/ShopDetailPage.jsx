import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import { getShopDetail } from "../../queries/shopQuery";
import BottomButton from "../../components/common/button/BottomButton";
import ShopMenuBar from "@/components/Shop/ShopMenuBar";
import ShopPortfolio from "@/components/Shop/ShopPortfolio";
import ShopIntro from "@/components/Shop/ShopIntro";
import ShopInfo from "@/components/Shop/ShopInfo";
import ShopGroomer from "@/components/Shop/ShopGroomer";
import ShopReviewList from "@/components/Shop/ShopReviewList";

const ShopDetailPage = () => {
  const shopId = useParams().shopId;
  const [shopDetail, setShopDetail] = useState({});
  const navigate = useNavigate();

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

  const portfolioRef = useRef(null);
  const groomerRef = useRef(null);
  const reviewsRef = useRef(null);
  const scrollToSection = (section) => {
    const refs = {
      portfolio: portfolioRef,
      groomer: groomerRef,
      reviews: reviewsRef
    };

    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute inset-0 z-30 overflow-y-scroll bg-white pt-[--header-height] scrollbar-hide">
      {shopDetail.shopName && <SubHeader title={shopDetail.shopName} navigate={-1} />}

      <div>
        <ShopIntro />
      </div>

      <ShopMenuBar shopDetail={shopDetail} scrollToSection={scrollToSection} />

      <div>
        <ShopInfo />
      </div>

      <div ref={portfolioRef}>
        <ShopPortfolio />
      </div>

      <div ref={groomerRef}>
        <ShopGroomer />
      </div>

      <div ref={reviewsRef}>
        <ShopReviewList />
      </div>

      <div className="h-[55px]">{/* BottomButton과 겹치지 않게 공간 확보 */}</div>
      <BottomButton
        styleType="pink"
        onClick={() => {
          navigate(`/customer/shop/quotes/${shopId}`);
        }}
      >
        견적서 요청하기
      </BottomButton>
    </div>
  );
};

export default ShopDetailPage;
