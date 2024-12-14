//TotalQuoteRequestList.jsx
import { formatDate } from "@/utils/formatDate";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Region, Schedule, Note } from "/public/Icons";

function TotalQuoteRequestList({ Infos }) {
  return (
    <>
      {Infos?.map((Info) => {
        return <CustomerEstimate Info={Info} />;
      })}
    </>
  );
}

const CustomerEstimate = ({ Info }) => {
  const navigate = useNavigate();

  const getStatusProps = () => {
    switch (Info.requestStatus) {
      case "요청":
        return {
          className: "bg-main text-white",
          text: "견적 요청 중"
        };
      case "거절":
      case "마감":
      case "제안 완료":
        return {
          className: "bg-gray-200",
          text: "완료"
        };
      default:
        return {
          className: "",
          text: Info.status
        };
    }
  };

  const { className: statusClassName, text: statusText } = getStatusProps();

  return (
    <div className="m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.image} alt="고객 반려견" className="mr-2.5 aspect-square h-24 w-24 rounded-md object-cover" />
        <div className="w-full">
          <div className="mb-1.5 flex justify-between">
            <p className="px-1 text-[16px] font-semibold leading-snug">{Info.dogName}</p>
            <span className={`flex items-center rounded px-2 text-xs ${statusClassName}`}>{statusText}</span>{" "}
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src={Region} alt="Description" className="mr-2 h-5 w-5" />
            <p>{Info.region}</p>
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src={Schedule} alt="Description" className="mr-2 h-5 w-5" />
            <p>{formatDate(Info.beautyDate)}</p>
          </div>
          <div className="flex items-center text-sm">
            <img src={Note} alt="Description" className="mr-2 h-5 w-5" />
            <p className="line-clamp-1">{Info.requestContent}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div
          onClick={() => {
            navigate(`/customer/quotes/request/detail/${0}`); // TODO: quoteRequestId
          }}
          className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
        >
          견적 요청 보기
        </div>
        <div className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm">
          견적 그만 받기
        </div>
      </div>
    </div>
  );
};

export default TotalQuoteRequestList;
