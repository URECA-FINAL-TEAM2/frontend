import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { deleteUserInfo, getUserInfo, updateAddress, updateUserInfo } from "@/queries/userQuery";
import useAuthStore from "@/store/authStore";
import { validatePhoneNumber } from "@/queries/authQuery";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/common/modal/modal";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useAuthStore();
  const { role } = location.state || {};
  const [validPhone, setValidPhone] = useState("yet");
  const [formData, setFormData] = useState({
    profileImage: null,
    username: "",
    email: "",
    nickname: "",
    phone: "",
    sidoId: 0,
    sigunguId: 0,
    sidoName: 0,
    sigunguName: 0,
    skills: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("update");

  const handleOpenModal = (state) => {
    setIsModalOpen(true);
    setModalState(state);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      if (!e.target.value.trim()) {
        setValidPhone("required");
      } else if (validatePhoneNumber(e.target.value)) {
        setValidPhone("possible");
      } else {
        setValidPhone("impossible");
      }
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (modalState === "update") {
      if (role === "customer") {
        try {
          const response = await updateAddress(formData, id);
          console.log(response);
        } catch (error) {
          console.error("고객 주소 수정을 실패했습니다.");
        }
      }

      try {
        const response = await updateUserInfo(role, formData, id);
        console.log(response);

        toast("수정이 완료되었습니다.", { icon: "👏🏻" });

        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } catch (error) {
        toast("담당자에게 문의하세요.", { icon: "❌" });

        setTimeout(() => {
          navigate(-1);
        }, 1500);
        console.error("프로필 정보 수정을 실패했습니다.");
      }
    } else {
      try {
        const response = await deleteUserInfo(role, id);
        console.log(response);
        toast("정보가 삭제되었습니다.\n 자동 로그아웃 처리됩니다.", { icon: "👋🏻" });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        console.error("고객 주소 수정을 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const response = await getUserInfo(role, id);
      setFormData(response);
    };
    getInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SubHeader title={"내 정보 수정"} />
      <UserForm
        handleOpenModal={handleOpenModal}
        validPhone={validPhone}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        role={role}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmit}
        closeText="닫기"
        confirmText="확인"
      >
        {modalState === "update" ? "프로필 정보를 수정하시겠습니까?" : "프로필 정보를 삭제하시겠습니까?"}
      </Modal>
      <Toaster />
    </div>
  );
};

export default UserInfo;
