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
  const [init, setInit] = useState(false);
  const [originalNickname, setOriginalNickname] = useState(formData?.nickname);

  useEffect(() => {
    setPathname(location.pathname);
    setOriginalNickname(formData?.nickname);
  }, [formData?.nickname]);

  // 닉네임 유효성 검사 (onChange에서 호출)
  const handleNicknameValidation = (value) => {
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9_-]{2,10}$/;

    // Check if the value is exactly the same as the original nickname
    if (value === originalNickname) {
      setNickname("possible");
      setInit(false);
      return;
    }

    if (!value.trim()) {
      setNickname("required");
      setInit(false);
      return;
    }

    if (!nicknameRegex.test(value.trim())) {
      setNickname("impossible");
      setInit(false);
      return;
    }

    setNickname("yet");
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
        {/* Rest of the form remains the same */}
      </form>
    </>
  );
};

export default UserForm;
