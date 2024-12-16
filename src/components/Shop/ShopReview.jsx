import { deleteReviewRecommend, postReviewRecommend } from "@/queries/reviewQuery";
import useAuthStore from "@/store/authStore";
import { formatDateOnly } from "@/utils/formatDate";
import StarRating from "@/utils/StarRating";
import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

function ShopReview({ groomerUsername, reviewData, isCustomer }) {
  const { id } = useAuthStore();
  const [isFill, setIsFill] = useState(isCustomer && reviewData.isRecommended);
  const [recCnt, setRecCnt] = useState(reviewData.recommendCount);

  const thumbUpClick = () => {
    setIsFill((prev) => !prev);
    setRecCnt((prev) => prev + 1);
    postReviewRecommend(id.customerId, reviewData.reviewId);
  };

  const thumbUpDelete = () => {
    setIsFill((prev) => !prev);
    setRecCnt((prev) => prev - 1);
    deleteReviewRecommend(id.customerId, reviewData.reviewId);
  };

  return (
    <div className="mx-auto mb-4 w-full rounded-xl bg-gray-50 p-4 pb-2">
      <div className="mb-1 flex">
        <div className="h-[40px] w-[40px] self-center">
          <img className="rounded-lg" src={reviewData.customerProfile}></img>
        </div>
        <div className="ml-2 w-full">
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="text-[15px] font-semibold">{reviewData.customerNickname}</div>
              <div className="text-[10px]">담당 디자이너 : {groomerUsername}</div>
            </div>
          </div>
          <div className="mt-[-3px]">
            <div className="flex items-start justify-between">
              <div className="flex text-[13px]">
                <StarRating starScore={reviewData.starScore} />
              </div>
              <div className="text-[10px]">{formatDateOnly(reviewData.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        {reviewData.reviewsImage.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {reviewData.reviewsImage.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Review Imgage ${index}`} className="h-28 w-28 rounded-lg object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="p-2 text-sm">{reviewData.content}</div>
      <div className="flex justify-end text-[15px]">
        {isCustomer ? (
          isFill ? (
            <FaThumbsUp className="cursor-pointer text-main-300" onClick={thumbUpDelete} />
          ) : (
            <FaRegThumbsUp className="cursor-pointer text-main-300" onClick={thumbUpClick} />
          )
        ) : (
          <FaThumbsUp className="text-main-300" />
        )}
        <span className="ml-1 mt-[-3px]">{recCnt}</span>
      </div>
    </div>
  );
}

export default ShopReview;
