import React, { useState } from "react";

const ReservationHistory = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("completed");

  // 탭에 따른 데이터
  const tabs = {
    completed: [
      {
        id: 1,
        image: "/path/to/dog.png",
        title: "위드두유 - 00디자이너",
        date: "2024.09.14 목 14:00",
        status: "완료",
      },
    ],
    reserved: [
      {
        id: 2,
        image: "/path/to/dog2.png",
        title: "바우바우 - 00디자이너",
        date: "2024.12.01 월 16:00",
        status: "예약",
      },
    ],
    canceled: [
      {
        id: 3,
        image: "/path/to/dog3.png",
        title: "몽글몽글 - 00디자이너",
        date: "2024.11.20 수 11:00",
        status: "취소",
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4">
      {/* 상단 탭 */}
      <div className="flex justify-around border-b mb-4">
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-2 ${
            activeTab === "completed"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          완료
        </button>
        <button
          onClick={() => setActiveTab("reserved")}
          className={`pb-2 ${
            activeTab === "reserved"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          예약
        </button>
        <button
          onClick={() => setActiveTab("canceled")}
          className={`pb-2 ${
            activeTab === "canceled"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500"
          }`}
        >
          취소
        </button>
      </div>

      {/* 탭 내용 */} 
      <div>
        {tabs[activeTab]?.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 mb-4 flex items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500">{item.date}</p>
              <p className="text-gray-500">{item.status}</p>
            </div>
          </div>
        ))}
        {tabs[activeTab]?.length === 0 && (
          <p className="text-center text-gray-500">내용이 없습니다.</p>
        )}
      </div>

      {/* 리뷰 쓰기 버튼 */}
      {activeTab === "completed" && (
        <button className="w-full py-2 bg-pink-100 text-pink-500 font-medium rounded-lg mt-4">
          리뷰쓰기
        </button>
      )}
    </div>
  );
};

export default ReservationHistory;
