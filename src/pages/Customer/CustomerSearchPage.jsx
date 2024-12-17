import { useState } from "react";
import CustomerBottom from "../../components/common/CustomerBottom";
import RegionSelectModal from "../../components/common/modal/RegionSelectModal.jsx";
import CustomerSearch from "../../components/CustomerSearch/CustomerSearch.jsx";
import SearchBox from "../../components/CustomerSearch/SearchBox.jsx";
import { MdOutlineEditLocation } from "react-icons/md";
import { HiMap } from "react-icons/hi2";
import useRegionStore from "@/store/regionStore";
import { updateUserAddress } from "@/queries/userQuery";
import useAuthStore from "@/store/authStore";

function CustomerSearchPage(props) {
  const { id } = useAuthStore();
  const { sidoName, sigunguName, setRegion } = useRegionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleLocationSelect = (selectLocation) => {
    const updateAddress = async () => {
      try {
        const response = await updateUserAddress(selectLocation.sidoName, selectLocation.sigunguName, id.customerId);
        console.log(response);
        setRegion(selectLocation.sidoName, selectLocation.sigunguName);
      } catch (err) {
        console.error("회원 주소 업데이트에 실패했습니다.", err);
        setError("회원 주소 업데이트에 실패했습니다.");
      }
    };
    // [x] store에 저장 {sidoName, sigunguName}
    // [x] 지역 수정 PUT API Request 보내기
    // [x] 매장 리스트 조회 GET API Request 보내기 -> 리렌더링
    updateAddress();
    setIsModalOpen(false);
  };

  return (
    <div className="absolute h-[100vh] w-[400px] overflow-y-clip">
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

      <RegionSelectModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={handleLocationSelect}
        sidoName={sidoName}
        sigunguName={sigunguName}
      ></RegionSelectModal>
    </div>
  );
}

export default CustomerSearchPage;
