import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { registerUser } from "@/queries/authQuery";

const InfoRequired = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    email: "tmdtmd@naver.com",
    nickname: "",
    phone: "",
    address: "", // 고객 필드
    skills: "" // 미용사 필드
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData, role);
      const responseRole = response[0].data.roles[0];

      if (responseRole === "customer") {
        navigate("/customer/home");
      } else {
        navigate("/groomer/home");
      }
    } catch (error) {
      console.error("회원 등록 실패:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SubHeader title={"내 정보를 완성해주세요"} />
        <UserForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          role={role}
        />
      </div>
    </>
  );
};

export default InfoRequired;
