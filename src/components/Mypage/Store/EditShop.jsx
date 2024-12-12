import { useEffect, useState } from "react";
import StoreForm from "./StoreForm";
import Modal from "@/components/common/modal/modal";
import toast, { Toaster } from "react-hot-toast";
import { getGroomerShop, updateGroomerShop } from "@/queries/shopQuery";
import { useNavigate } from "react-router-dom";

const EditShop = ({ shopInfo, id }) => {
  const { update } = location.state || {};
  // const { id } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    shopId: shopInfo.shopId,
    profileImage: shopInfo.shopLogo,
    shopName: shopInfo.shopName,
    description: shopInfo.description,
    businessTime: shopInfo.businessTime,
    address: shopInfo.address,
    sidoName: shopInfo.sidoName,
    sigunguName: shopInfo.sigunguName,
    latitude: 0,
    longitude: 0
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    await updateGroomerShop(id, formData, isUpdate);
    toast("완료되었습니다.", { icon: "👏🏻" });

    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return (
    <>
      <StoreForm
        handleOpenModal={handleOpenModal}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isUpdate={isUpdate}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmit}
        closeText="닫기"
        confirmText="확인"
      >
        {isUpdate ? "매장을 수정하시겠습니까?" : "매장을 등록하시겠습니까?"}
      </Modal>
      <Toaster />
    </>
  );
};

export default EditShop;
