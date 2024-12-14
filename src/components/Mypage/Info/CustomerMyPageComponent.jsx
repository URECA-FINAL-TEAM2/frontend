import { Link, useNavigate } from "react-router-dom";
import addPetIcons from "/Icons/addPet.svg";

import Summary from "@/components/common/Summary";
import { VscChevronRight } from "react-icons/vsc";
import CustomerList from "../CustomerList";
import { Toaster } from "react-hot-toast";
import CustomerBottom from "@/components/common/CustomerBottom";

const CustomerMyPageComponent = ({ userInfo, myPets, counts }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* 프로필 수정 메인  */}
      <button
        onClick={() => navigate("/customer/info", { state: { role: "customer" } })}
        className="mx-auto flex w-10/12 items-center justify-around py-6 text-start"
      >
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={userInfo.profileImage}
            alt="Default Image"
            className="h-[80px] w-[80px] rounded-[50%] border border-main object-cover"
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
            <Link key={pet.petId} to={`/customer/myPet/${pet?.petId}`}>
              <div className="flex w-[70px] flex-col p-2 text-center">
                <img
                  src={pet.profileImage}
                  alt={`${pet?.petName}`}
                  className="mx-auto mb-2 aspect-square w-[65px] rounded-[50%] border border-main-200 drop-shadow-xl"
                />
                <span className="text-xs">{pet?.petName}</span>
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

      <CustomerBottom />
      <Toaster />
    </>
  );
};

export default CustomerMyPageComponent;
