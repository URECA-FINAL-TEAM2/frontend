//GroomerSentRequests.jsx

import React from "react";

function GroomerSentRequests({ Infos }) {
  return (
    <>
      <GroomerEstimate Info={Infos[0]} />
      <GroomerEstimate Info={Infos[0]} />
    </>
  );
}

const GroomerEstimate = ({ Info }) => {
  return (
    <div className="m-5 rounded-lg bg-white p-5">
      <div className="mb-4 flex">
        <img src={Info.profileImage} alt="고객 프로필" className="mr-2 h-12 w-12 rounded-sm object-cover" />
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-lg font-semibold leading-snug">{Info.nickname} 고객님</p>
            <span className="flex items-center rounded-md bg-main px-2 text-sm text-white">1:1 맞춤 요청</span>
          </div>
          <span className="rounded-md bg-main-100 px-2 py-0.5 text-sm text-main">예약 확정</span>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <img src="/public/Icons/Schedule.svg" alt="Description" className="mr-2 h-6 w-6" />
          <p>{Info.beautyDate}</p>
        </div>
        <div className="flex items-center">
          <img src="/public/Icons/Corgi.svg" alt="Description" className="mr-2 h-6 w-6" />
          <p>
            {Info.breed} {Info.dogGender} {Info.dogWeight}kg
          </p>
        </div>
        <div className="flex items-center">
          <img src="/public/Icons/Note.svg" alt="Description" className="mr-2 h-6 w-6" />
          <p>{Info.requestContent}</p>
        </div>
        <div className="mt-3 flex justify-between gap-2">
          <div className="text-main-600 flex h-[35px] w-full items-center justify-center rounded-sm bg-main-200 text-center">
            견적서 보기
          </div>
          <div className="flex h-[35px] w-full items-center justify-center rounded-sm bg-main text-center text-white">
            채팅 하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomerSentRequests;
