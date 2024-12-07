import React from "react";

function ShopQuoteRequestList({ Infos }) {
  return (
    <>
      <CustomerEstimate Info={Infos[0]} />
      <CustomerEstimate Info={Infos[0]} />
    </>
  );
}

const CustomerEstimate = ({ Info }) => {
  return (
    <div className="m-5 rounded-lg bg-white p-3">
      <div className="mb-3 flex">
        <div>
          <img src={Info.petImage} alt="고객 반려견" className="mr-3 h-24 w-24 rounded-sm object-cover" />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <p className="text-lg font-semibold leading-snug">{Info.petName}</p>
            <p className="flex items-center rounded-md bg-main px-2 text-sm">견적 받는 중</p>
          </div>
          <div className="flex items-center">
            <img src="/public/Icons/Designer.svg" alt="Description" className="mr-2 h-5 w-5" />
            <p>
              {Info.shopName} - {Info.groomerName} 디자이너
            </p>
          </div>
          <div className="flex items-center">
            <img src="/public/Icons/Schedule.svg" alt="Description" className="mr-2 h-5 w-5" />
            <p>{Info.beautyDate}</p>
          </div>
          <div className="flex items-center">
            <img src="/public/Icons/Note.svg" alt="Description" className="mr-2 h-5 w-5" />
            <p>{Info.requestContent}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="text-main-600 flex h-[35px] w-full items-center justify-center rounded-sm bg-main-200 text-center">
          견적 요청 보기
        </div>
        <div className="flex h-[35px] w-full items-center justify-center rounded-sm bg-main text-center text-white">
          채팅하기
        </div>
      </div>
    </div>
  );
};

export default ShopQuoteRequestList;
