import useRoleStore from "@/store/RoleStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal/modal";
import useAuthStore from "@/store/authStore";
import { PiArrowsInCardinalThin } from "react-icons/pi";
import { getUserId } from "@/queries/authQuery";
const ToggleButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, setRole } = useRoleStore();
  const { updateDefaultRole, updateId, id } = useAuthStore();

  const handleToggle = async () => {
    setIsModalOpen(false);
    const newRole = role === "customer" ? "groomer" : "customer";
    setRole(newRole);
    updateDefaultRole(newRole);

    // const response = await getUserId(role, id);

    if (newRole === "groomer") {
      navigate("/groomer/mypage");
    } else {
      navigate("/customer/mypage");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative cursor-pointer">
        <div className={`h-4 w-9 rounded-full ${role === "customer" ? "bg-main-400" : "bg-main-300"}`} />
        <button
          onClick={handleOpenModal}
          className={`absolute top-0 h-4 w-5 rounded-full bg-white transition-all duration-500 ${role === "customer" ? "left-4" : "left-0"}`}
        ></button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleToggle}
        closeText="닫기"
        confirmText="확인"
      >
        {role === "customer" ? "미용사" : "고객"}(으)로 역할을 변경하시겠습니까?
      </Modal>
    </>
  );
};

export default ToggleButton;
