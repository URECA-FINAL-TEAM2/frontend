import { getCustomerRequestDetail } from "@/queries/quoteRequestQuery";
import React, { useState, useEffect } from "react";

const QuoteRequestDetail = ({ requestId }) => {
  const [requestData, setRequestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="mx-auto mb-5 mt-[var(--header-height)] max-w-lg bg-white px-6">
      {/* 지역 또는 매장/디자이너 정보 */}
      <div className="mb-1.5 flex items-center space-x-1">
        <img
          src={requestData.requestType === "010" ? "/public/Icons/Region.svg" : "/public/Icons/Designer.svg"}
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
              <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">{requestData.groomer.address}</p>
              <p className="text-[15px] font-semibold leading-[18px]">{requestData.groomer.groomerName} 디자이너</p>
              <p className="text-sm leading-[18px] text-gray-600">{requestData.groomer.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* 미용 일시 */}
      <div className="mb-1.5 flex items-center space-x-1">
        <img src="/public/Icons/Schedule.svg" alt="Schedule Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p>
          {formattedDate} {formattedTime}
        </p>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-1.5 flex items-center space-x-1">
        <img src="/public/Icons/Corgi.svg" alt="Dog Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">반려견 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div className="flex items-start">
          <div className="mr-4 self-center">
            <img src={requestData.dogProfileImage} alt="반려견 사진" className="h-28 w-28 rounded-lg object-cover" />
            <p className="mt-1 text-center font-semibold">{requestData.dogName}</p>
          </div>
          <div className="text-sm leading-normal">
            <p>견종: {requestData.dogBreed}</p>
            <p>무게: {requestData.dogWeight}</p>
            <p>나이: {requestData.dogAge}</p>
            <p>성별: {requestData.dogGender === "MALE" ? "남아" : "여아"}</p>
            <p>중성화 여부: {requestData.neutering ? "Y" : "N"}</p>
            <p>미용 신청 여부: {requestData.experience ? "Y" : "N"}</p>
            <p>특이사항: {requestData.significant}</p>
          </div>
        </div>
      </div>

      {/* 요청 내용 */}
      <div className="mb-1.5 flex items-center space-x-1">
        <img src="/public/Icons/Note.svg" alt="Note Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <p>{requestData.requestContent}</p>
      </div>

      {/* 첨부 사진 */}
      <div className="mb-1.5 flex items-center space-x-1">
        <img src="/public/Icons/Photos.svg" alt="Photos Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
      </div>

      <div className="rounded-lg">
        <div className="grid grid-cols-3 gap-3">
          {requestData.requestImages.length > 0 ? (
            requestData.requestImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Uploaded ${index}`} className="h-28 w-28 rounded-lg object-cover" />
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">첨부된 사진이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestDetail;
