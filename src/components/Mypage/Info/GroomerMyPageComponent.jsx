import GroomerList from "../GroomerList";
import GroomerBottom from "@/components/common/GroomerBottom";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "/Icons/DefaultCustomerProfile.svg";
import Summary from "@/components/common/Summary";
import { VscChevronRight } from "react-icons/vsc";

const GroomerMyPageComponent = ({ userInfo, counts }) => {
  const navigate = useNavigate();
  console.log(userInfo);
  return (
    <>
      <button
        onClick={() => navigate("/groomer/info", { state: { role: "groomer" } })}
        className="mx-auto flex items-center justify-around p-6 px-10 text-start"
      >
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={userInfo.profileImage ? userInfo.profileImage : DefaultProfile}
            alt="Default"
            className="h-[80px] w-[80px] rounded-[50%] border border-main object-cover"
          />
        </div>
        <div className="ml-5 flex grow flex-col">
          <div>
            <span className="text-lg">{userInfo.userName}</span>
            <span> 미용사</span>
          </div>
          <span className="text-sm underline">{userInfo.email}</span>
        </div>
        <div className="ml-2">
          <div>
            <VscChevronRight />
          </div>
        </div>
      </button>
      {/* 요약 */}
      <div className="mx-auto px-6 pb-6">
        <Summary
          firstName={"미용 완료"}
          firstValue={counts.completedServices}
          secondName={"확정된 예약"}
          secondValue={counts.confirmedReservations}
          thirdName={"내 매장 리뷰"}
          thirdValue={counts.myReviews}
        />
      </div>
      {/* 목록 */}
      <GroomerList />
      <GroomerBottom />
    </>
  );
};

export default GroomerMyPageComponent;
