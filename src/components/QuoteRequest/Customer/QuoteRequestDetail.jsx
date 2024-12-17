import { getCustomerRequestDetail } from "@/queries/quoteRequestQuery";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Designer, Region, Schedule, Corgi, Note, Photos } from "/public/Icons";
import ImageModal from "@/components/common/modal/ImageModal";

const QuoteRequestDetail = ({ requestId }) => {
  const [requestData, setRequestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getCustomerRequestDetail(requestId);
        setRequestData(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequestDetail();
  }, [requestId]);

  // Handle opening image modal
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImgModalOpen(true);
  };

  // Handle closing image modal
  const handleCloseImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedImageIndex(0);
  };

  // Navigate to previous image
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? requestData.requestImages.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === requestData.requestImages.length - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error loading request details</div>;
  }

  if (!requestData) {
    return <div className="py-10 text-center">No request details found</div>;
  }

  // Format date and time
  const formattedDate = new Date(requestData.beautyDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = new Date(requestData.beautyDate).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <div className="mx-auto mb-5 mt-[var(--header-height)] max-w-lg bg-white px-6">
        {/* 지역 또는 매장/디자이너 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img
            src={requestData.requestType === "010" ? Region : Designer}
            alt="Location or Shop Icon"
            className="h-5 w-5"
          />
          <h2 className="text-lg font-semibold leading-none">
            {requestData.requestType === "010" ? "지역" : "매장 · 디자이너 정보"}
          </h2>
        </div>

        <div className="mb-6 rounded-lg border border-main-400 p-4">
          {requestData.requestType === "010" ? (
            <p>{requestData.region}</p>
          ) : (
            <div className="flex items-center">
              <img src={requestData.groomer.shopImage} alt="매장 로고" className="mr-3 h-20 w-20 rounded-lg" />
              <div>
                <p className="text-[15px] font-semibold leading-[18px]">{requestData.groomer.shopName}</p>
                <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">
                  {requestData.groomer.address}
                </p>
                <p className="text-[15px] font-semibold leading-[18px]">{requestData.groomer.groomerName} 디자이너</p>
                <p className="text-sm leading-[18px] text-gray-600">{requestData.groomer.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* 미용 일시 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Schedule} alt="Schedule Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">미용 일시</h2>
        </div>

        <div className="mb-6 rounded-lg border border-main-400 p-4">
          <p>
            {formattedDate} {formattedTime}
          </p>
        </div>

        {/* 반려견 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Corgi} alt="Dog Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">반려견 정보</h2>
        </div>

        <div className="mb-6 rounded-lg border border-main-400 p-4 pb-3">
          <div className="flex items-start">
            <div className="mr-4 self-center">
              <img src={requestData.dogProfileImage} alt="반려견 사진" className="h-28 w-28 rounded-lg object-cover" />
              <p className="mt-1 text-center font-semibold">{requestData.dogName}</p>
            </div>
            <div className="text-sm leading-snug">
              <p>
                <span className="mr-2 font-semibold">견종</span>
                {requestData.dogBreed}
              </p>
              <p>
                <span className="mr-2 font-semibold">무게</span>
                {requestData.dogWeight}살
              </p>
              <p>
                <span className="mr-2 font-semibold">나이</span>
                {requestData.dogAge}
              </p>
              <p>
                <span className="mr-2 font-semibold">성별</span>
                {requestData.dogGender === "MALE" ? "남아" : "여아"}
              </p>
              <p>
                <span className="mr-2 font-semibold">중성화 여부</span>
                {requestData.neutering ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">미용 신청 여부</span>
                {requestData.experience ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">특이사항</span>
                {requestData.significant}
              </p>
            </div>
          </div>
        </div>

        {/* 요청 내용 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Note} alt="Note Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">요청 내용</h2>
        </div>

        <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
          <p>{requestData.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Photos} alt="Photos Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
        </div>
        <div className="rounded-lg">
          {requestData.requestImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {requestData.requestImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="h-28 w-28 cursor-pointer rounded-lg object-cover"
                    onClick={() => handleImageClick(index)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-28 w-full items-center justify-center">
              <p className="text-center text-gray-500">첨부된 사진이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal with Navigation */}
      {requestData.requestImages && requestData.requestImages.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseImgModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {requestData.requestImages.length > 1 && (
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
              src={requestData.requestImages[selectedImageIndex]}
              alt={`선택된 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {requestData.requestImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {requestData.requestImages.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
    </>
  );
};

export default QuoteRequestDetail;
