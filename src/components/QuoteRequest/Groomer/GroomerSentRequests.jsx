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

  return (
    <div className="m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.userProfileImage} alt="고객 프로필" className="mr-3 h-10 w-10 rounded-lg object-cover" />
        <div className="w-full">
          <div className="flex gap-1">
            <p className="px-0.5 font-semibold leading-[1.1]">{Info.userName} 고객님</p>
            {Info.requestType == "020" ? (
              <span className="flex items-center rounded-md bg-main px-1.5 text-xs text-white">1:1 맞춤 요청</span>
            ) : null}
          </div>
          <span className="rounded-md bg-main-100 px-1 py-[1px] text-xs text-main-500">{Info.status}</span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="mb-1 flex items-center">
          <img src={Schedule} alt="Description" className="mr-2 h-5 w-5" />
          <p>{formatDate(Info.beautyDate)}</p>
        </div>
        <div className="mb-1 flex items-center">
          <img src={Corgi} alt="Description" className="mr-2 h-5 w-5" />
          <p>
            {Info.dogBreed} • {Info.dogGender == "MALE" ? "남아" : "여아"} • {Info.dogWeight}kg
          </p>
        </div>
        <div className="flex items-center">
          <img src={Note} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{Info.requestContent}</p>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div
          onClick={() => {
            navigate(`/groomer/quotes/detail/${Info.requestId}`);
          }}
          className="flex h-[35px] w-1/2 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
        >
          보낸 견적서 보기
        </div>
        <div className="flex h-[35px] w-1/2 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm">
          채팅하기
        </div>
      </div>
    </div>
  );
};

export default GroomerSentRequests;
