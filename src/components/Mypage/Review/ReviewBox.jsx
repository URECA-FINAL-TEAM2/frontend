import { useState } from "react";
import testImg from "/Test/dog.jpg";
import { GoStarFill } from "react-icons/go";
import Modal from "../../common/modal/modal";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "@/queries/reviewQuery";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImageModal from "@/components/common/modal/ImageModal";

const ReviewBox = ({ review, setReviews }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsModalOpen(false);
      await deleteReview(review.reviewId);

      // 삭제된 리뷰를 상태에서 제거
      setReviews((prevReviews) => prevReviews.filter((item) => item.reviewId !== review.reviewId));
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImgModalOpen(true);
  };

  const handleCloseImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  const imageList = [testImg, testImg, testImg]; //TODO 수정필요

  return (
    <>
      <div className="mx-auto my-4 w-11/12 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="text-md flex items-center justify-between">
          <span>{review.shopName}</span>
          <span className="text-xs text-gray-400">{review.groomerName} 디자이너</span>
        </div>
        <div className="flex items-start justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <GoStarFill color="#F4B400" size={13} className="mr-1" />
            <span>{Number(review.starRating).toFixed(2)}</span>
          </div>
          <div className="ml-3 text-xs">{review.reviewDate}</div>
        </div>
        <div className="grid grid-cols-3">
          {imageList.map((imgSrc, index) => (
            <img
              key={index}
              className="my-2 cursor-pointer rounded-xl px-1"
              src={imgSrc}
              loading="lazy"
              alt={`dog Img ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div className="py-2 text-sm">{review.content}</div>
        <div>
          <button onClick={handleOpenModal} className="buttonInBox-main">
            리뷰 삭제하기
          </button>
          <button
            onClick={() => navigate("/customer/writeReviews", { state: { review: review } })}
            className="buttonInBox-sub"
          >
            리뷰 수정하기
          </button>
        </div>
      </div>

      {/* Image Modal with Navigation */}
      {imageList.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseImgModal}>
          <div className="relative flex w-full items-center justify-center">
            {imageList.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-gray-200 bg-opacity-50 p-2"
                >
                  <FaChevronLeft className="text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-gray-200 bg-opacity-50 p-2"
                >
                  <FaChevronRight className="text-white" />
                </button>
              </>
            )}

            {/* Selected Image */}
            <img
              src={imageList[selectedImageIndex]}
              alt={`선택된 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {imageList.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {imageList.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        closeText="닫기"
        confirmText="확인"
      >
        리뷰를 삭제하시겠습니까?
      </Modal>
    </>
  );
};

export default ReviewBox;
