import { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { registerUser } from "@/queries/authQuery";
import useAuthStore from "@/store/authStore";
import Modal from "@/components/common/modal/modal";
import toast, { Toaster } from "react-hot-toast";

const InfoRequired = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState();
  const location = useLocation();
  const phoneRef = useRef();
  const nicknameRef = useRef();
  const { updateId, updateDefaultRole, setLoginStatus } = useAuthStore();
  const [validPhone, setValidPhone] = useState("yet");
  const { role, email, username } = location.state || {};
  const [formData, setFormData] = useState({
    email: email,
    profileImage: null,
    username: username,
    nickName: "",
    phone: "",
    sidoId: "",
    sigunguId: "",
    skill: "" // 미용사 필드
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (validPhone === "possible" && nickname === "possible") {
      try {
        const response = await registerUser(formData, role);
        const responseRole = response.roles[0] === "고객" ? "customer" : "groomer";
        const customerId = response?.customerId;
        const groomerId = response?.groomerId;

        setLoginStatus(true);
        updateDefaultRole(responseRole);
        if (responseRole === "customer") {
          updateId({ customerId: customerId });
          navigate("/customer/home");
        } else {
          updateId({ groomerId: groomerId });
          navigate("/groomer/home");
        }
      } catch (error) {
        console.error("회원 등록 실패:", error);
      }
    } else {
      if (nickname !== "possible") {
        nicknameRef.current.focus();
        toast("닉네임을 확인해주세요", {
          icon: "❌"
        });
      } else {
        phoneRef.current.focus();
        toast("전화번호를 확인해주세요", {
          icon: "❌"
        });
      }
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: role }));
  }, [role]);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SubHeader title={"내 정보를 완성해주세요"} />
        <UserForm
          nicknameRef={nicknameRef}
          phoneRef={phoneRef}
          handleOpenModal={handleOpenModal}
          validPhone={validPhone}
          setValidPhone={setValidPhone}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          role={role}
          nickname={nickname}
          setNickname={setNickname}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmit}
        closeText="닫기"
        confirmText="확인"
      >
        내 정보를 저장하시겠습니까?
      </Modal>
      <Toaster />
    </>
  );
};

export default InfoRequired;
