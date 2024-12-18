import { getCustomerQuoteDetail } from "@/queries/quoteQuery";
import React, { useEffect, useState } from "react";
import { Designer, Schedule, Corgi, Note, Photos, Description, Won, Banknotes } from "/public/Icons";
import useAuthStore from "@/store/authStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ImageModal from "../common/modal/ImageModal";

function CustomerQuoteDetail({ quotesId, onDataLoad }) {
  const { id } = useAuthStore();
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        setIsLoading(true);
        const data = await getCustomerQuoteDetail(id.customerId, quotesId);
        setQuoteData(data);
        onDataLoad({ amount: data.quote.cost, shopName: data.groomer.shopName });
      } catch (error) {
        console.error("Error fetching Quote Data:", error);
        setError(error); // Fix: consistent variable name
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuoteData();
  }, [quotesId, onDataLoad]);

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
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? quoteData.quoteRequest.requestImage.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === quoteData.quoteRequest.requestImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error loading request details</div>;
  }

  if (!quoteData) {
    return <div className="py-10 text-center">No request details found</div>;
  }

  // Format date and time
  const formattedDate = new Date(quoteData.quote.beautyDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = new Date(quoteData.quote.beautyDate).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <div className="mx-auto mb-[70px] mt-[--header-height] max-w-lg bg-white px-6">
        {/* 매장 및 디자이너 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Designer} alt="Description" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">매장 · 디자이너 정보</h2>
        </div>

        <div className="mb-6 rounded-lg border border-main-400 p-3">
          <div className="flex items-center">
            <img src={quoteData.groomer.shopLogo} alt="매장 로고" className="mr-3 h-20 w-20 rounded-lg" />
            <div>
              <p className="text-[15px] font-semibold leading-[18px]">{quoteData.groomer.shopName}</p>
              <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">{quoteData.groomer.address}</p>
              <p className="text-[15px] font-semibold leading-[18px]">{quoteData.groomer.groomerName} 디자이너</p>
              <p className="text-sm leading-[18px] text-gray-600">{quoteData.groomer.phone}</p>
            </div>
          </div>
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
          <div className="flex items-center">
            <div className="mr-4 self-center">
              <img
                src={quoteData.quoteRequest.dogImage}
                alt="반려견 사진"
                className="h-28 w-28 min-w-28 rounded-lg object-cover"
              />
              <p className="mt-1 text-center font-semibold">{quoteData.quoteRequest.dogName}</p>
            </div>
            <div className="text-sm leading-snug">
              <p>
                <span className="mr-2 font-semibold">견종</span>
                {quoteData.quoteRequest.dogBreed}
              </p>
              <p>
                <span className="mr-2 font-semibold">무게</span>
                {quoteData.quoteRequest.dogWeight}kg
              </p>
              <p>
                <span className="mr-2 font-semibold">나이</span>
                {quoteData.quoteRequest.dogAge}살
              </p>
              <p>
                <span className="mr-2 font-semibold">성별</span>
                {quoteData.quoteRequest.dogGender === "MALE" ? "남아" : "여아"}
              </p>
              <p>
                <span className="mr-2 font-semibold">중성화 여부</span>
                {quoteData.quoteRequest.neutering ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">미용 경험 여부</span>
                {quoteData.quoteRequest.experience ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">특이사항</span>
                {quoteData.quoteRequest.significant}
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
          <p>{quoteData.quoteRequest.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Photos} alt="Photos Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
        </div>
        <div className="mb-6 rounded-lg">
          {quoteData.quoteRequest.requestImage.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {quoteData.quoteRequest.requestImage.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded Request Img ${index}`}
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

        <hr className="mb-6 border-2 border-gray-200" />

        {/* 견적 설명 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Description} alt="Description Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">견적 설명</h2>
        </div>
        <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
          <p>{quoteData.quote.quoteContent}</p>
        </div>

        {/* 금액 */}
        <div className="mb-1 flex justify-between">
          <div className="flex items-center space-x-1">
            <img src={Won} alt="Won Icon" className="h-5 w-5" />
            <h2 className="text-lg font-semibold leading-none">금액</h2>
          </div>
          <p className="mt-1 px-0.5 text-lg font-semibold leading-none">
            {Number(quoteData.quote.cost).toLocaleString()} 원
          </p>
        </div>

        {/* 예약금 */}
        <div className="mb-3 flex justify-between">
          <div className="flex items-center space-x-1 pt-1">
            <img src={Banknotes} alt="Banknotes Icon" className="h-5 w-5" />
            <h2 className="text-lg font-semibold leading-none">예약금 (20%)</h2>
          </div>
          <p className="mt-1 rounded-lg bg-main-200 px-0.5 pb-[1px] pt-[2px] text-lg font-semibold leading-none">
            {Math.floor(Number(quoteData.quote.cost) * 0.2).toLocaleString()} 원
          </p>
        </div>
        <div className="rounded-lg bg-main-100 p-2 text-center text-sm leading-tight">
          <p>
            <span className="font-semibold">예약금</span>만 결제하면 예약이 <span className="font-semibold">확정</span>
            됩니다.
          </p>
          <p>
            남은 금액은 <span className="font-semibold">현장에서 결제</span>할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Image Modal with Navigation */}
      {quoteData.quoteRequest.requestImage && quoteData.quoteRequest.requestImage.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseImgModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {quoteData.quoteRequest.requestImage.length > 1 && (
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
              src={quoteData.quoteRequest.requestImage[selectedImageIndex]}
              alt={`선택된 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {quoteData.quoteRequest.requestImage.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {quoteData.quoteRequest.requestImage.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
    </>
  );
}

export default CustomerQuoteDetail;
