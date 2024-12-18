import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import { getShopDetail } from "../../queries/shopQuery";
import BottomButton from "../../components/common/button/BottomButton";
import ShopMenuBar from "@/components/Shop/ShopMenuBar";
import ShopPortfolio from "@/components/Shop/ShopPortfolio";
import ShopIntro from "@/components/Shop/ShopIntro";
import ShopInfo from "@/components/Shop/ShopInfo";
import ShopGroomer from "@/components/Shop/ShopGroomer";
import ShopReviewList from "@/components/Shop/ShopReviewList";
import useAuthStore from "@/store/authStore";

const ShopDetailPage = () => {
  const shopId = useParams().shopId;
  const { id } = useAuthStore();
  const [shopDetail, setShopDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab } = location.state || {};

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getShopDetail(shopId, id.customerId);
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
  }, [shopId, id.customerId]);

  const StoreRef = useRef(null);
  const portfolioRef = useRef(null);
  const groomerRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToSection = (section) => {
    const refs = {
      storeInfo: StoreRef,
      portfolio: portfolioRef,
      groomer: groomerRef,
      reviews: reviewsRef
    };

    const targetRef = refs[section]?.current;

    if (targetRef) {
      // 스크롤을 화면 상단으로 이동
      targetRef.scrollIntoView({ behavior: "smooth", block: "center" });

      // scrollIntoView 완료 후 margin-top 만큼 추가 스크롤 조정
      setTimeout(() => {
        window.scrollBy({
          top: -75, // 75px 위로 이동
          left: 0,
          behavior: "smooth"
        });
      }, 300);
    }
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
    <div className="absolute inset-0 z-20 mt-[--header-height] w-[400px] overflow-y-scroll bg-white scrollbar-hide">
      <SubHeader
        title={shopDetail.shopName}
        navigate={() => {
          activeTab ? navigate("/customer/quotes", { state: { activeTab: activeTab } }) : navigate(-1);
        }}
      />
      <div>
        <ShopIntro shopDetail={shopDetail} />
      </div>
      <div className="sticky -top-0 z-40 bg-white">
        <ShopMenuBar
          shopId={shopId}
          isCustomer={true}
          isFavorite={shopDetail.isFavorite}
          favoriteCount={shopDetail.favoriteCount}
          scrollToSection={scrollToSection}
        />
      </div>

      <div className="my-10" ref={StoreRef}>
        <ShopInfo shopDetail={shopDetail} />
      </div>

      <div className="my-10" ref={portfolioRef}>
        <ShopPortfolio portfolios={shopDetail.groomerPortfolioImages} />
      </div>

      <div className="my-10" ref={groomerRef}>
        <ShopGroomer isCustomer={true} shopDetail={shopDetail} />
      </div>

      <div className="my-10" ref={reviewsRef}>
        <ShopReviewList
          groomerUsername={shopDetail.groomerUsername}
          isCustomer={true}
          reviewList={shopDetail.reviews}
        />
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
