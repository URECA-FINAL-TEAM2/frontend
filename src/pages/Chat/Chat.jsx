import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { connect, sendMessage, fetchPreviousMessages, subscribeToChatRoom } from "@/queries/chatQuery";
import ChatHeader from "@/components/Chat/ChatHeader";
import { IoArrowUpCircle } from "react-icons/io5";
import { HiPaperClip } from "react-icons/hi2";
import dayjs from "dayjs";

const Chat = () => {
  const location = useLocation();
  const headerData = location.state || {};

  const { roomId } = useParams(); // URL에서 roomId 가져오기
  const stompClientRef = useRef(null);
  const currentSubscriptionRef = useRef(null);
  const messagesEndRef = useRef(null); // 메시지 영역 끝 요소

  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const [messageContent, setMessageContent] = useState(""); // 입력 메시지 상태
  const [selectedImage, setSelectedImage] = useState(null); // 첨부 이미지 상태
  const [groomerInfo, setGroomerInfo] = useState(null); // Groomer 정보
  const [customerInfo, setCustomerInfo] = useState(null); // Customer 정보

  const token = localStorage.getItem("accessToken");
  const authStorage = JSON.parse(localStorage.getItem("auth-storage"));
  const userId = authStorage?.state?.id?.userId;
  const userType = authStorage?.state?.DefaultRole === "customer";

  const DefaultRole = authStorage?.state?.DefaultRole;

  //스크롤 자동 이동
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const setupWebSocketAndSubscription = async () => {
      try {
        // 1. WebSocket 연결
        await new Promise((resolve, reject) => {
          connect(stompClientRef, token, userId, userType, (status) => {
            if (status === "Connected") {
              resolve();
            } else {
              reject(new Error("Failed to connect to WebSocket"));
            }
          });
        });
        console.log("WebSocket connected successfully.");

        // 2. 이전 메시지와 프로필 정보 불러오기
        const chatData = await fetchPreviousMessages(roomId);
        setMessages(chatData.data?.messages || []);
        setGroomerInfo(chatData.data?.groomerInfo);
        setCustomerInfo(chatData.data?.customerInfo);
        // 3. 채팅방 구독 설정
        subscribeToChatRoom(stompClientRef, currentSubscriptionRef, roomId, setMessages);
        console.log("Subscribed to chat and loaded previous messages.");
      } catch (error) {
        console.error("Error setting up WebSocket and subscription:", error);
      }
    };

    setupWebSocketAndSubscription();

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        console.log("WebSocket disconnected");
      }
    };
  }, [roomId, token, userId, userType]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (!messageContent.trim() && !selectedImage) return;

    console.log("Sending userType:", userType);
    const imageFile = selectedImage?.file || null;
    sendMessage(stompClientRef, roomId, userId, messageContent, userType, imageFile);

    setMessageContent("");
    setSelectedImage(null);
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage({
          file: reader.result,
          preview: previewUrl
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ChatHeader DefaultRole={DefaultRole} groomerInfo={groomerInfo} customerInfo={customerInfo} />
      <div className="flex h-screen flex-col bg-gray-50 pt-[80px]">
        {/* 채팅창 */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.customerYn ? "justify-end" : "justify-start"} items-center space-x-2`}
            >
              {/* Groomer 메시지 */}
              {!msg.customerYn && groomerInfo && (
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center">
                    <img
                      src={groomerInfo.groomerProfileImage}
                      alt={groomerInfo.groomerName}
                      className="mb-1 h-10 w-10 rounded-full object-cover"
                    />
                    <div className="text-xs font-semibold text-gray-700">{groomerInfo.groomerName}</div>
                  </div>
                  <div className="relative flex items-center space-x-2">
                    <div className="max-w-xs rounded-lg bg-main-100 p-2 text-black">
                      {msg.messageContent}
                      {msg.imageUrl && <img src={msg.imageUrl} alt="" className="mt-2 max-w-full" />}
                    </div>
                    <p className="text-xs text-gray-500">{dayjs(msg.messageTime).format("YY-MM-DD HH:mm")}</p>
                  </div>
                </div>
              )}

              {/* Customer 메시지 */}
              {msg.customerYn && customerInfo && (
                <div className="flex items-center justify-end space-x-2">
                  <div className="relative flex items-end space-x-2">
                    <p className="text-xs text-gray-500">{dayjs(msg.messageTime).format("YY.MM.DD · HH:mm")}</p>
                    <div className="max-w-40 rounded-lg bg-main-400 p-2 text-white">
                      {/* 수신한 내용 */}
                      <img src={msg.messageImage} alt="" className="mt-2 max-w-full" />
                      <div className="text-right">{msg.messageContent}</div>

                      {/* 송신한 내용 */}
                      {msg.imageUrl && <img src={msg.imageUrl} alt="" className="mt-2 max-w-full" />}
                      <div className="text-right">{msg.content}</div>
                    </div>
                  </div>
                  {/* 고객 자신은 자신의 프로필 안 봐도 될 것 같아서 일단 주석처리함. */}
                  {/* <div className="flex flex-col items-center">
                    <img
                      src={customerInfo.customerProfileImage}
                      alt={customerInfo.customerName}
                      className="mb-1 h-12 w-12 rounded-full object-cover"
                    />
                    <div className="text-xs font-semibold text-gray-700">{customerInfo.customerName}</div>
                  </div> */}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 인풋란 */}
        <div className={`bg-white px-3 py-2 shadow transition-all duration-200 ${selectedImage ? "h-20" : "h-16"}`}>
          <div className="flex items-center space-x-2">
            {/* 클립 아이콘 */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <HiPaperClip size={23} />
            </label>
            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            {/* 이미지 미리보기 */}
            {selectedImage && (
              <div className="relative flex items-center">
                <img src={selectedImage.preview} alt="첨부 이미지" className="h-14 w-14 rounded-md object-cover" />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                >
                  ×
                </button>
              </div>
            )}

            {/* 텍스트 입력 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="메시지를 입력하세요."
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-main-200"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>

            {/* 전송 버튼 */}
            <button onClick={handleSendMessage} className="rounded-2xl bg-main-400 text-white">
              <IoArrowUpCircle size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
