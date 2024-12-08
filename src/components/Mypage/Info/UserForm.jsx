import BottomButton from "@/components/common/button/BottomButton";
import ProfileImage from "../ProfileImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectRegion from "./SelectRegion";
import { nicknameCheck } from "@/queries/authQuery";
import NicknameCheck from "@/components/Login/NicknameCheck";
import PhoneCheck from "@/components/Login/PhoneCheck";

const UserForm = ({ phoneRef, validPhone, formData, setFormData, handleSubmit, handleChange, role }) => {
  const location = useLocation();
  const [pathname, setPathname] = useState();
  const [nickname, setNickname] = useState();

  useEffect(() => {
    setPathname(location.pathname);
  }, []);

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
    <form onSubmit={handleSubmit} className="mt-5 grow">
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
        <input
          type="text"
          id="username"
          name="username"
          value={formData?.username}
          onChange={handleChange}
          placeholder="이름을 입력해주세요."
          className="inputStyle"
          required
        />
      </div>
      {/* Nickname */}
      <div>
        <label htmlFor="nickname" className="labelStyle">
          닉네임
        </label>
        <div className={`inputStyle ${nickname ? "mb-2" : "mb-8"} flex justify-between`}>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData?.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            className="grow"
            required
          />
          <button
            type="button"
            className="rounded-xl bg-main px-2 text-xs text-white"
            onClick={() => handleNicknameCheck(formData.nickname)}
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
          className={`inputStyle ${validPhone === "yet" ? "mb-8" : "mb-2"}`}
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
          <label htmlFor="skills" className="labelStyle">
            미용사 스킬
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData?.skills}
            onChange={handleChange}
            placeholder="미용사 스킬을 입력해주세요."
            className="inputStyle"
          />
        </div>
      )}

      <BottomButton type={"submit"} onClick={handleSubmit} styleType={"pink"}>
        내 정보 저장하기
      </BottomButton>
    </form>
  );
};

export default UserForm;
