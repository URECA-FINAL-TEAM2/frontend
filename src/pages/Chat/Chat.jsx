import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GiDogHouse } from "react-icons/gi";

const Chat = () => {
  // 더미
  const messages = [
    { sender: "문경", text: "빡빡이컷 하신다고 하셨죠?", time: "오후 04:56" },
    { sender: "윤기", text: "네 강아지도 빡빡이컷이 있나요?", time: "오후 04:56" },
    { sender: "문경", text: "빡빡이컷 하신다고 하셨죠?", time: "오후 04:56" },
    { sender: "윤기", text: "네 강아지도 빡빡이컷이 있나요?", time: "오후 04:56" }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow">
        <button>
          <MdKeyboardArrowLeft size="35" />
        </button>
        <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-full w-15 h-15" />
        <div>
          <h1 className="text-lg font-semibold">문경</h1>
          <p className="text-sm text-gray-500">마릴린펫 · 서울시 엘지구</p>
        </div>
        <button>
          <GiDogHouse className="text-xl text-main-500 hover:text-red-800" />
          매장보기
        </button>
      </div>

      {/* 채팅창 */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          // 말풍선
          <div key={index} className={`flex items-start ${msg.sender === "윤기" ? "justify-end" : ""} space-x-2`}>
            {msg.sender !== "윤기" && (
              <div className="flex items-center justify-center w-8 h-8 text-white bg-pink-400 rounded-full">
                {msg.sender}
              </div>
            )}
            <div className={`max-w-xs ${msg.sender === "윤기" ? "text-right" : ""}`}>
              <div
                className={`rounded-lg px-4 py-2 ${msg.sender === "윤기" ? "bg-main-400 text-white" : "bg-main-100"}`}
              >
                <p>{msg.text}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 인풋란 + 첨부사진추가해야함 */}
      <div className="px-4 py-2 bg-white shadow">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="예약한 디자이너와 상담해보세요."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button className="p-2 text-white bg-pink-500 rounded-lg">→</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
