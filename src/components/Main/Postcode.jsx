import { useState } from "react";

const Postcode = ({ formData, setFormData, handleChange }) => {
  const [address, setAddress] = useState(""); // 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세주소

  // Daum Postcode API 호출 함수
  const handleAddressSearch = () => {
    const popupWidth = 400;
    const popupHeight = 600;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 중앙 위치 계산
    const popupX = (screenWidth - popupWidth) / 2;
    const popupY = (screenHeight - popupHeight) / 2;

    new window.daum.Postcode({
      shorthand: false, // 축약해제
      width: popupWidth,
      height: popupHeight,

      oncomplete: (data) => {
        let addr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress; // 도로명 주소
        } else {
          addr = data.jibunAddress; // 지번 주소
        }
        setAddress(addr);
        setFormData((prev) => ({ ...prev, address: data.roadAddress, sidoName: data.sido, sigunguName: data.sigungu }));
        document.getElementById("detailAddress").focus();
      }
    }).open({
      left: popupX,
      top: popupY
    });
  };

  // 상세 주소 검색
  const changeHandler = (e) => {
    const detail = e.target.value;
    setDetailAddress(detail);

    // address : 도로명 주소 + 상세 주소 저장
    setFormData((prev) => ({ ...prev, address: `${address} ${detail}` }));
  };

  return (
    <>
      <div className="labelStyle flex justify-between">
        <label htmlFor="address" className="">
          주소
        </label>

        <button type="button" className="rounded-lg bg-main px-3 text-xs text-white" onClick={handleAddressSearch}>
          주소 찾기
        </button>
      </div>

      <div>
        <input
          type="text"
          id="address"
          className="inputStyle mb-2"
          placeholder="주소"
          value={address || formData.address}
          readOnly
        />
        <input
          type="text"
          id="detailAddress"
          className="inputStyle"
          placeholder="상세주소"
          value={detailAddress}
          onChange={changeHandler}
        />
      </div>
    </>
  );
};

export default Postcode;
