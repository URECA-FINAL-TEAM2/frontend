import ShopGroomer from "@/components/Shop/ShopGroomer";
import ShopInfo from "@/components/Shop/ShopInfo";
import ShopIntro from "@/components/Shop/ShopIntro";
import ShopMenuBar from "@/components/Shop/ShopMenuBar";
import ShopPortfolio from "@/components/Shop/ShopPortfolio";
import ShopReviewList from "@/components/Shop/ShopReviewList";
import { getMyShopDetail } from "@/queries/shopQuery";
import React, { useEffect, useRef, useState } from "react";

const GroomerStore = () => {
  const groomerId = 4; // TODO
  const [shopDetail, setShopDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getMyShopDetail(groomerId);
        setShopDetail(response);
        console.log(shopDetail.groomerPortfolioImages);
      } catch (error) {
        console.error("매장 상세 로드 실패:", error);
      } finally {
        setIsLoading(false);
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
    <div className="mb-[--bottom-bar-height] mt-6 overflow-y-scroll bg-white scrollbar-hide">
      <div>
        <ShopIntro shopDetail={shopDetail} />
      </div>

      <ShopMenuBar
        shopId={shopDetail.shopId}
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
        <ShopGroomer shopDetail={shopDetail} />
      </div>

      <div ref={reviewsRef}>
        <ShopReviewList reviewList={shopDetail.reviews} />
      </div>
    </div>
  );
};

export default GroomerStore;
