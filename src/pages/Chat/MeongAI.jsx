import { IoArrowUpCircle } from "react-icons/io5";
import MeongChatHeader from "@/components/Chat/MeongChatHeader";
import TypingEffect from "@/utils/TypingEffect";
import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import logo from "/Logo/logoBtn.png";

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${period} ${formattedHours}:${formattedMinutes}`;
};

const MeongAI = () => {
  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendChat = async () => {
    const currentTime = formatTime();

    setMessageList((prev) => [...prev, { sender: "user", text: input, time: currentTime }]);
    setInput("");

    const sendData = [
      {
        role: "user",
        content: input
      }
    ];

    try {
      const response = await axiosInstance.post("/gpt/chat-completion", sendData);
      const responseChat = response.data.data.choices[0].message.content;

      setMessageList((prev) => [...prev, { sender: "meongAI", text: responseChat, time: formatTime() }]);
    } catch (error) {
      console.error("Chat API error:", error);

      setMessageList((prev) => [
        ...prev,
        { sender: "meongAI", text: "Error occurred while fetching response.", time: formatTime() }
      ]);
    }
  };

  return (
    <>
      <MeongChatHeader />
      <div className="flex h-screen flex-col bg-gray-50 pt-[80px]">
        {/* 채팅창 */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <TypingEffect text="반가워요! 저는 멍당AI라고 해요. 저에게 무엇이든 물어보세요!" speed={150} />
          {messageList.map((msg, index) => (
            // 말풍선
            <div key={index} className={`flex items-start ${msg.sender === "user" ? "justify-end" : ""} space-x-2`}>
              {msg.sender !== "user" && (
                <img
                  src={logo}
                  alt=""
                  className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-main-300 p-1"
                />
              )}
              <div className={`max-w-xs ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`rounded-lg px-4 py-2 ${msg.sender === "user" ? "bg-main-400 text-white" : "bg-main-100"}`}
                >
                  <p>{msg.text}</p>
                </div>
                <p className={`mt-1 text-xs text-gray-500 ${msg.sender === "user" ? "mr-2" : "ml-2"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="bg-white px-3 py-2 shadow">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="멍당AI에게 무엇이든 물어보세요!"
              className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-main-200"
            />
            <button onClick={sendChat} className="rounded-2xl bg-main-400 text-white">
              <IoArrowUpCircle size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeongAI;
