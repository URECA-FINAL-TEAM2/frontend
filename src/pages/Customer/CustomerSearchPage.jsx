import { useState } from "react";
import CustomerBottom from "../../components/common/CustomerBottom";
import RegionSelectModal from "../../components/common/modal/RegionSelectModal.jsx";
import CustomerSearch from "../../components/CustomerSearch/CustomerSearch.jsx";
import SearchBox from "../../components/CustomerSearch/SearchBox.jsx";
import { MdOutlineEditLocation } from "react-icons/md";
import { HiMap } from "react-icons/hi2";

function CustomerSearchPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO
  const [sidoName, setSidoName] = useState("서울특별시");
  const [sigunguName, setSigunguName] = useState("강남구");

  const onModalClose = () => {
    setIsModalOpen(false);
    // [ ] 이 페이지의 sidoName, sigunguName update
    // [ ] store에 저장 {sidoName, sigunguName}
    // [ ] 지역 수정 PUT API Request 보내기
    // [ ] 매장 리스트 조회 GET API Request 보내기 -> 리렌더링
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
