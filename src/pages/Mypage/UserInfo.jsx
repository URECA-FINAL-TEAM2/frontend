import { useEffect, useState } from "react";
import BottomButton from "../../components/common/button/BottomButton";
import DefaultCustomerProfile from "/Icons/DefaultCustomerProfile.svg";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import Postcode from "../../components/Main/Postcode";

const UserInfo = () => {
  // 회원 정보 조회 API 필요
  const location = useLocation();
  const [isDefault, setIsDefault] = useState(true);
  const [imagePreview, setImagePreview] = useState(DefaultCustomerProfile);
  const [formData, setFormData] = useState({
    role: "customer",
    profile_image: "",
    username: "노승희",
    nickname: "승2",
    phone: "010-1111-2222",
    address: "경기도 성남시~"
  });

  const { role } = location.state || {};

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: role }));
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("profile_image", formData.profile_image);
    formData.append("username", formData.username);
    formData.append("nickname", formData.nickname);
    formData.append("phone", formData.phone);
    formData.append("address", formData.address);
    formData.append("role", formData.role);
    formData.append("skill", formData.skill);

    // try {
    //   const response = await axiosInstance.post("/profile/customer", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   });
    //   console.log("폼 전송 성공:", response.data);
    // } catch (error) {
    //   console.error("폼 전송 중 오류 발생:", error);
    // }
  };

  // 이미지 클릭 시 input 클릭 트리거
  const handleImageClick = () => {
    document.getElementById("profile_image_input").click();
  };

  // 기본 이미지 초기화
  const handleResetImage = () => {
    setImagePreview(DefaultCustomerProfile);
    setIsDefault(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SubHeader title={"내 정보 수정"} />
      <form onSubmit={handleSubmit} className="mt-5 grow">
        {/* Profile Image */}
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
              className="h-[133px] w-1/3 rounded-[50%] border-[2px] border-main"
            />

            {!isDefault && (
              <button onClick={handleResetImage} className="mt-2 text-sm text-gray-300">
                기본 이미지로 변경
              </button>
            )}
          </div>
        </div>
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
        <Postcode handleChange={handleChange} setFormData={setFormData} />

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
    </div>
  );
};

export default UserInfo;
