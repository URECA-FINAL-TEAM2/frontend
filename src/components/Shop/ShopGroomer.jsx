import React from "react";

function ShopGroomer({ shopDetail, isCustomer }) {
  const baseButtonClasses = `
    flex h-[28px]
    items-center justify-center 
    rounded-[10px] 
    bg-main-400 
    text-white 
    transition-all duration-300 ease-in-out 
    hover:bg-main-300
  `;

  return (
    <div className="m-5">
      <p className="mb-1 text-lg font-semibold">미용사</p>
      <div className="flex w-full items-center rounded-lg p-3">
        <img
          className="mb-1 h-[100px] w-[100px] rounded-full bg-gray-500 object-cover"
          src={shopDetail?.groomerProfileImage}
        ></img>
        <div className="ml-5 flex flex-col">
          <p className="text-[18px] font-bold">{shopDetail?.groomerUsername} 디자이너</p>
          <p className="mb-3 text-[12px] text-gray-600">{shopDetail?.skills}</p>
          <button
            onClick={isCustomer ? () => {} : undefined}
            className={`text-sm ${baseButtonClasses} ${!isCustomer ? "cursor-not-allowed" : ""} `}
            disabled={!isCustomer}
          >
            채팅 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopGroomer;
