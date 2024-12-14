import Modal from "@/components/common/modal/modal";
import SubHeader from "@/components/common/SubHeader";
import StoreForm from "@/components/Mypage/Store/StoreForm";
import { getGroomerShop, updateGroomerShop } from "@/queries/shopQuery";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/authStore";

const CreateStore = () => {
  const { id } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { update } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [shopInfo, setShopInfo] = useState({});
  const [formData, setFormData] = useState({
    shopId: 0,
    profileImage: "",
    shopName: "",
    description: "",
    businessTime: "",
    address: "",
    sidoName: "",
    sigunguName: "",
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    const getShop = async () => {
      const response = await getGroomerShop(id);
      const shop = response.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        shopId: shop.shopId,
        profileImage: shop.shopLogo,
        shopName: shop.shopName,
        description: shop.description,
        businessTime: shop.businessTime,
        address: shop.address,
        sidoName: shop.sidoName,
        sigunguName: shop.sigunguName
      }));
    };

    if (update) {
      setIsUpdate(true);
      getShop();
    }
  }, [update]);

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

    try {
      await updateGroomerShop(id, formData, isUpdate);
      toast("매장등록이 완료되었습니다.", { icon: "👏🏻" });

      setTimeout(() => {
        navigate("/groomer/mypage");
      }, 500);
    } catch (error) {
      toast("매장정보가 올바른지 확인하세요.", { icon: "❌" });
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
      <div>
        <SubHeader title={`${isUpdate ? "매장수정" : "매장등록"}`} />
        <StoreForm
          handleOpenModal={handleOpenModal}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isUpdate={isUpdate}
        />
      </div>

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

export default CreateStore;
