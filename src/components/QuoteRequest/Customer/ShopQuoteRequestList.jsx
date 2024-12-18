import React, { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { BsQuestionCircleFill, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Designer, Schedule, Note } from "/public/Icons";
import ThemeDropdown from "@/components/common/ThemeDropdown";

function ShopQuoteRequestList({ Infos }) {
  const [status, setStatus] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);

  // Theme selection items
  const themeItems = [
    {
      label: "전체",
      onClick: () => {
        setStatus("전체");
        setIsOpen(false);
      }
    },
    {
      label: "견적 요청 중",
      onClick: () => {
        setStatus("견적 요청 중");
        setIsOpen(false);
      }
    },
    {
      label: "견적 거절됨",
      onClick: () => {
        setStatus("견적 거절됨");
        setIsOpen(false);
      }
    },
    {
      label: "기한 마감됨",
      onClick: () => {
        setStatus("기한 마감됨");
        setIsOpen(false);
      }
    },
    {
      label: "견적서 수령",
      onClick: () => {
        setStatus("견적서 수령");
        setIsOpen(false);
      }
    }
  ];

  const filteredItems = () => {
    let items;
    if (status === "전체") {
      items = Infos; // 모든 아이템 반환
    } else {
      // 선택된 상태와 일치하는 아이템만 필터링
      items = Infos.filter((request) => {
        switch (status) {
          case "견적 요청 중":
            return request.status === "요청";
          case "견적 거절됨":
            return request.status === "거절";
          case "기한 마감됨":
            return request.status === "마감";
          case "견적서 수령":
            return request.status === "제안 완료";
          default:
            return true;
        }
      });
    }

    // expireDate 최신순으로 정렬 (최신 날짜가 먼저 오도록)
    return items.sort((a, b) => new Date(b.expireDate) - new Date(a.expireDate));
  };

  return (
    <>
      <ThemeDropdown status={status} isOpen={isOpen} setIsOpen={setIsOpen} themeItems={themeItems} />
      {filteredItems().map((request) => (
        <CustomerEstimate Info={request} />
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
                  <div className="absolute right-0 top-full z-10 mt-1 w-56 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <BsQuestionCircleFill className="mr-1.5 text-sm text-gray-500" />
                        <h3 className="text-sm font-semibold">거절 사유</h3>
                      </div>
                      <button
                        onClick={() => setShowRejectionReason(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <BsX className="text-xl" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{Info.rejectReason || "거절 사유가 제공되지 않았습니다."}</p>
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
            <img src={Designer} alt="Designer" className="mr-1.5 h-5 w-5" />
            <p className="line-clamp-1">
              {Info.shopName} - {Info.groomerName} 디자이너
            </p>
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src={Schedule} alt="Schedule" className="mr-1.5 h-5 w-5" />
            <p className="line-clamp-1">{formatDate(Info.beautyDate)}</p>
          </div>
          <div className="flex items-center text-sm">
            <img src={Note} alt="Description" className="mr-1.5 h-5 w-5" />
            <p className="line-clamp-1">{Info.requestContent}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        {Info.status === "제안 완료" ? (
          <div
            onClick={() => {
              navigate(`/customer/quotes/detail/${Info.quoteId}`, { state: { activeTab: 1 } }); //[x]
            }}
            className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-main-200 text-center text-sm text-main-600"
          >
            견적서 보기
          </div>
        ) : (
          <div
            onClick={() => {
              navigate(`/customer/quotes/request/detail/${Info.quoteRequestId}`, { state: { activeTab: 1 } }); // [x]
            }}
            className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
          >
            견적 요청 보기
          </div>
        )}
        <div
          onClick={() => {
            navigate(`/customer/shop/${Info.shopId}`, { state: { activeTab: 1 } }); // [ ]
          }}
          className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-main text-center text-sm text-white"
        >
          매장 상세보기
        </div>
      </div>
    </div>
  );
};

export default ShopQuoteRequestList;
