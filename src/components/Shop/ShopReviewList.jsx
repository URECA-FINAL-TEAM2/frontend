//shopReviewList.jsx
import React, { useState, useMemo } from "react";
import ShopReview from "./ShopReview";

function ShopReviewList({ groomerUsername, reviewList, isCustomer }) {
  // 정렬 상태를 관리하는 state 추가 (기본값: 최신순)
  const [sortMethod, setSortMethod] = useState("recent");

  // reviewList = [
  //   {
  //     reviewId: 0,
  //     customerNickname: "AA",
  //     starScore: 4.5,
  //     content: "string",
  //     recommendCount: 3,
  //     reviewsImage: [
  //       "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-1.jpg",
  //       "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-2.jpg",
  //       "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-3.jpg"
  //     ],
  //     createdAt: "2024-12-10T05:12:11.773Z", // 날짜까지만 사용
  //     isRecommended: true // isCustomer === false면 이 컬럼이 없음
  //   },
  //   {
  //     reviewId: 1,
  //     customerNickname: "BB",
  //     starScore: 3,
  //     content: "강아지가 편안해하고 미용도 꼼꼼하게 해주셨어요.",
  //     recommendCount: 2,
  //     reviewsImage: [],
  //     createdAt: "2024-12-11T05:12:11.773Z", // 날짜까지만 사용
  //     isRecommended: true // isCustomer === false면 이 컬럼이 없음
  //   }
  // ];

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
      <div className="mb-1 flex w-full items-center justify-between">
        <p className="font-semibold">이용후기</p>
        {reviewList.length !== 0 ? (
          <div>
            <span
              className={`cursor-pointer text-[13px] ${sortMethod === "recent" ? "font-bold text-black" : "text-gray-400"}`}
              onClick={() => handleSortMethodChange("recent")}
            >
              최신순
            </span>
            <span className="mx-1 text-[13px]">|</span>
            <span
              className={`cursor-pointer text-[13px] ${sortMethod === "recommended" ? "font-bold text-black" : "text-gray-400"}`}
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
