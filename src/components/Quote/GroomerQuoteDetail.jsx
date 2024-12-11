import { getGroomerQuoteDetail } from "@/queries/quoteQuery";
import React, { useEffect, useState } from "react";
import { User, Schedule, Corgi, Note, Photos, Description, Won } from "/public/Icons";

function GroomerQuoteDetail({ requestId }) {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        setIsLoading(true);
        const data = await getGroomerQuoteDetail(requestId);
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
    <div className="mx-auto mb-7 mt-[--header-height] max-w-lg bg-white px-6">
      {/* 고객 정보 */}
      {/* <div className="mb-1.5 flex items-center space-x-1">
        <img src={User} alt="Schedule Icon" className="h-5 w-5" />
        <h2 className="leading-none text-lg font-semibold">고객 정보</h2>
      </div> */}
      <div className="mb-6 flex rounded-lg bg-main-100 p-4 pb-3.5">
        <img src={quoteData.customer.profileImage} alt="고객 프로필" className="mr-3 h-5 w-5 rounded-lg object-cover" />
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
            <img src={quoteData.dog.dogProfileImage} alt="반려견 사진" className="h-28 w-28 rounded-lg object-cover" />
            <p className="mt-1 text-center font-semibold">{quoteData.dog.dogName}</p>
          </div>
          <div className="self-center text-sm leading-normal">
            <p>견종: {quoteData.dog.dogBreed}</p>
            <p>무게: {quoteData.dog.dogWeight}</p>
            <p>나이: {quoteData.dog.dogAge}</p>
            <p>성별: {quoteData.dog.dogGender === "MALE" ? "남아" : "여아"}</p>
            <p>중성화 여부: {quoteData.dog.neutering ? "Y" : "N"}</p>
            <p>미용 신청 여부: {quoteData.dog.experience ? "Y" : "N"}</p>
            <p>특이사항: {quoteData.dog.significant}</p>
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
        <div className="grid grid-cols-3 gap-3">
          {quoteData.quote.requestImageUrl.length > 0 ? (
            quoteData.quote.requestImageUrl.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Uploaded Request Img ${index}`} className="h-28 w-28 rounded-lg object-cover" />
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">첨부된 사진이 없습니다.</p>
          )}
        </div>
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
  );
}

export default GroomerQuoteDetail;
