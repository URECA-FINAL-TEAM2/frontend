import { getGroomerRequestDetail } from "@/queries/quoteRequestQuery";
import { formatDate } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { User, Schedule, Corgi, Note, Photos, Description, Won } from "/public/Icons";
import BottomButton from "../common/button/BottomButton";
import { insertQuote } from "@/queries/quoteQuery";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageModal from "../common/modal/ImageModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function GroomerQuoteForm({ requestId }) {
  const [requestInfo, setRequestInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [quoteContent, setQuoteContent] = useState("");
  const { id } = useAuthStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getGroomerRequestDetail(requestId);
        setRequestInfo(data);
      } catch (error) {
        console.error("Error fetching requestInfo:", error);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequestInfo();
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
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? requestInfo.requestImages.length - 1 : prevIndex - 1));
  };

  // Navigate to next image
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === requestInfo.requestImages.length - 1 ? 0 : prevIndex + 1));
  };

  // Format date and time
  const formattedDate = requestInfo?.beautyDate
    ? new Date(requestInfo.beautyDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "날짜 없음";

  const formattedTime = requestInfo?.beautyDate
    ? new Date(requestInfo.beautyDate).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "시간 없음";

  // Format cost
  const formatNumber = (num) => {
    // Remove any non-digit characters
    const cleanedNum = num.replace(/[^\d]/g, "");

    // Format with commas
    return cleanedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, "");

    // Ensure only numeric input
    if (/^\d*$/.test(inputValue)) {
      setValue(formatNumber(inputValue));
    }

    const numericValue = Number(inputValue);
    setIsAmountError(numericValue > 0 && numericValue < 1000);
  };

  const handleBlur = (e) => {
    const numericValue = e.target.value.replace(/,/g, "");
    console.log("Numeric Value:", numericValue);
  };

  const handleSubmitButton = async () => {
    const numericValue = Number(value.replace(/,/g, ""));

    if (numericValue < 1000) {
      setIsAmountError(true);
      return;
    }

    await insertQuote({
      requestId: Number(requestId),
      groomerId: id.groomerId,
      dogId: requestInfo.dogId,
      quoteContent: quoteContent,
      quoteCost: numericValue,
      beautyDate: requestInfo.beautyDate
    });

    toast("견적서가 발송되었습니다.", {
      icon: "📨" // TODO
    });
    navigate("/groomer/quotes");
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error loading request details</div>;
  }

  if (!requestInfo) {
    return <div className="py-10 text-center">No request details found</div>;
  }

  const isSubmitEnabled = quoteContent.trim() !== "" && value.trim() !== "" && Number(value.replace(/,/g, "")) >= 1000;

  return (
    <>
      <div className="mx-auto mb-[79px] mt-[--header-height] max-w-lg bg-white px-6">
        {/* 55px : Bottom Button height + 24px (mb-6) */}
        {/* 고객 정보 */}
        {/* <div className="mb-1.5 flex items-center space-x-1">
        <img src={User} alt="Schedule Icon" className="h-5 w-5" />
        <h2 className="leading-none text-lg font-semibold">고객 정보</h2>
      </div> */}
        <div className="mb-6 flex rounded-lg border border-main-400 p-4 pb-3.5">
          <img
            src={requestInfo.userProfileImage}
            alt="고객 프로필"
            className="mr-3 h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <p className="px-0.5 font-semibold leading-[1.1]">{requestInfo.userName} 고객님</p>
            <span className="rounded-md bg-main-100 px-1 py-[1px] text-xs text-main">
              {formatDate(requestInfo.expiryDate)}까지
            </span>
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
        <div className="mb-6 rounded-lg border border-main-400 p-4">
          <div className="flex items-center">
            <div className="mr-4 self-center">
              <img
                src={requestInfo.dogProfileImage}
                alt="반려견 사진"
                className="h-28 w-28 min-w-28 rounded-lg object-cover"
              />
              <p className="mt-1 text-center font-semibold">{requestInfo.dogName}</p>
            </div>
            <div className="text-sm leading-snug">
              <p>
                <span className="mr-2 font-semibold">견종</span>
                {requestInfo.dogBreed}
              </p>
              <p>
                <span className="mr-2 font-semibold">무게</span>
                {requestInfo.dogWeight}kg
              </p>
              <p>
                <span className="mr-2 font-semibold">나이</span>
                {requestInfo.dogAge}살
              </p>
              <p>
                <span className="mr-2 font-semibold">성별</span>
                {requestInfo.dogGender === "MALE" ? "남아" : "여아"}
              </p>
              <p>
                <span className="mr-2 font-semibold">중성화 여부</span>
                {requestInfo.neutering ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">미용 신청 여부</span>
                {requestInfo.experience ? "Y" : "N"}
              </p>
              <p>
                <span className="mr-2 font-semibold">특이사항</span>
                {requestInfo.significant}
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
          <p>{requestInfo.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Photos} alt="Photos Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
        </div>
        <div className="mb-6 rounded-lg">
          {requestInfo.requestImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {requestInfo.requestImages.map((image, index) => (
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
          <textarea
            placeholder="서비스 진행 방식, 가격 책정 방식 등을 상세하게 작성해주세요."
            className="w-full resize-none rounded-lg border-none p-2 focus:outline-none"
            value={quoteContent}
            onChange={(event) => setQuoteContent(event.target.value)}
            rows={4}
          />
        </div>

        {/* 금액 */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <img src={Won} alt="Won Icon" className="h-5 w-5" />
            <h2 className="text-lg font-semibold leading-none">금액</h2>
          </div>
          <div>
            <div className="flex">
              <div className="mr-1 w-48 rounded-lg border border-main-400 leading-tight">
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full resize-none rounded-lg border-none px-0.5 pb-0 pt-1 text-end focus:outline-none"
                />
              </div>
              <p className="mt-1 text-xl font-semibold leading-none">원</p>
            </div>
            {isAmountError && <p className="mt-1 text-xs text-red-500">금액은 1000원 이상으로 설정해야 합니다.</p>}
          </div>
        </div>

        {isSubmitEnabled ? (
          <BottomButton onClick={handleSubmitButton}>견적서 보내기</BottomButton>
        ) : (
          <BottomButton styleType="gray">견적서 보내기</BottomButton>
        )}
      </div>

      {/* Image Modal with Navigation */}
      {requestInfo.requestImages && requestInfo.requestImages.length > 0 && (
        <ImageModal isOpen={isImgModalOpen} onClose={handleCloseImgModal}>
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation buttons for multiple images */}
            {requestInfo.requestImages.length > 1 && (
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
              src={requestInfo.requestImages[selectedImageIndex]}
              alt={`선택된 이미지 ${selectedImageIndex + 1}`}
              className="w-[300px] rounded-md object-contain"
            />

            {/* Image Counter */}
            {requestInfo.requestImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 transform rounded-full bg-gray-200 bg-opacity-50 px-3 py-1 text-sm text-white">
                {selectedImageIndex + 1} / {requestInfo.requestImages.length}
              </div>
            )}
          </div>
        </ImageModal>
      )}
    </>
  );
}

export default GroomerQuoteForm;
