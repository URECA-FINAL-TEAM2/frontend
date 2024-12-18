import { useEffect, useState } from "react";
import StoreForm from "./StoreForm";
import Modal from "@/components/common/modal/modal";
import toast, { Toaster } from "react-hot-toast";
import { deleteGroomerShop, updateGroomerShop } from "@/queries/shopQuery";
import { useNavigate } from "react-router-dom";

const EditShop = ({ shopInfo, id }) => {
  const { update } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    shopId: shopInfo?.shopId || "",
    profileImage: shopInfo?.shopLogo || "",
    shopName: shopInfo?.shopName || "",
    description: shopInfo?.description || "",
    businessTime: shopInfo?.businessTime || "",
    address: shopInfo?.address || "",
    sidoName: shopInfo?.sidoName || "",
    sigunguName: shopInfo?.sigunguName || "",
    latitude: shopInfo?.latitude || 0,
    longitude: shopInfo?.longitude || 0
  });

  const handleDeleteShop = async (shopId, id) => {
    await deleteGroomerShop(shopId, id);
    toast("매장이 삭제되었습니다.", { icon: "👋🏻", position: "top-center", duration: 1000 });

    setTimeout(() => {
      navigate("/groomer/mypage");
    }, 1000);
  };

  useEffect(() => {
    setIsUpdate(true);
    setFormData({
      shopId: shopInfo?.shopId || "",
      profileImage: shopInfo?.shopLogo || "",
      shopName: shopInfo?.shopName || "",
      description: shopInfo?.description || "",
      businessTime: shopInfo?.businessTime || "",
      address: shopInfo?.address || "",
      sidoName: shopInfo?.sidoName || "",
      sigunguName: shopInfo?.sigunguName || "",
      latitude: shopInfo?.latitude || 0,
      longitude: shopInfo?.longitude || 0
    });
  }, [shopInfo]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
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
    toast("수정이 완료되었습니다.", { icon: "👏🏻", position: "top-center", duration: 1000 });

    setTimeout(() => {
      navigate(-1);
    }, 1000);
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

      <div className="mt-5 text-center text-sm">
        <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="text-gray-300 underline">
          매장 삭제하기
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        closeText="닫기"
        confirmText="확인"
      >
        매장을 수정하시겠습니까?
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteShop(shopInfo.shopId, id)}
        closeText="닫기"
        confirmText="확인"
      >
        매장을 삭제하시겠습니까?
      </Modal>
      <Toaster />
    </>
  );
};

export default EditShop;
