import { useState } from "react";
import testImg from "/Test/dog.jpg";
import { GoStarFill } from "react-icons/go";
import Modal from "../../common/modal/modal";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "@/queries/reviewQuery";

const ReviewBox = ({ review }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsModalOpen(false);
    await deleteReview(review.reviewId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const imageList = [testImg, testImg, testImg]; //TODO 수정필요

  return (
    <>
      <div className="mx-auto mb-4 w-11/12 rounded-xl bg-white p-4 shadow-md">
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
              key={index} // 고유 키 설정
              className="my-2 rounded-xl px-1"
              src={imgSrc}
              loading="lazy"
              alt={`dog Img ${index + 1}`} // alt에 고유 텍스트 추가
            />
          ))}{" "}
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
