import { getCustomerQuoteDetail } from "@/queries/quoteQuery";
import React, { useEffect, useState } from "react";
import { BiWon } from "react-icons/bi";

function CustomerQuoteDetail({ quotesId, onDataLoad }) {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        setIsLoading(true);
        const data = await getCustomerQuoteDetail(quotesId);
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
    <div className="mx-auto mb-[65px] mt-[--header-height] max-w-lg bg-white px-6">
      {/* 매장 및 디자이너 정보 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Designer.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">매장 · 디자이너 정보</h2>
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
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Schedule.svg" alt="Schedule Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">미용 일시</h2>
      </div>
      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p>
          {formattedDate} {formattedTime}
        </p>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Corgi.svg" alt="Dog Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">반려견 정보</h2>
      </div>
      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div className="flex items-center">
          <div className="mr-4 self-center">
            <img
              src={quoteData.quoteRequest.dogImage}
              alt="반려견 사진"
              className="h-28 w-28 rounded-lg object-cover"
            />
            <p className="mt-1 text-center font-semibold">{quoteData.quoteRequest.dogName}</p>
          </div>
          <div className="self-center text-sm leading-normal">
            {/* [ ] 견종 업데이트 (API 수정 or API 두 개 사용) */}
            {/* <p>견종: {quoteData.quoteRequest.dogBreed}</p> */}
            <p>무게: {quoteData.quoteRequest.dogWeight}</p>
            <p>나이: {quoteData.quoteRequest.dogAge}</p>
            <p>성별: {quoteData.quoteRequest.dogGender === "MALE" ? "남아" : "여아"}</p>
            <p>중성화 여부: {quoteData.quoteRequest.neutering ? "Y" : "N"}</p>
            <p>미용 신청 여부: {quoteData.quoteRequest.experience ? "Y" : "N"}</p>
            <p>특이사항: {quoteData.quoteRequest.significant}</p>
          </div>
        </div>
      </div>

      {/* 요청 내용 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Note.svg" alt="Note Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">요청 내용</h2>
      </div>
      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <p>{quoteData.quoteRequest.requestContent}</p>
      </div>

      {/* 첨부 사진 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Photos.svg" alt="Photos Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">첨부 사진</h2>
      </div>
      <div className="mb-6 rounded-lg">
        <div className="grid grid-cols-3 gap-3">
          {quoteData.quoteRequest.requestImage.length > 0 ? (
            quoteData.quote.requestImage.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Uploaded ${index}`} className="h-28 w-28 rounded-lg object-cover" />
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">첨부된 사진이 없습니다.</p>
          )}
        </div>
      </div>

      <hr className="mb-6 border-2 border-gray-200" />

      {/* 견적 설명 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Description.svg" alt="Photos Icon" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">견적 설명</h2>
      </div>
      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <p>{quoteData.quote.quoteContent}</p>
      </div>

      {/* 금액 */}
      <div className="mb-6 flex justify-between">
        <div className="flex items-center space-x-1">
          <BiWon className="text-lg" />
          <h2 className="text-lg font-semibold">금액</h2>
        </div>
        <p className="mt-1 text-lg font-semibold leading-none">{Number(quoteData.quote.cost).toLocaleString()} 원</p>
      </div>
    </div>
  );
}

export default CustomerQuoteDetail;
