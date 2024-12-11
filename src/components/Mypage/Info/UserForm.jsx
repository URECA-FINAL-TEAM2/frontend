import ProfileImage from "../ProfileImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectRegion from "./SelectRegion";
import { nicknameCheck } from "@/queries/authQuery";
import NicknameCheck from "@/components/Login/NicknameCheck";
import PhoneCheck from "@/components/Login/PhoneCheck";

const UserForm = ({ handleOpenModal, phoneRef, validPhone, formData, setFormData, handleChange, role }) => {
  const location = useLocation();
  const [pathname, setPathname] = useState();
  const [nickname, setNickname] = useState();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  // 닉네임 유효성검사, 중복검사
  const handleNicknameCheck = async (nickname) => {
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9_-]{2,10}$/;

    if (!nickname) {
      return setNickname("required");
    }

    if (!nicknameRegex.test(nickname)) {
      return setNickname("impossible");
    }

    const response = await nicknameCheck(nickname);
    setNickname(response.data ? "possible" : "duplication");
  };

  return (
    <>
      <form action="" className="mt-5 grow" method="PUT">
        {/* Profile Image */}
        <ProfileImage formData={formData} setFormData={setFormData} />
        {/* email */}
        <div>
          <label htmlFor="email" className="labelStyle">
            이메일
          </label>
          <div className="inputStyle">{formData?.email}</div>
        </div>
        <div>
          <label htmlFor="username" className="labelStyle">
            이름
          </label>
          <div className="inputStyle">{formData?.userName || formData?.username}</div>
        </div>
        {/* Nickname */}
        <div>
          <label htmlFor="nickName" className="labelStyle">
            닉네임
          </label>
          <div className={`inputStyle ${nickname ? "mb-2" : "mb-8"} flex justify-between text-gray-400`}>
            <input
              type="text"
              id="nickName"
              name="nickName"
              value={formData?.nickName || formData?.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className="grow"
              required
            />
            <button
              type="button"
              className="rounded-xl bg-main px-2 text-xs text-white"
              onClick={() => handleNicknameCheck(formData.nickName)}
            >
              중복확인
            </button>
          </div>
          <NicknameCheck nickname={nickname} />
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
            onChange={handleChange}
            placeholder="010-1234-5678"
            className={`inputStyle ${validPhone === "yet" ? "mb-8" : "mb-2"} text-gray-400`}
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
              className="inputStyle text-gray-400"
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
