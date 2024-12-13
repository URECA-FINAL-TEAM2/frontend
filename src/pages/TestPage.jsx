import { useState } from "react";
import Button from "../components/common/button/Button";
import BottomButton from "../components/common/button/BottomButton";
// import Modal from "../components/common/modal/modal";
import RegionSelectModal from "../components/common/modal/RegionSelectModal";
import StaticMap from "../components/Map/StaticMap";
import img from "/Test/dog.jpg";
import ImageModal from "@/components/common/modal/ImageModal";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsImgModalOpen(false);
  };

  // const handleConfirmModal = () => {
  //   alert("확인");
  //   setIsModalOpen(false);
  // };

  const handleConfirmRegionModal = (selectedRegion) => {
    const message =
      `시도ID: ${selectedRegion.sido}\n` +
      `시도명: ${selectedRegion.sidoName}\n` +
      `시군구ID: ${selectedRegion.sigungu}\n` +
      `시군구명: ${selectedRegion.sigunguName}`;

    alert(message);
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

      {/* <div className="mt-4">
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
      </Modal> */}
      <div className="mt-4">
        <button className="rounded-md bg-main px-4 py-2 text-white" onClick={handleOpenModal}>
          지역 선택 모달
        </button>
      </div>
      <RegionSelectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRegionModal}
      ></RegionSelectModal>

      <div className="mx-auto h-[200px] w-[360px]">
        <StaticMap location={{ lat: 37.5545, lng: 126.978 }} shopName="매장명" />
      </div>

      <button onClick={() => setIsImgModalOpen(true)}>이미지 모달</button>

      <ImageModal isOpen={isImgModalOpen} onClose={handleCloseModal}>
        <div className="relative flex w-full items-center justify-center">
          <img src={img} alt="Selected" className="h-[280px] rounded-md object-contain" />
        </div>
      </ImageModal>
    </div>
  );
};

export default TestPage;
