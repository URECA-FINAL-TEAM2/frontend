import PetProfileImage from "./PetProfileImage";
import PetBirth from "./PetBirth";
import PetGender from "./PetGender";
import PetNeutering from "./PetNeutering";
import PetExperienced from "./PetExperienced";
import PetName from "./PetName";
import PetBreed from "./PetBreed";
import PetWeight from "./PetWeight";
import PetSignificant from "./PetSignificant";
import ProfileImage from "../ProfileImage";

const PetForm = ({ onlyRead, formData, setFormData, handleChange }) => {
  return (
    <form>
      {/* 반려견 프로필 사진 */}
      <ProfileImage onlyRead={onlyRead} setFormData={setFormData} />
      {/* 이름 */}
      <PetName onlyRead={onlyRead} formData={formData} handleChange={handleChange} />
      {/* 품종 */}
      <PetBreed onlyRead={onlyRead} formData={formData} handleChange={handleChange} />
      {/* 몸무게 */}
      <PetWeight onlyRead={onlyRead} formData={formData} handleChange={handleChange} />
      {/* 생년월일 */}
      <PetBirth onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
      {/* 성별 */}
      <PetGender onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
      {/* 중성화 여부 */}
      <PetNeutering onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
      {/* 미용경험 여부 */}
      <PetExperienced onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
      {/* 특이사항 */}
      <PetSignificant onlyRead={onlyRead} formData={formData} handleChange={handleChange} />
    </form>
  );
};

export default PetForm;
