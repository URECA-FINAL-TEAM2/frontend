import { useEffect, useState } from "react";
import BottomButton from "../../components/common/button/BottomButton";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";

const UserInfo = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    role: "customer",
    profile_image: null,
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

  return (
    <div className="flex min-h-screen flex-col">
      <SubHeader title={"내 정보 수정"} />
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        role={role}
      />
    </div>
  );
};

export default UserInfo;
