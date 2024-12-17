import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImageModal from "../common/modal/ImageModal";

function ShopPortfolio({ portfolios }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

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
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? portfolios.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === portfolios.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="m-5">
        <p className="mb-1 pt-3 text-lg font-semibold">포트폴리오</p>
        {portfolios.length === 0 ? (
          <div className="mx-auto w-full rounded-xl bg-gray-200 p-2">
            <p className="text-center text-sm text-gray-600">등록된 사진이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {portfolios.map((portfolio, index) => (
              <div key={index}>
                <img
                  className="h-28 w-28 cursor-pointer rounded-md object-cover"
                  src={portfolio}
                  alt={`포트폴리오 이미지 ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal with Navigation */}
      {portfolios.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {portfolios.length > 1 && (
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
              src={portfolios[selectedImageIndex]}
              alt={`선택된 포트폴리오 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {portfolios.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {portfolios.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
    </>
  );
}

export default ShopPortfolio;
