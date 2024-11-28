import SubHeader from "../../components/common/SubHeader";
import { useState } from "react";
import DefaultPetProfile from "/Icons/DefaultPetProfile.svg";
import PetBirth from "../../components/Mypage/Pet/PetBirth";
import PetGender from "../../components/Mypage/Pet/PetGender";
import PetNeutering from "../../components/Mypage/Pet/PetNeutering";
import PetExperienced from "../../components/Mypage/Pet/PetExperienced";

const AddPet = () => {
  const [isDefault, setIsDefault] = useState(true);
  const [imagePreview, setImagePreview] = useState(DefaultPetProfile);
  const [formData, setFormData] = useState({
    dogName: "",
    breed: "",
    dogWeight: "",
    dogBirth: { year: "", month: "", day: "" },
    dogGender: "",
    neutering: "",
    experienced: "",
    significant: "",
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBirthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dogBirth: {
        ...formData.dogBirth,
        [name]: value
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsDefault(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // 이미지 클릭 시 input 클릭 트리거
  const handleImageClick = () => {
    document.getElementById("profile_image_input").click();
  };

  // 기본 이미지 초기화
  const handleResetImage = () => {
    setImagePreview(DefaultPetProfile);
    setIsDefault(true);
  };

  return (
    <div>
      <SubHeader title={"반려견 등록"} />

      <form onSubmit={handleSubmit} className="mb-28">
        <div className="mx-auto">
          <input
            type="file"
            id="profile_image_input"
            name="profile_image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="mx-auto mb-16 mt-24 flex flex-col items-center justify-center">
            <img
              src={imagePreview}
              alt="Default Image"
              onClick={handleImageClick}
              className="h-[100px] w-1/4 rounded-[50%] border-[2px] border-main"
            />

            {!isDefault && (
              <button onClick={handleResetImage} className="mt-2 text-sm text-gray-300">
                기본 이미지로 변경
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="labelStyle" htmlFor="dogName">
            반려견 이름
          </label>
          <input
            className="inputStyle"
            type="text"
            id="dogName"
            name="dogName"
            value={formData.dogName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="labelStyle" htmlFor="breed">
            품종
          </label>
          <input
            className="inputStyle"
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="labelStyle" htmlFor="dogWeight">
            몸무게(kg)
          </label>
          <input
            className="inputStyle"
            type="text"
            id="dogWeight"
            name="dogWeight"
            value={formData.dogWeight}
            onChange={handleChange}
            required
          />
        </div>

        <PetBirth formData={formData} handleBirthChange={handleBirthChange} />
        <PetGender formData={formData} setFormData={setFormData} />
        <PetNeutering formData={formData} setFormData={setFormData} />
        <PetExperienced formData={formData} setFormData={setFormData} />

        <div>
          <label className="labelStyle" htmlFor="significant">
            특이사항
          </label>
          <textarea
            className="inputStyle"
            id="significant"
            name="significant"
            value={formData.significant}
            onChange={handleChange}
          />
        </div>

        {/* <BottomButton type={"submit"} onSubmit={handleSubmit} styleType={"pink"}>
          반려견 등록하기
        </BottomButton> */}

        <button type="submit" onSubmit={handleSubmit} className="bottomButtonPink">
          반려견 등록하기
        </button>
      </form>
    </div>
  );
};

export default AddPet;
