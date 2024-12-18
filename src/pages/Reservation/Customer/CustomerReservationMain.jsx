import React, { useEffect, useState } from "react";
import { getCustomerList } from "@/queries/reservationQuery";
import SubHeader from "@/components/common/SubHeader";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerReservationMain = () => {
  const location = useLocation();
  const { activeQuotesTab } = location.state || {};
  console.log("acT: ", activeQuotesTab);
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("reserved");
  const navigate = useNavigate();
  const authStorage = JSON.parse(localStorage.getItem("auth-storage"));
  const customerId = authStorage?.state?.id?.customerId;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getCustomerList({ customerId });
        if (response.code === 200) {
          setReservations(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // 탭별 데이터 필터링
  const tabs = {
    completed: reservations.filter((item) => item.status === "미용 완료"), // 미용 완료
    reserved: reservations.filter((item) => item.status === "예약 완료"), // 예약 완료
    canceled: reservations.filter((item) => item.status === "예약 취소") // 예약 취소
  };

  return (
    <div>
      <SubHeader
        title="예약 내역"
        navigate={() => {
          if (activeQuotesTab) {
            navigate("/customer/quotes", { state: { activeTab: activeQuotesTab } });
          } else {
            navigate(-1); // activeQuotesTab이 없으면 단순히 뒤로가기
          }
        }}
      />
      <div className="mx-auto max-w-lg bg-white px-4 pb-4">
        {/* 상단 탭 */}
        <div className="mb-4 mt-[--header-height] flex justify-around border-b">
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2 ${
              activeTab === "completed"
                ? "border-b-2 border-solid border-black font-semibold text-black"
                : "text-gray-300 hover:bg-gray-100"
            }`}
            style={activeTab === "completed" ? { borderColor: "black" } : {}}
          >
            완료
          </button>
          <button
            onClick={() => setActiveTab("reserved")}
            className={`flex-1 py-2 ${
              activeTab === "reserved"
                ? "border-b-2 border-solid border-black font-semibold text-black"
                : "text-gray-300 hover:bg-gray-100"
            }`}
            style={activeTab === "reserved" ? { borderColor: "black" } : {}}
          >
            예약
          </button>
          <button
            onClick={() => setActiveTab("canceled")}
            className={`flex-1 py-2 ${
              activeTab === "canceled"
                ? "border-b-2 border-solid border-black font-semibold text-black"
                : "text-gray-300 hover:bg-gray-100"
            }`}
            style={activeTab === "canceled" ? { borderColor: "black" } : {}}
          >
            취소
          </button>
        </div>
        {/* 탭 내용 */}
        <div>
          {tabs[activeTab]?.map((item) => (
            <div
              key={item.selectedQuoteId}
              className="mb-4 flex flex-col items-center rounded-lg border p-4"
              style={{ borderColor: activeTab === "canceled" ? "#858585" : "#ff8e8e" }}
            >
              <div className="flex w-full items-center">
                <img src={item.profileImage} alt={item.shopName} className="mr-6 h-24 w-24 rounded-lg" />
                <div className="flex w-full flex-col">
                  <p className="mb-1 font-bold">
                    {item.shopName} - {item.groomerName} 디자이너
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <p>예약 일자</p>
                      <p>반려견</p>
                    </div>
                    <div className="text-right">
                      <p>{new Date(item.beautyDate).toLocaleString()}</p>
                      <p>{item.dogName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {activeTab === "completed" && (
                <div className="mt-4 flex w-[330px] space-x-4">
                <button
                  onClick={() => {
                    console.log(customerId, item?.groomerId, item?.selectedQuoteId);
                    navigate(`/customer/postReview/${customerId}`, {
                      //TODO groomerId 받아서 넘기기
                      state: { item } // 원하는 state를 담음
                    });
                  }}
                  className="mt-4 w-full rounded-full bg-main-200 py-1 font-medium text-main-400"
                >
                  리뷰 쓰기
                </button>

                  {/* 예약 상세 */}
                  <button
                    className="w-full rounded-[10px] bg-main-400 py-1 font-medium text-white"
                    onClick={() =>
                      navigate("detail", {
                        state: { selectedQuoteId: item.selectedQuoteId, status: item.status }
                      })
                    }
                  >
                    예약 상세
                  </button>
                </div>
              )}

              {/* 예약 상세 버튼 */}
              {activeTab === "reserved" && (
                <button
                  className="mt-4 w-full rounded-[10px] bg-main-200 py-1 font-medium text-main-400"
                  onClick={() =>
                    navigate("detail", {
                      state: { selectedQuoteId: item.selectedQuoteId, status: item.status }
                    })
                  }
                >
                  예약 상세
                </button>
              )}

              {/* 취소 예약 상세 버튼 */}
              {activeTab === "canceled" && (
                <button
                  className="mt-4 w-full rounded-[10px] bg-gray-300 py-1 font-medium text-white"
                  onClick={() =>
                    navigate("detail", {
                      state: { selectedQuoteId: item.selectedQuoteId, status: item.status }
                    })
                  }
                >
                  예약 상세
                </button>
              )}
            </div>
          ))}
          {tabs[activeTab]?.length === 0 && <p className="mt-10 text-center text-gray-500">내용이 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomerReservationMain;
