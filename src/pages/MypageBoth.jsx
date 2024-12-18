import SubHeader from "@/components/common/SubHeader";
import Toggle from "@/components/Main/Toggle";
import { getUserMypage } from "@/queries/mypageQuery";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import CustomerMyPageComponent from "@/components/Mypage/Info/CustomerMyPageComponent";
import GroomerMyPageComponent from "@/components/Mypage/Info/GroomerMyPageComponent";
import Header from "@/components/common/Header";

const MypageBoth = () => {
  const { id, DefaultRole } = useAuthStore();
  const [isChecked, setIsChecked] = useState(DefaultRole === "customer" ? true : false);
  const [myPets, setMyPets] = useState([]);
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
        const response = await getUserMypage(DefaultRole, id);
        const myPets = response?.myPets || [];
        const counts = response?.counts || {};
        const customerInfo = response?.userInfo || {};
        const GroomerInfo = response || {};

        setMyPets(myPets);
        setCounts(counts);
        if (DefaultRole === "customer") {
          setUserInfo(customerInfo);
        } else {
          setUserInfo((prev) => ({
            ...prev,
            id: GroomerInfo.GroomerId || "",
            userName: GroomerInfo.userName || "",
            email: GroomerInfo.email || "",
            profileImage: GroomerInfo.profileImage || ""
          }));
        }
      } catch (error) {
        console.error("Error: fetch Mypage", error);
      }
    };

    getMypage();
  }, [DefaultRole]);

  return (
    <>
      {/* <SubHeader title={"마이페이지"} /> */}
      <Header />
      <main className="mt-[75px]">
        <div className="flex items-center justify-end bg-main-200 px-6">
          <Toggle isChecked={isChecked} setIsChecked={setIsChecked} />
        </div>

        {isChecked ? (
          <CustomerMyPageComponent userInfo={userInfo} myPets={myPets} counts={counts} />
        ) : (
          <GroomerMyPageComponent userInfo={userInfo} counts={counts} />
        )}
      </main>
    </>
  );
};

export default MypageBoth;
