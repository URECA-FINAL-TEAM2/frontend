import { useEffect, useState } from "react";
import BottomButton from "../../components/common/button/BottomButton";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { getUserInfo, updateUserInfo } from "@/queries/userQuery";
import useAuthStore from "@/store/authStore";

const UserInfo = () => {
  const location = useLocation();
  const { id } = useAuthStore();
  const { role } = location.state || {};
  const [formData, setFormData] = useState({
    profileImage: null,
    username: "",
    email: "",
    nickname: "",
    phone: "",
    sidoId: 0, // 고객 필드
    sigunguId: 0, // 고객 필드
    sidoName: 0, // 고객 필드
    sigunguName: 0, // 고객 필드
    skills: "" // 미용사 필드
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserInfo(role, formData, id);
    } catch (error) {
      console.error("프로필 정보 수정을 실패했습니다.");
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const response = await getUserInfo(role, 3);
      setFormData(response);
    };

    getInfo();
  }, []);

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
