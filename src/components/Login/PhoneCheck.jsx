import React from "react";

const PhoneCheck = ({ validPhone }) => {
  return (
    <>
      {validPhone === "possible" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[green]">유효한 전화번호입니다.</div>
      )}
      {validPhone === "impossible" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[red]">유효하지 않은 형식입니다.</div>
      )}
      {validPhone === "required" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[red]">전화번호를 입력해주세요</div>
      )}
    </>
  );
};

export default PhoneCheck;
