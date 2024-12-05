import BottomButton from "@/components/common/button/BottomButton";
import ProfileImage from "../ProfileImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectRegion from "./SelectRegion";

const UserForm = ({ formData, setFormData, handleSubmit, handleChange, role }) => {
  const location = useLocation();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setPathname(location.pathname);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mt-5 grow">
      {/* Profile Image */}
      <ProfileImage setFormData={setFormData} />

      {/* email */}
      <div>
        <label htmlFor="email" className="labelStyle">
          이메일
        </label>
        <div className="inputStyle">{formData.email}</div>
      </div>

      <div>
        <label htmlFor="name" className="labelStyle">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
        <div className="inputStyle flex justify-between">
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            className=""
            required
          />
          {pathname === "/infoRequired" && (
            <button className="rounded-xl bg-main px-2 text-xs text-white" onClick={() => console.log("중복확인")}>
              중복확인
            </button>
          )}
        </div>
      </div>
      {/* Phone */}
      <div>
        <label htmlFor="phone" className="labelStyle">
          전화번호
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="전화번호를 입력해주세요."
          className="inputStyle"
          required
        />
      </div>
      {/* 고객 - 우리동네 선택 */}
      {role === "customer" && (
        <div>
          <label htmlFor="address" className="labelStyle">
            동네 선택하기
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
            value={formData.skills}
            onChange={handleChange}
            placeholder="미용사 스킬을 입력해주세요."
            className="inputStyle"
          />
        </div>
      )}

      <BottomButton type={"button"} onClick={handleSubmit} styleType={"pink"}>
        내 정보 저장하기
      </BottomButton>
    </form>
  );
};

export default UserForm;
