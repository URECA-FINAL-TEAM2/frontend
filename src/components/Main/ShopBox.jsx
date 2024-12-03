import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Modal from "../common/modal/modal";

const ShopBox = ({ shopLogo, shopName, starScoreAvg, reviewCount, address, skills, businessTime }) => {
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
  };

  const handleShopDetail = () => {
    console.log("매장 상세 페이지로 이동");
    // navigate("/");
  };

  useEffect(() => {
    if (location.pathname.includes("bookmarked")) {
      setIsBookmarked(true);
    }
  }, []);

  return (
    <button
      onClick={() => handleShopDetail(2)}
      className="my-4 flex w-full items-start justify-between rounded-xl bg-white py-2"
    >
      <div className="flex text-start">
        <img src={shopLogo} alt="storeLogo" className="h-[120px] w-[120px] rounded-xl bg-white" />
        <div className="ml-2 grow pt-3">
          <div className="text-lg">{shopName}</div>
          <div className="flex text-xs">
            <div>⭐️ {starScoreAvg} </div>
            <div> ({reviewCount})</div>
          </div>
          <div className="py-[0.7px] text-xs">{address}</div>
          <div className="py-[0.7px] text-xs">{skills}</div>
          <span className="rounded-lg bg-gray-200 pl-1 pr-2 text-xs">{businessTime}</span>
        </div>
      </div>

      {isBookmarked && (
        <button className="mr-5 pt-3" onClick={handleOpenModal}>
          <IoHeart size={22} color="#ff8e8e" />
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        단골샵에서 삭제합니다.
      </Modal>
    </button>
  );
};

export default ShopBox;
