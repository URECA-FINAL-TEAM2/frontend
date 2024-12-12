import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/common/SubHeader";
import UserForm from "@/components/Mypage/Info/UserForm";
import { deleteUserInfo, getUserInfo, updateAddress, updateUserInfo } from "@/queries/userQuery";
import useAuthStore from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/common/modal/modal";
import useToastAndNavigate from "@/hooks/CustomerSearch/useToastAndNavigate";

const UserInfo = () => {
  const nicknameRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();
  const showToastAndNavigate = useToastAndNavigate();
  const [nickname, setNickname] = useState("yet");
  const location = useLocation();
  const { id } = useAuthStore();
  const { role } = location.state || {};
  const [validPhone, setValidPhone] = useState("yet");
  const [formData, setFormData] = useState({
    profileImage: null,
    username: "",
    email: "",
    nickName: "",
    phone: "",
    sidoId: 0,
    sigunguId: 0,
    sidoName: 0,
    sigunguName: 0,
    skill: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("update");
  // 닉네임 유효성검사, 중복검사

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

    if ((validPhone === "possible" || validPhone === "yet") && (nickname === "possible" || nickname === "yet")) {
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
          await updateUserInfo(role, formData, id);
          showToastAndNavigate("수정 완료되었습니다.", "👏🏻");
        } catch (error) {
          showToastAndNavigate("담당자에게 문의하세요.", "❌");
        }
      } else {
        try {
          await deleteUserInfo(role, id);
          showToastAndNavigate("정보가 삭제되었습니다.\n 자동 로그아웃 처리됩니다.", "👋🏻");
        } catch (error) {
          console.error("고객 주소 수정을 실패했습니다.");
        }
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
