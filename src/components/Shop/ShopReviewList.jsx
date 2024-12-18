import React, { useState, useMemo } from "react";
import ShopReview from "./ShopReview";

function ShopReviewList({ groomerUsername, reviewList, isCustomer }) {
  // 정렬 상태를 관리하는 state 추가 (기본값: 최신순)
  const [sortMethod, setSortMethod] = useState("recent");

  // 정렬된 리뷰를 메모이제이션으로 관리
  const sortedReviewList = useMemo(() => {
    // 원본 배열 복사
    const reviews = [...reviewList];

    if (sortMethod === "recent") {
      // 최신순 정렬: createdAt 날짜 기준 내림차순
      return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortMethod === "recommended") {
      // 추천순 정렬: recommendCount 기준 내림차순
      return reviews.sort((a, b) => b.recommendCount - a.recommendCount);
    }

    return reviews;
  }, [reviewList, sortMethod]);

  // 정렬 방식 변경 핸들러
  const handleSortMethodChange = (method) => {
    setSortMethod(method);
  };

  return (
    <div className="mx-5 mt-3">
      <div className="mb-3 flex w-full items-center justify-between">
        <p className="text-lg font-semibold">이용후기</p>
        {reviewList.length !== 0 ? (
          <div className="flex items-center">
            <span
              className={`cursor-pointer text-[12px] ${sortMethod === "recent" ? "font-bold text-black" : "text-gray-400"}`}
              onClick={() => handleSortMethodChange("recent")}
            >
              최신순
            </span>
            <span className="mx-1 text-[10px]">|</span>
            <span
              className={`cursor-pointer text-[12px] ${sortMethod === "recommended" ? "font-bold text-black" : "text-gray-400"}`}
              onClick={() => handleSortMethodChange("recommended")}
            >
              추천순
            </span>
          </div>
        ) : null}
      </div>

      {/* 빈 리뷰 리스트에 대한 처리 */}
      {reviewList.length === 0 ? (
        <div className="mx-auto mb-4 w-full rounded-xl bg-gray-200 p-2">
          <p className="text-center text-sm text-gray-600">아직 작성된 리뷰가 없습니다.</p>
        </div>
      ) : (
        sortedReviewList.map((reviewData) => (
          <ShopReview
            key={reviewData.reviewId}
            groomerUsername={groomerUsername}
            reviewData={reviewData}
            isCustomer={isCustomer}
          />
        ))
      )}
    </div>
  );
}

export default ShopReviewList;
