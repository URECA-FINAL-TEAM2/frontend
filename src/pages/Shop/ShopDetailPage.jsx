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
  const customerId = 47; // TODO: 실제 사용자 ID로 대체
  const [shopDetail, setShopDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getShopDetail(shopId, customerId);
        setShopDetail(response);
        // console.log("찜 개수: " + shopDetail.favoriteCount);
        // console.log("찜 여부: " + shopDetail.isFavorite);
      } catch (error) {
        console.error("매장 상세 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopDetail();
  }, [shopId, customerId]);

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

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!shopDetail) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-30 mt-[--header-height] overflow-y-scroll bg-white scrollbar-hide">
      <SubHeader title={shopDetail.shopName} navigate={-1} />

      <div>
        <ShopIntro shopDetail={shopDetail} />
      </div>

      <ShopMenuBar
        shopId={shopId}
        isCustomer={true}
        isFavorite={shopDetail.isFavorite}
        favoriteCount={shopDetail.favoriteCount}
        scrollToSection={scrollToSection}
      />

      <div>
        <ShopInfo shopDetail={shopDetail} />
      </div>

      <div ref={portfolioRef}>
        <ShopPortfolio portfolios={shopDetail.groomerPortfolioImages} />
      </div>

      <div ref={groomerRef}>
        <ShopGroomer isCustomer={true} shopDetail={shopDetail} />
      </div>

      <div ref={reviewsRef}>
        <ShopReviewList isCustomer={true} reviewList={shopDetail.reviews} />
      </div>

      <div className="h-[55px]">{/* BottomButton과 겹치지 않게 공간 확보 */}</div>
      <BottomButton
        styleType="pink"
        onClick={() => {
          navigate(`/customer/quotes/request/${shopDetail.groomerId}`);
        }}
      >
        견적서 요청하기
      </BottomButton>
    </div>
  );
};

export default ShopDetailPage;
