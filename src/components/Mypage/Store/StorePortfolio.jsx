import { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
const StorePortfolio = ({ portfolioImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]); // 이미지 배열
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 선택된 이미지 인덱스

  const handleOpenModal = (index) => {
    setCurrentIndex(index); // 클릭된 이미지의 인덱스를 설정
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 이미지로 이동
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // 이전 이미지로 이동
  };

  useEffect(() => {
    setImages(portfolioImg);
  }, []);

  return (
    <>
      <div className="mx-auto mb-20 mt-5 grid w-10/12 grid-cols-3">
        {images.map((img, index) => (
          <div
            onClick={() => handleOpenModal(index)} // 이미지 클릭 시 모달 열기
            key={index}
            className="relative mx-auto my-2 w-[100px] cursor-pointer"
          >
            <img className="mx-auto h-[100px] w-[100px] rounded-md text-center" src={img} alt={`review${index}`} />
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} handlePrev={handlePrev}>
        <div className="relative mt-3 flex h-[300px] w-full items-center justify-center">
          <button onClick={handlePrev} className="absolute -left-4 top-1/2 -translate-y-1/2 transform p-2">
            <MdOutlineArrowBackIosNew size={20} />
          </button>
          <img src={images[currentIndex]} alt="Selected" className="h-[280px] rounded-md object-contain" />
          <button onClick={handleNext} className="absolute -right-4 top-1/2 -translate-y-1/2 transform p-2">
            <MdOutlineArrowForwardIos size={20} />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default StorePortfolio;

const Modal = ({ isOpen = false, onClose, children, handlePrev }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-[360px] rounded-lg bg-white shadow-md">
        <button onClick={onClose} className="absolute right-3 top-3 mb-5 text-xl font-bold text-gray-600">
          ✕
        </button>

        <div className="flex flex-col items-center justify-between">{children}</div>
      </div>
    </div>
  );
};
