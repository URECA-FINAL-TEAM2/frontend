import { deleteReviewRecommend, postReviewRecommend } from "@/queries/reviewQuery";
import useAuthStore from "@/store/authStore";
import { formatDateOnly } from "@/utils/formatDate";
import StarRating from "@/utils/StarRating";
import React, { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ImageModal from "../common/modal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

function ShopReview({ groomerUsername, reviewData, isCustomer }) {
  const { id } = useAuthStore();
  const [isFill, setIsFill] = useState(isCustomer && reviewData.isRecommended);
  const [recCnt, setRecCnt] = useState(reviewData.recommendCount);

  // New state for image modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const thumbUpClick = async () => {
    const status = await postReviewRecommend(id.customerId, reviewData.reviewId);

    if (status === 200) {
      // 성공했을 때 상태 변경
      setIsFill(true);
      setRecCnt((prev) => prev + 1);
    } else if (status === 400) {
      // 본인의 리뷰인 경우
      toast.error("본인의 리뷰는 추천할 수 없습니다.");
    } else {
      console.error("추천 등록 실패");
    }
  };

  const thumbUpDelete = async () => {
    const status = await deleteReviewRecommend(id.customerId, reviewData.reviewId);

    if (status === 200) {
      // 성공했을 때만 상태 변경
      setIsFill(false);
      setRecCnt((prev) => prev - 1);
    } else {
      console.error("추천 삭제 실패");
    }
  };

  // Handle opening image modal
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImgModalOpen(true);
  };

  // Handle closing image modal
  const handleCloseModal = () => {
    setIsImgModalOpen(false);
    setSelectedImageIndex(0);
  };

  // Navigate to previous image
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? reviewData.reviewsImage.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === reviewData.reviewsImage.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="mx-auto mb-4 w-full rounded-xl bg-gray-50 p-4 pb-2">
        <div className="mb-1 flex">
          <img className="h-9 w-9 rounded-lg" src={reviewData.customerProfile}></img>

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
                  <img
                    src={url}
                    alt={`Review Image ${index}`}
                    className="h-28 w-28 cursor-pointer rounded-lg object-cover"
                    onClick={() => handleImageClick(index)}
                  />
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

      {/* Image Modal with Navigation */}
      {reviewData.reviewsImage.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {reviewData.reviewsImage.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-gray-200 bg-opacity-50 p-2"
                >
                  <FaChevronLeft size={10} className="text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-gray-200 bg-opacity-50 p-2"
                >
                  <FaChevronRight size={10} className="text-white" />
                </button>
              </>
            )}

            {/* Selected Image */}
            <img
              src={reviewData.reviewsImage[selectedImageIndex]}
              alt={`Selected ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {reviewData.reviewsImage.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-2 py-0.5 text-xs text-white">
                {selectedImageIndex + 1} / {reviewData.reviewsImage.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
      <Toaster />
    </>
  );
}

export default ShopReview;
