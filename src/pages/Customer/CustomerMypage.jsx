import SubHeader from "../../components/common/SubHeader";
import DefaultProfile from "/Icons/DefaultCustomerProfile.svg";
import { VscChevronRight } from "react-icons/vsc";
import Summary from "../../components/common/Summary";
import addPetIcons from "/Icons/addPet.svg";
import { Link, useNavigate } from "react-router-dom";
import CustomerBottom from "@/components/common/CustomerBottom";
import CustomerList from "@/components/Mypage/CustomerList";
import ToggleButton from "@/components/Main/ToggleButton";
import { useEffect, useState } from "react";
import { getCustomerMypage } from "@/queries/mypageQuery";

const CustomerMypage = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    dogId: 0,
    dogname: "",
    profileImage: ""
  });
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
        const response = await getCustomerMypage();
        const dogInfo = response[0].data.MyPet;
        const counts = response[0].data.counts;
        const info = response[0].data;

        setPet((prev) => ({
          ...prev,
          dogId: dogInfo.dogId,
          dogName: dogInfo.dogname,
          profileImage: dogInfo.profileImage
        }));

        setCounts((prev) => ({
          ...prev,
          completedServices: counts.completedServices,
          confirmedReservations: counts.confirmedReservations,
          myReviews: counts.myReviews
        }));

        setUserInfo((prev) => ({
          ...prev,
          id: info.customerId,
          nickname: info.nickname,
          email: info.email,
          profileImage: info.profileImage
        }));
      } catch (error) {
        console.error("Error: Customer Mypage", error);
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
          <span className="text-md">미용사로 전환</span>
          <ToggleButton />
        </div>
        {/* 프로필 수정 메인  */}
        <div className="flex items-center justify-around p-6 px-10">
          <div>
            <img src={DefaultProfile} alt="Default Image" className="rounded-[50%] border-[2px] border-main" />
          </div>
          <div className="ml-5 flex grow flex-col">
            <div>
              <span className="text-lg">{userInfo.nickname}</span>
              <span> 고객님</span>
            </div>
            <span className="underline">{userInfo.email}</span>
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
            firstValue={counts.completedServices}
            secondName={"확정된 예약"}
            secondValue={counts.confirmedReservations}
            thirdName={"작성한 리뷰"}
            thirdValue={counts.myReviews}
          />
        </div>
        {/* 반려견 정보 */}
        <div className="mx-auto border-t-2 border-t-main-200 pl-8 pt-6">
          <h2 className="text-xl">🐾 My Pet</h2>

          <div className="flex">
            <Link to={`/customer/myPet/${pet.dogId}`}>
              <div className="flex w-[80px] flex-col p-2 text-center">
                <img
                  src={pet.profileImage}
                  alt="Pet Image"
                  className="mx-auto mb-2 h-[70px] w-[70px] rounded-[50%] drop-shadow-xl"
                />
                <span className="text-xs">{pet.dogName}</span>
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
