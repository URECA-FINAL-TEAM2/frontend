import { useNavigate } from "react-router-dom";
import SubHeader from "../../../components/common/SubHeader";
import { useState } from "react";
import { GoStarFill } from "react-icons/go";
import testImg from "/Test/dog.jpg";
import Modal from "../../../components/common/modal/modal";

const WriteReviews = () => {
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
      <SubHeader title={"리뷰수정"} />
      <div className="mx-auto min-h-screen bg-main-100 pt-[90px]">
        <div className="mx-auto mb-4 h-[60vh] w-11/12 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between text-lg">
            <span>매장명</span>
            <div className="text-sm">2024.11.14</div>
          </div>
          <div className="flex items-center text-sm">
            <div className="flex items-center">
              <GoStarFill color="#F4B400" size={15} className="mr-1" />
              <span>4.5</span>
            </div>
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
        </div>

        <button className="bottomButtonPink">리뷰 수정하기</button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          closeText="닫기"
          confirmText="확인"
        >
          리뷰를 삭제하시겠습니까?
        </Modal>
      </div>
    </>
  );
};

export default WriteReviews;
