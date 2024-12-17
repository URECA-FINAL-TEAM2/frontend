import { formatDate } from "@/utils/formatDate";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Schedule, Corgi, Note } from "/public/Icons";

function GroomerSentRequests({ Infos }) {
  return (
    <>
      {Infos.map((Info) => {
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
          className: "bg-main-100 text-main-500",
          text: "수락 대기중"
        };
      case "수락":
        return {
          className: "bg-gray-200",
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
          <span
            className={`rounded-md bg-main-100 px-1 py-[1px] text-xs text-main-500 ${getStatusProps(Info.status).className}`}
          >
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
      <div
        onClick={() => {
          navigate(`/groomer/quotes/detail/${Info.requestId}`);
        }}
        className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
      >
        보낸 견적서 확인하기
      </div>
    </div>
  );
};

export default GroomerSentRequests;
