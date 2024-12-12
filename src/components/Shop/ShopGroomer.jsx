import React from "react";

function ShopGroomer({ shopDetail, isCustomer }) {
  const baseButtonClasses = `
    flex h-[33px] w-[165px] 
    items-center justify-center 
    rounded-[10px] 
    bg-main-400 
    text-[15px] text-white 
    transition-all duration-300 ease-in-out 
    hover:bg-main-300
  `;

  return (
    <div className="mx-5 my-3">
      <p className="mb-1 font-semibold">미용사</p>
      <div className="w-full justify-items-center rounded-lg border-2 border-main-300 py-3">
        <img
          className="mb-1 h-[100px] w-[100px] rounded-md bg-gray-500 object-cover"
          src={shopDetail?.groomerProfileImage}
        ></img>
        <p className="text-[18px] font-bold">{shopDetail?.groomerUsername} 디자이너</p>
        <p className="mb-1 text-[12px] text-gray-600">{shopDetail?.skills}</p>
        <button
          onClick={isCustomer ? () => {} : undefined}
          className={` ${baseButtonClasses} ${!isCustomer ? "cursor-not-allowed" : ""} `}
          disabled={!isCustomer}
        >
          채팅 문의하기
        </button>
      </div>
    </div>
  );
}

export default ShopGroomer;
