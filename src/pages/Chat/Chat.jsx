import ChatHeader from "@/components/Chat/ChatHeader";
import { IoArrowUpCircle } from "react-icons/io5";
import { HiPaperClip } from "react-icons/hi2";

const Chat = () => {
  const messages = [
    { sender: "문경", text: "빡빡이컷 하신다고 하셨죠?", time: "오후 04:56" },
    { sender: "윤기", text: "네 강아지도 빡빡이컷이 있나요?", time: "오후 04:56" },
    { sender: "문경", text: "빡빡이컷 하신다고 하셨죠?", time: "오후 04:56" },
    { sender: "윤기", text: "네 강아지도 빡빡이컷이 있나요?", time: "오후 04:56" }
  ];

  return (
    <>
      <ChatHeader />
      <div className="flex h-screen flex-col bg-gray-50 pt-[80px]">
        {/* 채팅창 */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            // 말풍선
            <div key={index} className={`flex items-start ${msg.sender === "윤기" ? "justify-end" : ""} space-x-2`}>
              {msg.sender !== "윤기" && (
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-main-300 text-white">
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
        <div className="bg-white px-3 py-2 shadow">
          <div className="flex items-center space-x-2">
            <HiPaperClip size={23} />
            <input
              type="text"
              placeholder="예약한 디자이너와 상담해보세요."
              className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-main-200"
            />
            <button className="rounded-2xl bg-main-400 text-white">
              <IoArrowUpCircle size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
