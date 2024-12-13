import { parseAddress } from "@/queries/shopQuery";
import { useEffect, useState } from "react";

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
      shorthand: false, // 축약 해제 유지
      oncomplete: (data) => {
        console.log(data);
        let addr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress; // 도로명 주소
        } else {
          addr = data.jibunAddress; // 지번 주소
        }

        setAddress(addr);
        setFormData((prev) => ({
          ...prev,
          address: addr,
          sidoName: data.sido,
          sigunguName: data.sigungu
        }));

        // Kakao Geocoder로 위도와 경도 구하기
        getCoordinates(addr);

        // 상세 주소 입력 칸으로 포커스 이동
        document.getElementById("detailAddress").focus();
      }
    }).open({
      left: popupX,
      top: popupY
    });
  };

  // Kakao Geocoder로 주소 -> 좌표 변환
  const getCoordinates = (addr) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(addr, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x: longitude, y: latitude } = result[0];
        console.log("위도:", latitude, "경도:", longitude);

        setFormData((prev) => ({
          ...prev,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }));
      } else {
        console.error("Geocoding 실패:", status);
      }
    });
  };

  // 상세 주소 입력 핸들러
  const changeHandler = (e) => {
    const detail = e.target.value;
    setDetailAddress(detail);

    // 도로명 주소 + 상세 주소 저장
    setFormData((prev) => ({ ...prev, address: `${address}, ${detail}` }));
  };

  // formData.address 변경 시 초기값 설정
  useEffect(() => {
    if (formData?.address) {
      const { address, detailAddress } = parseAddress(formData?.address);
      setAddress(address);
      setDetailAddress(detailAddress);
    }
  }, [formData?.address]);

  return (
    <>
      <div className="labelStyle flex justify-between">
        <label htmlFor="address" className="">
          주소*
        </label>

        <button type="button" className="rounded-lg bg-main px-3 text-xs text-white" onClick={handleAddressSearch}>
          주소 찾기
        </button>
      </div>

      <div>
        <input type="text" id="address" className="inputStyle mb-2" placeholder="주소" value={address} readOnly />
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
