import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Region, Schedule, Note, Won, Description } from "/public/Icons";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import ThemeDropdown from "@/components/common/ThemeDropdown";

const CustomerEstimate = ({ Info, expandedQuoteRequestId, setExpandedQuoteRequestId }) => {
  const isExpanded = Info.quoteRequestId === expandedQuoteRequestId;
  const navigate = useNavigate();

  const handleExpandCollapse = () => {
    if (Info.quotes.length > 0) {
      setExpandedQuoteRequestId(isExpanded ? null : Info.quoteRequestId);
    }
  };

  const getQuoteRequestStatusProps = (status) => {
    switch (status) {
      case "요청":
        return {
          className: "bg-main text-white",
          text: "견적 요청 중"
        };
      case "마감":
        return {
          className: "bg-gray-200",
          text: "완료"
        };
      default:
        return {
          className: "",
          text: status
        };
    }
  };

  const getQuoteStatusProps = (status, expireDate) => {
    switch (status) {
      case "제안":
        return {
          className: "bg-main-100 text-main-500",
          text: `${formatDate(expireDate)}까지`
        };
      case "수락":
        return {
          className: "bg-main text-white",
          text: "예약 완료"
        };
      case "마감":
        return {
          className: "bg-gray-200",
          text: "마감"
        };
      default:
        return {
          className: "",
          text: status
        };
    }
  };

  return (
    <div className="m-5 rounded-xl bg-white">
      <div className="p-4">
        <div className="mb-3 flex">
          <img
            src={Info.dogImage}
            alt="고객 반려견"
            className="mr-2.5 aspect-square h-24 w-24 rounded-md object-cover"
          />
          <div className="w-full">
            <div className="mb-1.5 flex justify-between">
              <p className="px-1 text-[16px] font-semibold leading-snug">{Info.dogName}</p>
              <span
                className={`rounded px-2 py-[3px] text-center text-xs ${getQuoteRequestStatusProps(Info.requestStatus).className}`}
              >
                {getQuoteRequestStatusProps(Info.requestStatus).text}
              </span>{" "}
            </div>
            <div className="mb-1 flex items-center text-sm">
              <img src={Region} alt="Description" className="mr-1.5 h-5 w-5" />
              <p className="line-clamp-1">{Info.region}</p>
            </div>
            <div className="mb-1 flex items-center text-sm">
              <img src={Schedule} alt="Description" className="mr-1.5 h-5 w-5" />
              <p className="line-clamp-1">{formatDate(Info.beautyDate)}</p>
            </div>
            <div className="flex items-center text-sm">
              <img src={Note} alt="Description" className="mr-1.5 h-5 w-5" />
              <p className="line-clamp-1">{Info.requestContent}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div
            onClick={() => {
              navigate(`/customer/quotes/request/detail/${Info.quoteRequestId}`, { state: { activeTab: 2 } }); // [x]
            }}
            className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
          >
            견적 요청 보기
          </div>
          {/* <div className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm">
            견적 그만 받기
          </div> */}
        </div>
      </div>
      {isExpanded && (
        <div className="border-t-2 px-4 pt-1">
          {Info.quotes.map((quote) => (
            <div key={quote.quoteId} className="border-b-2 py-3">
              <div className="flex">
                <img src={quote.shopLogo} className="mr-2 h-10 w-10 rounded-lg" />
                <div className="h-10 leading-none">
                  <p className="mb-1 font-semibold">
                    {quote.shopName} - {quote.groomerName} 디자이너
                  </p>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-xs ${getQuoteStatusProps(quote.quoteStatus).className}`}
                  >
                    {getQuoteStatusProps(quote.quoteStatus, quote.expireDate).text}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center text-sm">
                  <img src={Won} alt="Won" className="mr-1.5 h-5 w-5" />
                  <p>{Number(quote.cost).toLocaleString()}원</p>
                  <span className="ml-1 rounded-md bg-gray-200 px-1.5 text-xs">
                    예약금 {Math.floor(Number(quote.cost) * 0.2).toLocaleString()}원 미리 결제
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <img src={Description} alt="Description" className="mr-1.5 h-5 w-5 self-start" />
                  <p>{quote.quoteContent}</p>
                </div>
              </div>
              {quote.quoteStatus !== "마감" && (
                <div className="mb-1 mt-3 flex justify-between gap-2">
                  <div
                    onClick={() => {
                      if (quote.quoteStatus === "제안") {
                        navigate(`/customer/quotes/detail/${quote.quoteId}`, { state: { activeTab: 2 } }); // [x]
                      } else if (quote.quoteStatus === "수락") {
                        navigate("/customer/reservation", { state: { activeQuotesTab: 2 } }); // [x]
                      }
                    }}
                    className={`flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg text-center text-sm ${
                      quote.quoteStatus === "제안"
                        ? "bg-main-200 text-main-600"
                        : quote.quoteStatus === "수락"
                          ? "bg-main-200 text-main-600"
                          : "bg-gray-200"
                    }`}
                  >
                    {quote.quoteStatus === "제안" ? "견적서 보기" : "예약 내역 보기"}
                  </div>
                  <div
                    onClick={() => {
                      if (quote.shopId) {
                        navigate(`/customer/shop/${quote.shopId}`, { state: { activeTab: 2 } }); // [x]
                      } else {
                        console.log("유효하지 않은 shopId입니다.");
                      }
                    }}
                    className={
                      "flex h-[30px] w-full cursor-pointer items-center justify-center rounded-lg bg-main text-center text-sm text-white"
                    }
                  >
                    매장 상세보기
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {Info.quotes.length > 0 && (
        <div
          onClick={handleExpandCollapse}
          className="flex h-[32px] w-full cursor-pointer items-center justify-center border-t-2 text-center text-xs hover:bg-gray-100"
        >
          {isExpanded ? "접기" : `견적서 보기 (${Info.quotes.length}건)`}{" "}
          <span className="text-base">{isExpanded ? <MdExpandLess /> : <MdExpandMore />}</span>
        </div>
      )}
    </div>
  );
};

function TotalQuoteRequestList({ Infos }) {
  const [expandedQuoteRequestId, setExpandedQuoteRequestId] = useState(null);
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
      label: "완료",
      onClick: () => {
        setStatus("완료");
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
            return request.requestStatus === "요청";
          case "완료":
            return request.requestStatus === "마감";
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
      {filteredItems().map((Info) => (
        <CustomerEstimate
          key={Info.quoteRequestId}
          Info={Info}
          expandedQuoteRequestId={expandedQuoteRequestId}
          setExpandedQuoteRequestId={setExpandedQuoteRequestId}
        />
      ))}
    </>
  );
}

export default TotalQuoteRequestList;
