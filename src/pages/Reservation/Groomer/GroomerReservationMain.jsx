import React, { useEffect, useState } from "react";
import { getGroomerList } from "@/queries/reservationQuery";
import SubHeader from "@/components/common/SubHeader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const GroomerReservationMain = () => {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("today");
  const today = dayjs();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const groomerId = 10;
        const response = await getGroomerList({ groomerId });
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
    today: reservations.filter(
      (item) => dayjs(item.beautyDate).isSame(today, "day") // 오늘의 예약
    ),
    completed: reservations.filter((item) => item.status === "미용 완료"), // 미용 완료
    reserved: reservations.filter((item) => item.status === "예약 완료"), // 예약 완료
    canceled: reservations.filter((item) => item.status === "예약 취소") // 예약 취소
  };

  return (
    <div>
      <SubHeader title="예약 내역" />
      <div className="mx-auto max-w-lg bg-white p-4">
        {/* 상단 탭 */}
        <div className="jusify-around mb-4 mt-12 flex border-b">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 py-2 ${
              activeTab === "today" ? "border-b-4 text-black" : "border-b-4 border-transparent text-gray-500"
            }`}
            style={activeTab === "today" ? { borderColor: "#ff8e8e" } : {}}
          >
            오늘의 예약
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2 ${
              activeTab === "completed" ? "border-b-4 text-black" : "border-b-4 border-transparent text-gray-500"
            }`}
            style={activeTab === "completed" ? { borderColor: "#ff8e8e" } : {}}
          >
            완료
          </button>
          <button
            onClick={() => setActiveTab("reserved")}
            className={`flex-1 py-2 ${
              activeTab === "reserved" ? "border-b-4 text-black" : "border-b-4 border-transparent text-gray-500"
            }`}
            style={activeTab === "reserved" ? { borderColor: "#ff8e8e" } : {}}
          >
            예약
          </button>
          <button
            onClick={() => setActiveTab("canceled")}
            className={`flex-1 py-2 ${
              activeTab === "canceled" ? "border-b-4 text-black" : "border-b-4 border-transparent text-gray-500"
            }`}
            style={activeTab === "canceled" ? { borderColor: "#ff8e8e" } : {}}
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
                <img src={item.profileImage} className="mr-6 h-24 w-24 rounded-lg" />
                <div className="flex w-full flex-col">
                  <p className="mb-1 text-lg font-bold">{item.dogName}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <p>예약 일자</p>
                      <p>예약자 명</p>
                      <p>전화번호</p>
                    </div>
                    <div className="text-right">
                      <p>{new Date(item.beautyDate).toLocaleString()}</p>
                      <p>{item.customerName}</p>
                      <p>{item.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 리뷰 쓰기 버튼 */}
              {activeTab === "completed" && (
                <button className="mt-4 w-full rounded-full bg-main-200 py-1 font-medium text-main-400">
                  리뷰 확인
                </button>
              )}

              {/* 예약 상세 버튼 */}
              {activeTab === "reserved" && (
                <button
                  className="mt-4 w-full rounded-full bg-main-200 py-1 font-medium text-main-400"
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
                  className="mt-4 w-full rounded-full bg-gray-300 py-1 font-medium text-white"
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

export default GroomerReservationMain;
