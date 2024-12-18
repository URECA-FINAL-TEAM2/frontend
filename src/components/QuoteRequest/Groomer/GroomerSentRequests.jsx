import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule, Corgi, Note } from "/public/Icons";
import ThemeDropdown from "@/components/common/ThemeDropdown";

function GroomerSentRequests({ Infos }) {
  console.log("Infos", Infos);
  if (Infos == null) return <></>;

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
      label: "수락 대기중",
      onClick: () => {
        setStatus("수락 대기중");
        setIsOpen(false);
      }
    },
    {
      label: "예약 완료",
      onClick: () => {
        setStatus("예약 완료");
        setIsOpen(false);
      }
    },
    {
      label: "마감",
      onClick: () => {
        setStatus("마감");
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
          case "수락 대기중":
            return request.status === "제안";
          case "예약 완료":
            return request.status === "수락";
          case "마감":
            return request.status === "마감";
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
      {filteredItems().map((Info) => {
        return <GroomerEstimate Info={Info} />;
      })}
    </>
  );
}

const GroomerEstimate = ({ Info }) => {
  const navigate = useNavigate();

  const getStatusProps = (status) => {
    switch (status) {
      case "제안":
        return {
          className: "text-green-900 bg-green-100",
          text: "수락 대기중"
        };
      case "수락":
        return {
          className: "text-white bg-green-500",
          text: "예약 완료"
        };
      case "마감":
        return {
          className: "bg-gray-250 text-gray-600",
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
    <div className="m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.userProfileImage} alt="고객 프로필" className="mr-3 h-10 w-10 rounded-lg object-cover" />
        <div className="w-full">
          <div className="flex gap-1">
            <p className="line-clamp-1 px-0.5 font-semibold leading-[1.1]">{Info.userName} 고객님</p>
            {Info.requestType == "020" ? (
              <span className="flex items-center rounded-md bg-main px-1.5 text-xs text-white">1:1 맞춤 요청</span>
            ) : null}
          </div>
          <span className={`rounded-sm px-1 py-[1px] text-xs ${getStatusProps(Info.status).className}`}>
            {getStatusProps(Info.status).text}
          </span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="mb-1 flex items-center">
          <img src={Schedule} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{formatDate(Info.beautyDate)}</p>
        </div>
        <div className="mb-1 flex items-center">
          <img src={Corgi} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">
            {Info.dogBreed} • {Info.dogGender == "MALE" ? "남아" : "여아"} • {Info.dogWeight}kg
          </p>
        </div>
        <div className="flex items-center">
          <img src={Note} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{Info.requestContent}</p>
        </div>
      </div>

      {Info.status === "수락" ? (
        <div
          onClick={() => {
            navigate(`/groomer/reservation`, { state: { initialTab: "reserved" } }); // [x]
          }}
          className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-main text-center text-sm text-white"
        >
          예약 내역 확인하기
        </div>
      ) : (
        <div
          onClick={() => {
            navigate(`/groomer/quotes/detail/${Info.requestId}`, { state: { activeTab: 3 } }); //[x]
          }}
          className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
        >
          보낸 견적서 확인하기
        </div>
      )}
    </div>
  );
};

export default GroomerSentRequests;
