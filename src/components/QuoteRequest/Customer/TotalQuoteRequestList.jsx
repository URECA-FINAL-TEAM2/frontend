import { formatDate } from "@/utils/formatDate";
import React from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function TotalQuoteRequestList({ Infos }) {
  const quoteRequests = [
    {
      quoteRequestId: 35,
      region: "서울특별시 강남구",
      requestStatus: "요청",
      beautyDate: "2024-01-30T14:00:00",
      dogName: "요미",
      image: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/요크셔텔어.jpg",
      dogWeight: "2.8",
      dogBreed: "요크셔테리어",
      dogAge: "3",
      requestContent: "기본 미용 상담 필요해요기본 미용 상담 필요해요기본 미용 상담 필요해요",
      quotes: [
        {
          quoteId: 67,
          shopName: "킹덤펫",
          groomerName: "섭섭",
          quoteStatus: "수락",
          cost: 80000,
          quoteContent: "케어 스페셜",
          createdAt: "2024-01-05T10:30:22"
        }
      ]
    },
    {
      quoteRequestId: 34,
      region: "서울특별시 강남구",
      requestStatus: "제안 완료",
      beautyDate: "2024-01-29T14:00:00",
      dogName: "닥스",
      image: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/닥스훈트.jpg",
      dogWeight: "5.5",
      dogBreed: "닥스훈트",
      dogAge: "1",
      requestContent: "전체 미용 부탁드립니다",
      quotes: [
        {
          quoteId: 66,
          shopName: "두루몽실",
          groomerName: "써윤기",
          quoteStatus: "수락",
          cost: 75000,
          quoteContent: "전체 미용 패키지",
          createdAt: "2024-01-04T10:30:22"
        }
      ]
    }
  ];

  return (
    <>
      <CustomerEstimate Info={quoteRequests[0]} />
      <CustomerEstimate Info={quoteRequests[1]} />
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
            <img src="/public/Icons/Region.svg" alt="Description" className="mr-2 h-5 w-5" />
            <p>{Info.region}</p>
          </div>
          <div className="mb-1 flex items-center text-sm">
            <img src="/public/Icons/Schedule.svg" alt="Description" className="mr-2 h-5 w-5" />
            <p>{formatDate(Info.beautyDate)}</p>
          </div>
          <div className="flex items-center text-sm">
            <img src="/public/Icons/Note.svg" alt="Description" className="mr-2 h-5 w-5" />
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
