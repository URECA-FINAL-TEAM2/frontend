import ProfileImage from "../ProfileImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectRegion from "./SelectRegion";
import NicknameCheck from "@/components/Login/NicknameCheck";
import PhoneCheck from "@/components/Login/PhoneCheck";
import { handleNicknameCheck, handlePhoneChange } from "@/queries/authQuery";

const UserForm = ({
  nickname,
  setNickname,
  nicknameRef,
  setValidPhone,
  handleOpenModal,
  phoneRef,
  validPhone,
  formData,
  setFormData,
  handleChange,
  role
}) => {
  const location = useLocation();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const [init, setInit] = useState(false);

  // 닉네임 유효성 검사 (onChange에서 호출)
  const handleNicknameValidation = (nickname) => {
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9_-]{2,10}$/;

    if (!nickname.trim()) {
      setNickname("required");
      setInit(false); // 버튼 비활성화
      return;
    }

    if (!nicknameRegex.test(nickname.trim())) {
      setNickname("impossible");
      setInit(false); // 버튼 비활성화
      return;
    }

    setNickname("yet"); // 유효성 검사 통과, 버튼 활성화
    setInit(true);
  };

  return (
    <>
      <form action="" className="mb-[--bottom-bar-height] mt-5 grow" method="PUT">
        {/* Profile Image */}
        <ProfileImage formData={formData} setFormData={setFormData} />
        {/* email */}
        <div>
          <label htmlFor="email" className="labelStyle">
            이메일
          </label>
          <div className="inputStyle border-main-400 text-gray-500">{formData?.email}</div>
        </div>
        <div>
          <label htmlFor="userName" className="labelStyle">
            이름
          </label>
          <div className="inputStyle border-main-400 text-gray-500">{formData?.userName || formData?.username}</div>
        </div>
        {/* Nickname */}
        <div>
          <label htmlFor="nickname" className="labelStyle">
            닉네임
          </label>
          <div className={`inputStyle relative ${nickname === "yet" ? "mb-8" : "mb-2"} flex justify-between`}>
            <input
              ref={nicknameRef}
              type="text"
              id="nickname"
              name="nickname"
              value={formData?.nickname}
              onChange={(e) => {
                const { value } = e.target;
                setFormData((prev) => ({ ...prev, nickname: value })); // 닉네임 업데이트
                handleNicknameValidation(value); // 유효성 검사 실행
              }}
              placeholder="닉네임을 입력해주세요."
              className=""
              required
            />
            <button
              type="button"
              className={`rounded-xl px-2 text-[10px] text-white ${init ? "bg-main" : "bg-[#ccc]"}`}
              onClick={() => {
                if (init) {
                  handleNicknameCheck(formData?.nickname, setNickname);
                }
              }}
              disabled={!init} // 버튼 활성화 상태에 따라 비활성화 처리
            >
              중복확인
            </button>
          </div>
          <NicknameCheck nickname={nickname} setInit={setInit} />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="labelStyle">
            전화번호
          </label>
          <input
            ref={phoneRef}
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={() => handlePhoneChange(event, setFormData, setValidPhone)}
            placeholder="010-1234-5678"
            className={`inputStyle ${validPhone === "yet" ? "mb-8" : "mb-2"} mb-1`}
            required
          />
          <PhoneCheck validPhone={validPhone} />
        </div>
        {/* 고객 - 우리동네 선택 */}
        {role === "customer" && (
          <div>
            <label htmlFor="address" className="labelStyle">
              지역
            </label>
            <SelectRegion formData={formData} setFormData={setFormData} />
          </div>
        )}
        {/* 미용사 - 스킬 */}
        {role === "groomer" && (
          <div>
            <label htmlFor="skill" className="labelStyle">
              미용사 스킬
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={formData?.skill || formData?.skills}
              onChange={handleChange}
              placeholder="미용사 스킬을 입력해주세요."
              className="inputStyle"
            />
          </div>
        )}

        {pathname === "/infoRequired" ? (
          ""
        ) : (
          <button
            className="mx-auto mb-20 flex text-xs text-gray-300 underline"
            type="button"
            onClick={() => handleOpenModal("delete")}
          >
            <span>{role === "customer" ? "고객 프로필 삭제" : "미용사 프로필 삭제"}</span>
          </button>
        )}

        <button type="button" onClick={() => handleOpenModal("update")} className="bottomButtonPink">
          내 정보 저장하기
        </button>
      </form>
    </>
  );
};

export default UserForm;
