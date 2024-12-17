import { formatDate } from "@/utils/formatDate";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Schedule, Corgi, Note } from "/public/Icons";

function GroomerTotalRequests({ Infos }) {
  if (Infos == null) return <></>;

  const filteredItems = () => {
    // expireDate 최신순으로 정렬 (최신 날짜가 먼저 오도록)
    return Infos.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
  };

  return (
    <>
      {filteredItems().map((Info) => {
        return <GroomerEstimate Info={Info} />;
      })}
    </>
  );
}

const GroomerEstimate = ({ Info }) => {
  const navigate = useNavigate();
  return (
    <div className="m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.userProfileImage} alt="고객 프로필" className="mr-3 h-10 w-10 rounded-lg object-cover" />
        <div>
          <p className="px-0.5 font-semibold leading-[1.1]">{Info.userName} 고객님</p>
          <span className="rounded-md bg-main-100 px-1 py-[1px] text-xs text-main">
            {formatDate(Info.expiryDate)}까지
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
          navigate(`/groomer/quotes/request/detail/${Info.requestId}`);
        }}
        className="flex h-[32px] cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
      >
        상세보기
      </div>
    </div>
  );
};

export default GroomerTotalRequests;
