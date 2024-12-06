import SubHeader from "../../components/common/SubHeader";
import DefaultProfile from "/Icons/DefaultCustomerProfile.svg";
import { VscChevronRight } from "react-icons/vsc";
import Summary from "../../components/common/Summary";
import { useNavigate } from "react-router-dom";
import GroomerBottom from "@/components/common/GroomerBottom";
import GroomerList from "@/components/Mypage/GroomerList";
import ToggleButton from "@/components/Main/ToggleButton";
import { useEffect, useState } from "react";
import { getGroomerMypage } from "@/queries/mypageQuery";

const GroomerMypage = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    completedServices: 0,
    confirmedReservations: 0,
    myReviews: 0
  });
  const [userInfo, setUserInfo] = useState({
    id: 0,
    nickname: "",
    email: "",
    profileImage: ""
  });

  useEffect(() => {
    const getMypage = async () => {
      try {
        const response = await getGroomerMypage();
        const counts = response[0].data.counts;
        const info = response[0].data;

        setCounts((prev) => ({
          ...prev,
          completedServices: counts.completedServices,
          confirmedReservations: counts.confirmedReservations,
          myReviews: counts.myReviews
        }));

        setUserInfo((prev) => ({
          ...prev,
          id: info.GroomerId,
          nickname: info.nickname,
          email: info.email,
          profileImage: info.profileImage
        }));
      } catch (error) {
        console.error("Error: groomer Mypage", error);
      }
    };

    getMypage();
  }, []);

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
        <div className="flex items-center justify-around p-6 px-10">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={DefaultProfile}
              alt="Default"
              className="h-full w-full rounded-[50%] border-[2px] border-main object-cover"
            />
          </div>
          <div className="ml-5 flex grow flex-col">
            <div>
              <span className="text-lg">{userInfo.nickname}</span>
              <span> 미용사</span>
            </div>
            <span className="underline">{userInfo.email}</span>
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
            firstValue={counts.completedServices}
            secondName={"확정된 예약"}
            secondValue={counts.confirmedReservations}
            thirdName={"내 매장 리뷰"}
            thirdValue={counts.myReviews}
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
