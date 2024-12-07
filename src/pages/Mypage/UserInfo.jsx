import { useEffect, useState } from "react";
import BottomButton from "../../components/common/button/BottomButton";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { getUserInfo, updateUserInfo } from "@/queries/userQuery";

const UserInfo = () => {
  const location = useLocation();
  const { role } = location.state || {};
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "노승희",
    email: "tmdtmd@naver.com",
    nickname: "뭉뭉객",
    phone: "010-2222-3333",
    sido: "", // 고객 필드
    sigungu: "", // 고객 필드
    skills: "소형견/특수견 미용" // 미용사 필드
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // role에 따라 id 추가해서 보내야 됨
      const response = await updateUserInfo(role, formData, 2);
      const updateData = response[0].data;

      setFormData((prev) => ({
        ...prev, // 기존 상태 유지
        profileImage: updateData.profileImage || prev.profileImage,
        name: updateData.name || prev.name,
        nickname: updateData.nickname || prev.nickname, // 새 데이터가 없으면 이전 상태 유지
        phone: updateData.phone || prev.phone,
        ...(role === "customer"
          ? { address: updateData.address || prev.address }
          : { skills: updateData.skills || prev.skills })
      }));
    } catch (error) {
      alert("업데이트에 실패했습니다.");
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const response = await getUserInfo(role, 2);
      const updateData = response[0].data;

      setFormData((prev) => ({
        ...prev, // 기존 상태 유지
        profileImage: updateData.profileImage || prev.profileImage,
        nickname: updateData.nickname || prev.nickname, // 새 데이터가 없으면 이전 상태 유지
        phone: updateData.phone || prev.phone,
        ...(role === "customer"
          ? { address: updateData.address || prev.address }
          : { skills: updateData.skills || prev.skills })
      }));
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
