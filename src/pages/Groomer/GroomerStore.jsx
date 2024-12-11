import ShopGroomer from "@/components/Shop/ShopGroomer";
import ShopInfo from "@/components/Shop/ShopInfo";
import ShopIntro from "@/components/Shop/ShopIntro";
import ShopMenuBar from "@/components/Shop/ShopMenuBar";
import ShopPortfolio from "@/components/Shop/ShopPortfolio";
import ShopReviewList from "@/components/Shop/ShopReviewList";
import { getMyShopDetail } from "@/queries/shopQuery";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroomerStore = () => {
  const [groomerId, setGroomerId] = useState(3); // TODO
  const [shopDetail, setShopDetail] = useState({});
  const navigate = useNavigate(); // 수정 페이지로 이동

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await getMyShopDetail(groomerId);
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
    <div className="mb-[--bottom-bar-height] mt-6 overflow-y-scroll bg-white scrollbar-hide">
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
    </div>
  );
};

export default GroomerStore;
