import { useState } from "react";
import testImg from "/Test/dog.jpg";
import { GoStarFill } from "react-icons/go";
import Modal from "../../common/modal/modal";
import { Navigate, useNavigate } from "react-router-dom";

const ReviewBox = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto mb-4 w-11/12 rounded-xl bg-white p-4">
        <div className="text-lg">매장명</div>
        <div className="flex items-center text-sm">
          <div className="flex items-center">
            <GoStarFill color="#F4B400" size={15} className="mr-1" />
            <span>4.5</span>
          </div>
          <div className="ml-3 text-xs">2024.11.14</div>
        </div>
        <div className="flex overflow-x-scroll">
          <img className="my-2 mr-2 w-1/3 rounded-xl" src={testImg} alt="dog Img" />
          <img className="my-2 mr-2 w-1/3 rounded-xl" src={testImg} alt="dog Img" />
          <img className="my-2 mr-2 w-1/3 rounded-xl" src={testImg} alt="dog Img" />
          <img className="my-2 mr-2 w-1/3 rounded-xl" src={testImg} alt="dog Img" />
        </div>
        <div className="py-2 text-sm">
          리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다.
        </div>
        <div>
          <button onClick={handleOpenModal} className="buttonInBox-main">
            리뷰 삭제하기
          </button>
          <button onClick={() => navigate("/customer/writeReviews")} className="buttonInBox-sub">
            리뷰 수정하기
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        리뷰를 삭제하시겠습니까?
      </Modal>
    </>
  );
};

export default ReviewBox;
