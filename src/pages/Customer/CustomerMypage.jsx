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
import useAuthStore from "@/store/authStore";
import { Toaster } from "react-hot-toast";
import Toggle from "@/components/Main/Toggle";

const CustomerMypage = () => {
  const { id } = useAuthStore();
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState([]);
  const [counts, setCounts] = useState({
    completedServices: 0,
    confirmedReservations: 0,
    myReviews: 0
  });
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    profileImage: ""
  });

  useEffect(() => {
    const getMypage = async () => {
      try {
        const response = await getCustomerMypage(id);
        console.log("고객 마이페이지 ", response);
        const myPets = response.myPets;
        const counts = response.counts;
        const userInfo = response.userInfo;
        setMyPets(myPets);
        setCounts(counts);
        setUserInfo(userInfo);
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
        <div className="flex items-center justify-end bg-main-200 px-6 py-3">
          <span className="mr-3 text-sm">미용사로 전환</span>
          <ToggleButton />
          {/* <Toggle /> */}
        </div>
        {/* 프로필 수정 메인  */}
        <button
          onClick={() => navigate("/customer/info", { state: { role: "customer" } })}
          className="mx-auto flex items-center justify-around p-6 px-10"
        >
          <div>
            <img
              src={userInfo.profileImage}
              alt="Default Image"
              className="aspect-square rounded-[50%] border border-main"
            />
          </div>
          <div className="ml-5 flex grow flex-col text-start">
            <div>
              <span className="text-lg">{userInfo.userName}</span>
              <span> 고객님</span>
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
            thirdName={"작성한 리뷰"}
            thirdValue={counts.myReviews}
          />
        </div>
        {/* 반려견 정보 */}
        <div className="mx-auto border-t-2 border-t-main-200 py-3">
          <div className="grid grid-cols-5 px-5">
            {myPets.map((pet) => (
              <Link key={pet.petId} to={`/customer/myPet/${pet.petId}`}>
                <div className="flex w-[70px] flex-col p-2 text-center">
                  <img
                    src={pet.profileImage}
                    alt={`${pet.petName}`}
                    className="mx-auto mb-2 aspect-square w-[65px] rounded-[50%] border border-main-200 drop-shadow-xl"
                  />
                  <span className="text-xs">{pet.petName}</span>
                </div>
              </Link>
            ))}

            {myPets.length < 5 && (
              <Link to="/customer/mypet">
                <div className="flex w-[70px] flex-col p-2 text-center">
                  <img src={addPetIcons} alt="" className="mx-auto mb-2 aspect-square w-[65px] rounded-[50%]" />
                  <span className="text-xs">추가</span>
                </div>
              </Link>
            )}
          </div>
        </div>
        {/* 목록 */}
        <CustomerList />
      </main>
      <CustomerBottom />
      <Toaster />
    </>
  );
};

export default CustomerMypage;
