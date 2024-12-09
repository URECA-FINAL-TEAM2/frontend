import Modal from "@/components/common/modal/modal";
import SubHeader from "@/components/common/SubHeader";
import StoreForm from "@/components/Mypage/Store/StoreForm";
import { getGroomerShop, updateGroomerShop } from "@/queries/shopQuery";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CreateStore = () => {
  const location = useLocation();
  const { update } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(update);
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
      const response = await getGroomerShop();
      setFormData((prevFormData) => ({
        ...prevFormData,
        shopId: response.shopId,
        profileImage: response.shopLogo,
        shopName: response.shopName,
        description: response.description,
        businessTime: response.businessTime,
        address: response.address,
        sidoName: response.sidoName,
        sigunguName: response.sigunguName
      }));
    };

    if (isUpdate === "매장수정") getShop();
  }, []);

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

    const response = await updateGroomerShop(formData, isUpdate);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate(true);
    }
  }, []);

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
        {(() => {
          if (isUpdate) {
            return <>매장을 수정하시겠습니까?</>;
          } else {
            return <>매장을 등록하시겠습니까?</>;
          }
        })()}
      </Modal>
    </>
  );
};

export default CreateStore;
