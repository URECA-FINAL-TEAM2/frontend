import { useState } from "react";
import Button from "../components/common/button/button";
import BottomButton from "../components/common/button/BottomButton";
import Modal from "../components/common/modal/modal";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    alert("확인");
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    alert("lightPink");
  };

  const handleEdit = () => {
    alert("pink");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button type="lightPink" onClick={handleDelete}>
          lightPink
        </Button>
        <Button type="pink" onClick={handleEdit}>
          pink
        </Button>
      </div>

      <div>
        <BottomButton type="pink"> pink </BottomButton>
      </div>

      <div className="mt-4">
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={handleOpenModal}>
          모달
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        모달 내용 넣기
      </Modal>
    </div>
  );
};

export default TestPage;
