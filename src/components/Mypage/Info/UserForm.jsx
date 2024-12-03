import BottomButton from "@/components/common/button/BottomButton";
import ProfileImage from "../ProfileImage";

const UserForm = ({ formData, setFormData, handleSubmit, handleChange, role }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-5 grow">
      {/* Profile Image */}
      <ProfileImage setFormData={setFormData} />

      {/* Username */}
      <div>
        <label htmlFor="username" className="labelStyle">
          이름
        </label>
        <div className="inputStyle">{formData.name}</div>
      </div>
      <div>
        <label htmlFor="email" className="labelStyle">
          이메일
        </label>
        <div className="inputStyle">{formData.email}</div>
      </div>
      {/* Nickname */}
      <div>
        <label htmlFor="nickname" className="labelStyle">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요."
          className="inputStyle"
          required
        />
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
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="동네 선택 select box"
            className="inputStyle"
          />
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

      <BottomButton type={"submit"} onSubmit={handleSubmit} styleType={"pink"}>
        내 정보 저장하기
      </BottomButton>
    </form>
  );
};

export default UserForm;
