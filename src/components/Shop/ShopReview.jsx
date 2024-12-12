import { formatDateOnly } from "@/utils/formatDate";
import StarRating from "@/utils/StarRating";
import React from "react";
import { GoThumbsup } from "react-icons/go";

function ShopReview({ groomerUsername, reviewData, isCustomer }) {
  return (
    <div className="mx-auto mb-4 w-full rounded-xl bg-gray-50 p-3 pb-2">
      <div className="mb-1 flex">
        <div className="h-[40px] w-[40px] self-center">
          <img className="rounded-lg" src="https://picsum.photos/200"></img>
        </div>
        <div className="ml-2 w-full">
          <div>
            <div className="flex w-full justify-between">
              <div className="text-[15px] font-semibold">{reviewData.customerNickname}</div>
              <div className="text-xs">담당 디자이너 : {groomerUsername}</div>
            </div>
          </div>
          <div className="mt-[-3px]">
            <div className="flex items-center justify-between">
              <div className="flex text-[13px]">
                <StarRating starScore={reviewData.starScore} />
              </div>
              <div className="text-xs">{formatDateOnly(reviewData.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
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
        <GoThumbsup className="text-main" />
        <span className="ml-1 mt-[-3px]">14</span>
      </div>
    </div>
  );
}

export default ShopReview;
