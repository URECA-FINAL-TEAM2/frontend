import React, { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const quoteRequests = [
  {
    quoteRequestId: 1,
    petName: "두부",
    petImage: "https://picsum.photos/200",
    status: "요청",
    shopName: "댕댕살롱",
    groomerName: "가영",
    beautyDate: "2024-12-09T19:48:20.404Z",
    requestContent: "식빵컷",
    rejectionReason: null,
    quotesId: null
  },
  {
    quoteRequestId: 2,
    petName: "콩이",
    petImage: "https://picsum.photos/200",
    status: "마감",
    shopName: "멍멍펫",
    groomerName: "금강",
    beautyDate: "2024-11-19T00:00:00",
    requestContent: "둥글둥글하게 부탁드려요",
    rejectionReason: null,
    quotesId: null
  },
  {
    quoteRequestId: 3,
    petName: "콩이",
    petImage: "https://picsum.photos/200",
    status: "거절",
    shopName: "멍멍펫",
    groomerName: "금강",
    beautyDate: "2024-11-19T00:00:00",
    requestContent: "둥글둥글하게 부탁드려요",
    rejectionReason: "현재 예약이 꽉 차 있어 견적을 드릴 수 없습니다.",
    quotesId: null
  },
  {
    quoteRequestId: 4,
    petName: "두부",
    petImage: "https://picsum.photos/200",
    status: "제안 완료",
    shopName: "댕댕살롱",
    groomerName: "가영",
    beautyDate: "2024-12-09T19:48:20.404Z",
    requestContent: "식빵컷",
    rejectionReason: null,
    quotesId: 1
  }
];

function ShopQuoteRequestList() {
  return (
    <>
      {quoteRequests.map((request) => (
        <CustomerEstimate key={request.quoteRequestId} Info={request} />
      ))}
    </>
  );
}

const CustomerEstimate = ({ Info }) => {
  const navigate = useNavigate();
  const [showRejectionReason, setShowRejectionReason] = useState(false);

  const getStatusProps = () => {
    switch (Info.status) {
      case "요청":
        return {
          className: "bg-main text-white",
          text: "견적 요청 중"
        };
      case "거절":
        return {
          className: "bg-gray-200 cursor-pointer",
          text: "견적 거절됨",
          icon: <BsQuestionCircleFill className="text-gray-500" />
        };
      case "마감":
        return {
          className: "bg-gray-200",
          text: "기한 마감됨"
        };
      case "제안 완료":
        return {
          className: "bg-main-100 text-main",
          text: "견적서 수령"
        };
      default:
        return {
          className: "",
          text: Info.status
        };
    }
  };

  const { className: statusClassName, text: statusText, icon: statusIcon } = getStatusProps();

  return (
    <div className="relative m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.petImage} alt="고객 반려견" className="mr-2.5 aspect-square h-24 w-24 rounded-md object-cover" />
        <div className="w-full">
          <div className="mb-1.5 flex justify-between">
            <p className="px-1 text-[16px] font-semibold leading-snug">{Info.petName}</p>
            {Info.status === "거절" ? (
              <div className="relative">
                <span
                  className={`flex items-center rounded px-2 py-[3px] text-xs ${statusClassName}`}
                  onClick={() => setShowRejectionReason(!showRejectionReason)}
                >
                  {statusText}
                  {statusIcon && <span className="ml-0.5 text-xs">{statusIcon}</span>}
                </span>
                {showRejectionReason && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <div className="mb-2 flex items-center">
                      <BsQuestionCircleFill className="mr-2 text-gray-500" />
                      <h3 className="text-sm font-semibold">거절 사유</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {Info.rejectionReason || "거절 사유가 제공되지 않았습니다."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <span className={`flex items-center rounded px-2 text-xs ${statusClassName}`}>
                {statusText}
                {statusIcon && <span className="ml-0.5 text-xs">{statusIcon}</span>}
              </span>
            )}
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src="/public/Icons/Designer.svg" alt="Designer" className="mr-1 h-5 w-5" />
            <p>
              {Info.shopName} - {Info.groomerName} 디자이너
            </p>
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src="/public/Icons/Schedule.svg" alt="Schedule" className="mr-1 h-5 w-5" />
            <p>{formatDate(Info.beautyDate)}</p>
          </div>
          <div className="flex items-center text-sm">
            <img src="/public/Icons/Note.svg" alt="Description" className="mr-1 h-5 w-5" />
            <p className="line-clamp-1">{Info.requestContent}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        {Info.status === "제안 완료" ? (
          <div
            onClick={() => {
              navigate(`/customer/quotes/detail/${Info.quotesId}`);
            }}
            className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-main-200 text-center text-sm text-main-600"
          >
            견적서 보기
          </div>
        ) : (
          <div
            onClick={() => {
              navigate(`/customer/quotes/request/detail/${Info.quoteRequestId}`);
            }}
            className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
          >
            견적 요청 보기
          </div>
        )}
        <div className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-main text-center text-sm text-white">
          채팅하기
        </div>
      </div>
    </div>
  );
};

export default ShopQuoteRequestList;
