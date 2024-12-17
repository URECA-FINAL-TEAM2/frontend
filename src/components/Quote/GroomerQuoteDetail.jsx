import { getGroomerQuoteDetail } from "@/queries/quoteQuery";
import React, { useEffect, useState } from "react";
import { User, Schedule, Corgi, Note, Photos, Description, Won } from "/public/Icons";
import useAuthStore from "@/store/authStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImageModal from "../common/modal/ImageModal";

function GroomerQuoteDetail({ requestId }) {
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
        const data = await getGroomerQuoteDetail(id.groomerId, requestId);
        setQuoteData(data);
      } catch (error) {
        console.error("Error fetching Quote Data:", error);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuoteData();
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
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? quoteData.quote.requestImage.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === quoteData.quote.requestImage.length - 1 ? 0 : prevIndex + 1));
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
      <div className="mx-auto mb-7 mt-[--header-height] max-w-lg bg-white px-6">
        {/* 고객 정보 */}
        {/* <div className="mb-1.5 flex items-center space-x-1">
        <img src={User} alt="Schedule Icon" className="h-5 w-5" />
        <h2 className="leading-none text-lg font-semibold">고객 정보</h2>
      </div> */}
        <div className="mb-6 flex rounded-lg bg-main-100 p-4 pb-3.5">
          <img
            src={quoteData.customer.profileImage}
            alt="고객 프로필"
            className="mr-3 h-5 w-5 rounded-lg object-cover"
          />
          <p className="px-0.5 font-semibold leading-[1.1]">{quoteData.customer.userName} 고객님</p>
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
        <div className="mb-6 rounded-lg border border-main-400 p-4">
          <div className="flex items-center">
            <div className="mr-4 self-center">
              <img
                src={quoteData.dog.dogProfileImage}
                alt="반려견 사진"
                className="h-28 w-28 rounded-lg object-cover"
              />
              <p className="mt-1 text-center font-semibold">{quoteData.dog.dogName}</p>
            </div>
            <div className="text-sm leading-snug">
              <p>
                <span className="mr-2 font-semibold">견종</span>
                {quoteData.dog.dogBreed}
              </p>
              <p>
                <span className="mr-2 font-semibold">무게</span>
                {quoteData.dog.dogWeight}
              </p>
              <p>
                <span className="mr-2 font-semibold">나이</span>
                {quoteData.dog.dogAge}살
              </p>
              <p>
                <span className="mr-2 font-semibold">성별</span>
                {quoteData.dog.dogGender === "MALE" ? "남아" : "여아"}
              </p>
              <p>
                <span className="mr-2 font-semibold">중성화 여부</span>
                {quoteData.dog.neutering ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">미용 신청 여부</span>
                {quoteData.dog.experience ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">특이사항</span>
                {quoteData.dog.significant}
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
          <p>{quoteData.quote.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Photos} alt="Photos Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
        </div>
        <div className="mb-6 rounded-lg">
          {quoteData.quote.requestImageUrl.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {quoteData.quote.requestImageUrl.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
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
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <img src={Won} alt="Won Icon" className="h-5 w-5" />
            <h2 className="text-lg font-semibold leading-none">금액</h2>
          </div>
          <p className="mt-1 text-xl font-semibold leading-none">
            {Number(quoteData.quote.quoteCost).toLocaleString()} 원
          </p>
        </div>
      </div>

      {/* Image Modal with Navigation */}
      {quoteData.quote.requestImageUrl && quoteData.quote.requestImageUrl.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseImgModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {quoteData.quote.requestImageUrl.length > 1 && (
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
              src={quoteData.quote.requestImageUrl[selectedImageIndex]}
              alt={`선택된 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {quoteData.quote.requestImageUrl.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {quoteData.quote.requestImageUrl.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
    </>
  );
}

export default GroomerQuoteDetail;
