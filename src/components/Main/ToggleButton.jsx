import useRoleStore from "@/store/RoleStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal/modal";

const ToggleButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomer, setIsCustomer] = useState();
  const { role, setRole } = useRoleStore();

  useEffect(() => {
    if (role === "customer") {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    }
  }, []);

  const handleToggle = () => {
    const newRole = role === "customer" ? "groomer" : "customer";
    setRole(newRole);

    // 역할에 따라 페이지 이동
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

  const handleConfirmModal = () => {
    handleToggle();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative cursor-pointer">
        {/* Toggle Container */}
        <div className={`h-4 w-9 rounded-full ${isCustomer ? "bg-main-400" : "bg-main-300"}`} />
        {/* Toggle Circle */}
        <button
          onClick={handleOpenModal}
          className={`absolute top-0 h-4 w-5 rounded-full bg-white transition-all duration-500 ${isCustomer ? "left-4" : "left-0"}`}
        ></button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        {role === "customer" ? "미용사" : "고객"}(으)로 역할을 변경하시겠습니까?
      </Modal>
    </>
  );
};

export default ToggleButton;
