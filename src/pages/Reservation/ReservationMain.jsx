import React, { useState } from "react";

const ReservationMain = () => {
  const [activeTab, setActiveTab] = useState("completed");

  // 임시로 넣어놨음 보기 좋게
  const reservations = [
    {
      image: "",
      title: "예약예약 - 00디자이너",
      date: "2024.11.14 목 14:00",
      petName: "뭉치",
      status: "예약"
    },
    {
      image: "",
      title: "완료완료 - 00디자이너",
      date: "2024.11.14 목 14:00",
      petName: "뭉치",
      status: "완료"
    },
    {
      image: "",
      title: "취소취소 - 00디자이너",
      date: "2024.11.14 목 14:00",
      petName: "뭉치",
      status: "취소",
      cancelReason: "단순 변심"
    }
  ];

  // 탭별 데이터 필터링
  const tabs = {
    completed: reservations.filter((item) => item.status === "완료"), // 미용완료=공통코드040
    reserved: reservations.filter((item) => item.status === "예약"), // 예약완료=공통코드010
    canceled: reservations.filter((item) => item.status === "취소") // 취소완료=공통코드030
  };

  return (
    <div className="mx-auto max-w-lg bg-white p-4">
      {/* 상단 탭 */}
      <div className="mb-4 flex justify-around border-b">
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
        {tabs[activeTab]?.map((item, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col items-center rounded-lg border p-4"
            style={{ borderColor: "#ff8e8e" }}
          >
            <div className="flex w-full items-center">
              <img src={item.image} alt={item.title} className="mr-6 h-24 w-24 rounded-lg" />
              <div className="flex w-full flex-col">
                <p className="mb-2 text-lg font-bold">{item.title}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <p>예약 일자</p>
                    <p>반려견</p>
                  </div>
                  <div className="text-right">
                    <p>{item.date}</p>
                    <p>{item.petName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 리뷰 쓰기 버튼 */}
            {activeTab === "completed" && (
              <button className="w-full rounded-full bg-main-200 py-1 font-medium text-main-400">리뷰 쓰기</button>
            )}

            {/* 예약 취소 버튼 */}
            {activeTab === "reserved" && (
              <button className="w-full rounded-full bg-main-200 py-1 font-medium text-main-400">예약 취소</button>
            )}

            {/* 취소사유 */}
            {activeTab === "canceled" && item.cancelReason && (
              <div className="mt-4 flex w-full justify-end text-gray-500">
                <p className="font-semibold">취소 사유 : {item.cancelReason}</p>
              </div>
            )}
          </div>
        ))}
        {tabs[activeTab]?.length === 0 && <p className="text-center text-gray-500">내용이 없습니다.</p>}
      </div>
    </div>
  );
};

export default ReservationMain;
