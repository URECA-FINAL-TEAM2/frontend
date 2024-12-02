import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import { getShopDetail } from "../../queries/shopQuery";
import BottomButton from "../../components/common/button/BottomButton";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaFolderOpen } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";

const ShopDetailPage = () => {
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
    <div>
      {shopDetail.shopName && <SubHeader title={shopDetail.shopName} navigate={-1} />}
      <div className="mb-[60px] mt-[--header-height] flex text-[30px]">
        <div>
          {shopDetail.isFavorite ? <GoHeartFill className="text-main" /> : <GoHeart className="text-main" />}
          {shopDetail.favorite}
        </div>
        <div>
          <FaFolderOpen />
          포트폴리오
        </div>
        <div>
          <RiScissors2Fill />
          미용사
        </div>
        <div>
          <MdReviews />
          후기
        </div>
        <div>
          <IoChatbubbles />
          채팅
        </div>
      </div>

      <div>{/* 매장 정보 내용 */}</div>

      <div ref={portfolioRef}>{/* 포트폴리오 섹션 내용 */}</div>

      <div ref={groomerRef}>{/* 미용사 섹션 내용 */}</div>

      <div ref={reviewsRef}>{/* 후기 섹션 내용 */}</div>

      <BottomButton styleType="pink" onClick={() => []}>
        견적서 요청하기
      </BottomButton>
    </div>
  );
};

export default ShopDetailPage;
