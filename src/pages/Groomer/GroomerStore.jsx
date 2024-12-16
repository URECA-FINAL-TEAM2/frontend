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
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import EmptyPage from "@/components/common/EmptyPage";

const GroomerStore = () => {
  const { id } = useAuthStore();
  const navigate = useNavigate();
  const [shopDetail, setShopDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getMyShopDetail(id.groomerId);
        setShopDetail(response);
      } catch (error) {
        console.error("매장 상세 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopDetail();
  }, []);

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
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "center"
        // 후기때문에 ,,,
      });
      // const offset = 200; // 상단에서 100px 떨어지게
      // const topPosition = targetRef.getBoundingClientRect().top + window.pageYOffset - offset;

      // window.scrollTo({
      //   behavior: "smooth",
      //   top: topPosition
      // });

      // Optional: Adjust scroll position manually
      // window.scrollBy(0, -200);
    }
  };

  const handleStoreClick = () => {
    console.log("매장 관리 페이지로");
    navigate("/groomer/mystore");
  };

  const handlePortfolioClick = () => {
    console.log("포트폴리오 관리 페이지로");
    navigate("/groomer/editportfolio");
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
      <EmptyPage
        content={
          <div className="pb-24 text-center">
            <span className="block text-lg">등록된 매장이 없습니다.</span>
            <button
              onClick={() => navigate("/groomer/createstore", { state: { update: false } })}
              className="mt-2 rounded-xl bg-main px-5 py-1 text-lg text-white hover:bg-main-300"
            >
              매장 등록하기
            </button>
          </div>
        }
      />
    );
  }

  return (
    <div className="relative mb-[--bottom-bar-height] mt-6 bg-white scrollbar-hide">
      <div>
        <ShopIntro shopDetail={shopDetail} />
      </div>
      <div className="sticky top-[75px] z-10 bg-white">
        <ShopMenuBar isCustomer={false} favoriteCount={shopDetail.favoriteCount} scrollToSection={scrollToSection} />
      </div>

      <div className="my-10" ref={StoreRef}>
        <ShopInfo shopDetail={shopDetail} />
      </div>

      <div className="my-10" ref={portfolioRef}>
        <ShopPortfolio portfolios={shopDetail.groomerPortfolioImages} />
      </div>

      <div className="my-10" ref={groomerRef}>
        <ShopGroomer isCustomer={false} shopDetail={shopDetail} />
      </div>

      <div className="my-10" ref={reviewsRef}>
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
      className="fixed bottom-20 z-50 ml-[340px] mt-[24px] flex h-12 w-12 transform items-center justify-center rounded-full bg-main p-3 text-white shadow-lg transition-colors duration-300 hover:bg-main-300"
    >
      <img src={EditShop} className="ml-1 h-6 w-6" />
    </button>
  );
};

const EditPortfolioButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-32 z-50 mb-2 ml-[340px] mt-[24px] flex h-12 w-12 transform items-center justify-center rounded-full bg-main p-3 text-white shadow-lg transition-colors duration-300 hover:bg-main-300"
    >
      <RiImageEditFill size={23} />
    </button>
  );
};

export default GroomerStore;
