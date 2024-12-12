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
    console.log(nickname);
  }, [location]);

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
          <div className={`inputStyle ${nickname === "yet" ? "mb-8" : "mb-2"} flex justify-between bg-gray-200`}>
            <input
              ref={nicknameRef}
              type="text"
              id="nickName"
              name="nickName"
              value={formData?.nickName || formData?.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className="bg-gray-200"
              required
            />
            <button
              type="button"
              className="rounded-xl bg-main px-2 text-xs text-white"
              onClick={() => handleNicknameCheck(formData?.nickName || formData?.nickname, setNickname)}
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
            onChange={() => handlePhoneChange(event, setFormData, setValidPhone)}
            placeholder="010-1234-5678"
            className={`inputStyle ${validPhone === "yet" ? "mb-8" : "mb-2"} mb-1 bg-gray-200`}
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
              className="inputStyle bg-gray-200"
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
