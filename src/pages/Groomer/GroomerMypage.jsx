import SubHeader from "../../components/common/SubHeader";
import DefaultProfile from "/Icons/DefaultCustomerProfile.svg";
import { VscChevronRight } from "react-icons/vsc";
import Summary from "../../components/common/Summary";
import { useNavigate } from "react-router-dom";
import GroomerBottom from "@/components/common/GroomerBottom";
import GroomerList from "@/components/Mypage/GroomerList";
import ToggleButton from "@/components/Main/ToggleButton";

const GroomerMypage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SubHeader title={"마이페이지"} navigate="/customer/home" />
      <main className="mt-[75px]">
        {/* 전환 토글 */}
        <div className="flex items-center justify-between bg-main-200 px-6 py-4">
          <span className="text-md">고객으로 전환</span>
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
              <span> 미용사</span>
            </div>
            <span className="underline">tmdgml2494@gamil.com</span>
          </div>
          <div className="ml-2">
            <button onClick={() => navigate("/groomer/info", { state: { role: "groomer" } })}>
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
            thirdName={"내 매장 리뷰"}
            thirdValue={9}
          />
        </div>
        {/* 목록 */}
        <GroomerList />
      </main>
      <GroomerBottom />
    </>
  );
};

export default GroomerMypage;
