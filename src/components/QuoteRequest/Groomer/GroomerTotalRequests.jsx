//GroomerTotalRequests.jsx

import React from "react";

function GroomerTotalRequests({ Infos }) {
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
        <img src={Info.profileImage} alt="고객 반려견" className="mr-2 h-12 w-12 rounded-sm object-cover" />
        <div>
          <p className="text-lg font-medium leading-snug">{Info.nickname} 고객님</p>
          <span className="rounded-md bg-main-100 px-2 py-0.5 text-sm text-main">{Info.closingDate}</span>
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
      </div>
    </div>
  );
};

export default GroomerTotalRequests;
