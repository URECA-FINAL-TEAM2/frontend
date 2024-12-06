import { useState } from "react";
import CustomerBottom from "../../components/common/CustomerBottom";
import RegionSelectModal from "../../components/common/modal/RegionSelectModal.jsx";
import CustomerSearch from "../../components/CustomerSearch/CustomerSearch.jsx";
import SearchBox from "../../components/CustomerSearch/SearchBox.jsx";
import { MdOutlineEditLocation } from "react-icons/md";
import { HiMap } from "react-icons/hi2";

function CustomerSearchPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sidoName = "경기도";
  const sigunguName = "수원시 장안구"; // storage에서 꺼낼 것

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex h-[var(--header-height)] w-full justify-between bg-white px-3">
        <div className="flex h-[var(--header-height)] content-center items-center justify-start gap-1 px-2 text-[18px] font-semibold">
          <HiMap className="mr-1 text-[23px] text-main" />
          {sidoName} {sigunguName}
          <div onClick={onModalOpen}>
            <MdOutlineEditLocation className="cursor-pointer text-[20px] text-gray-300" />
          </div>
        </div>
        <div className="px-2">
          <SearchBox />
        </div>
      </div>

      <main>
        <CustomerSearch />
      </main>
      <CustomerBottom />

      <RegionSelectModal isOpen={isModalOpen} onClose={onModalClose} onConfirm={onModalClose}></RegionSelectModal>
    </>
  );
}

export default CustomerSearchPage;
