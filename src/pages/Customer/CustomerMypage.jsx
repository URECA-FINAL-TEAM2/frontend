import SubHeader from "../../components/common/SubHeader";
import DefaultProfile from "/Icons/DefaultCustomerProfile.svg";
import { VscChevronRight } from "react-icons/vsc";
import Summary from "../../components/common/Summary";
import dog from "/Test/dog.jpg";
import addPetIcons from "/Icons/addPet.svg";
import { Link, useNavigate } from "react-router-dom";
import CustomerBottom from "@/components/common/CustomerBottom";
import CustomerList from "@/components/Mypage/CustomerList";
import ToggleButton from "@/components/Main/ToggleButton";

const CustomerMypage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SubHeader title={"마이페이지"} navigate="/customer/home" />
      <main className="mt-[75px]">
        {/* 전환 토글 */}
        <div className="flex items-center justify-between bg-main-200 px-6 py-4">
          <span className="text-md">미용사로 전환</span>
          <ToggleButton />
        </div>
        {/* 프로필 수정 메인  */}
        <div className="flex items-center justify-around p-6">
          <div>
            <img src={DefaultProfile} alt="Default Image" className="rounded-[50%] border-[2px] border-main" />
          </div>
          <div className="flex flex-col">
            <div>
              <span className="text-lg">노승희</span>
              <span> 고객님</span>
            </div>
            <span className="underline">tmdgml2494@gamil.com</span>
          </div>
          <div className="ml-2">
            <button onClick={() => navigate("/customer/info", { state: { role: "customer" } })}>
              <VscChevronRight />
            </button>
          </div>
        </div>

        {/* 요약 */}
        <div className="mx-auto px-6 pb-6">
          <Summary
            firstName={"미용 완료"}
            firstValue={2}
            secondName={"확정된 예약"}
            secondValue={2}
            thirdName={"작성한 리뷰"}
            thirdValue={9}
          />
        </div>
        {/* 반려견 정보 */}
        <div className="mx-auto border-t-2 border-t-main-200 pl-8 pt-6">
          <h2 className="text-xl">🐾 My Pet</h2>

          <div className="flex">
            <Link to={`/customer/myPet/${3}`}>
              <div className="flex w-[80px] flex-col p-2 text-center">
                <img
                  src={dog}
                  alt="Pet Image"
                  className="mx-auto mb-2 h-[70px] w-[70px] rounded-[50%] drop-shadow-xl"
                />
                <span className="text-xs">멍당이</span>
              </div>
            </Link>
            <Link to="/customer/mypet">
              <div className="flex w-[80px] flex-col p-2 text-center">
                <img src={addPetIcons} alt="" className="mx-auto mb-2 h-[70px] w-[70px] rounded-[50%] drop-shadow-md" />
                <span className="text-xs">추가</span>
              </div>
            </Link>
          </div>
        </div>
        {/* 목록 */}
        <CustomerList />
      </main>
      <CustomerBottom />
    </>
  );
};

export default CustomerMypage;
