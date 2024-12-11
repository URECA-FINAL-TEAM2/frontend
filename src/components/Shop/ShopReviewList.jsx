import React from "react";
import ShopReview from "./ShopReview";

function ShopReviewList({ reviewList }) {
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
      <ShopReview />
      <ShopReview />
    </div>
  );
}

export default ShopReviewList;
