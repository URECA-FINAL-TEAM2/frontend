import StarRating from "@/utils/StarRating";
import React from "react";
import { GoThumbsup } from "react-icons/go";

function ShopReview(props) {
  return (
    <div className="mx-auto mb-4 w-full rounded-xl bg-gray-50 p-3 pb-2">
      <div className="mb-1 flex">
        <div className="h-[40px] w-[40px] self-center">
          <img className="rounded-lg" src="https://picsum.photos/200"></img>
        </div>
        <div className="ml-2 w-full">
          <div>
            <div className="flex w-full justify-between">
              <div className="text-[15px] font-semibold">닉네임이요</div>
              <div className="text-xs">담당 디자이너 : 문정</div>
            </div>
          </div>
          <div className="mt-[-3px]">
            <div className="flex items-center justify-between">
              <div className="flex text-[13px]">
                <StarRating starScore={4.5} />
              </div>
              <div className="text-xs">2024.11.14</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <img className="rounded-xl" src="https://picsum.photos/200" alt="dog Img" />
        <img className="rounded-xl" src="https://picsum.photos/200" alt="dog Img" />
        <img className="rounded-xl" src="https://picsum.photos/200" alt="dog Img" />
      </div>
      <div className="py-2 text-sm">
        리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다.
      </div>
      <div className="flex justify-end text-[15px]">
        <GoThumbsup className="text-main" />
        <span className="ml-1 mt-[-3px]">14</span>
      </div>
    </div>
  );
}

export default ShopReview;
