import React, { useEffect, useRef, useState } from "react";
import ShopGroomer from "@/components/Shop/ShopGroomer";
import ShopInfo from "@/components/Shop/ShopInfo";
import ShopIntro from "@/components/Shop/ShopIntro";
import ShopMenuBar from "@/components/Shop/ShopMenuBar";
import ShopPortfolio from "@/components/Shop/ShopPortfolio";
import ShopReviewList from "@/components/Shop/ShopReviewList";
import { getMyShopDetail } from "@/queries/shopQuery";
import { RiImageEditFill } from "react-icons/ri";
import { EditShop } from "/public/Icons";

const GroomerStore = () => {
  const groomerId = 4; // TODO
  const [shopDetail, setShopDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

    const targetRef = refs[section]?.current;
    if (targetRef) {
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Optional: Adjust scroll position manually
      window.scrollBy(0, -75);
    }
  };

  const handleStoreClick = () => {
    console.log("Chat button clicked");
  };

  const handlePortfolioClick = () => {
    console.log("Chat button clicked");
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
    <div className="relative mb-[--bottom-bar-height] mt-6 overflow-y-scroll bg-white scrollbar-hide">
      <div>
        <ShopIntro shopDetail={shopDetail} />
      </div>

      <ShopMenuBar isCustomer={false} favoriteCount={shopDetail.favoriteCount} scrollToSection={scrollToSection} />

      <div>
        <ShopInfo shopDetail={shopDetail} />
      </div>

      <div ref={portfolioRef}>
        <ShopPortfolio portfolios={shopDetail.groomerPortfolioImages} />
      </div>

      <div ref={groomerRef}>
        <ShopGroomer isCustomer={false} shopDetail={shopDetail} />
      </div>

      <div ref={reviewsRef}>
        <ShopReviewList
          groomerUsername={shopDetail.groomerUsername}
          isCustomer={false}
          reviewList={shopDetail.reviews}
        />
      </div>

      <EditStoreButton onClick={handleStoreClick} />
      <EditPortfolioButton onClick={handlePortfolioClick} />
    </div>
  );
};

const EditStoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 z-50 ml-[330px] mt-[24px] flex h-14 w-14 transform items-center justify-center rounded-full bg-blue-500 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600"
    >
      {/* 채팅 아이콘 (예: Font Awesome 또는 Material Icons 사용) */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h8m-8 4h4m-7.5 6h11a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v11l3.5-3.5z"
        />
      </svg> */}
      <img src={EditShop} className="ml-1 h-6 w-6" />
    </button>
  );
};

const EditPortfolioButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-36 z-50 ml-[330px] mt-[24px] flex h-14 w-14 transform items-center justify-center rounded-full bg-blue-500 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600"
    >
      <RiImageEditFill size={24} />
    </button>
  );
};

export default GroomerStore;
