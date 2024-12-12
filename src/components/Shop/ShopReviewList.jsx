import React from "react";
import ShopReview from "./ShopReview";

function ShopReviewList({ groomerUsername, reviewList, isCustomer }) {
  const groomerReviewList = [
    {
      reviewId: 0,
      customerNickname: "AA",
      starScore: 4.5,
      content: "string",
      recommendCount: 3,
      reviewsImage: [
        "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-1.jpg",
        "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-2.jpg",
        "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-3.jpg"
      ],
      createdAt: "2024-12-11T05:12:11.773Z" // 날짜까지만 사용
      // isRecommended: true // isCustomer === false면 이 컬럼이 없음
    },
    {
      reviewId: 1,
      customerNickname: "BB",
      starScore: 3,
      content: "강아지가 편안해하고 미용도 꼼꼼하게 해주셨어요.",
      recommendCount: 2,
      reviewsImage: [],
      createdAt: "2024-12-11T05:12:11.773Z" // 날짜까지만 사용
      // isRecommended: true // isCustomer === false면 이 컬럼이 없음
    }
  ];

  // TODO: 정렬 추가
  return (
    <div className="mx-5 mt-3">
      <div className="mb-1 flex w-full justify-between">
        <p className="font-semibold">이용후기</p>
        <div>
          <span className="text-[13px] font-bold">최신순</span>
          <span className="text-[13px]"> | 추천순</span>
        </div>
      </div>
      {groomerReviewList.map((reviewData) => (
        <ShopReview groomerUsername={groomerUsername} reviewData={reviewData} isCustomer={isCustomer} />
      ))}
    </div>
  );
}

export default ShopReviewList;
