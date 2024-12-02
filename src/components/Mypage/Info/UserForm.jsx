import ProfileImage from "../ProfileImage";
import Postcode from "@/components/Main/Postcode";

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
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
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
      {/* Address */}
      {role === "customer" && <Postcode setFormData={setFormData} handleChange={handleChange} />}

      {/* 미용사 스킬 */}
      {role === "groomer" && (
        <div>
          <label htmlFor="skill" className="labelStyle">
            미용사 스킬
          </label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="미용사 스킬을 입력해주세요."
            className="inputStyle"
          />
        </div>
      )}

      {/* <BottomButton type={"submit"} onSubmit={handleSubmit} styleType={"pink"}>
    내 정보 저장하기
  </BottomButton> */}

      <button type="submit" onSubmit={handleSubmit} className="bottomButtonPink">
        내 정보 수정하기
      </button>
    </form>
  );
};

export default UserForm;
