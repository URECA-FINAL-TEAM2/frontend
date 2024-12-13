import axiosInstance from "@/api/axiosInstance";
import React, { useState, useEffect, useRef } from "react";
import Stomp from "stompjs";

const ChatClient = () => {
  // 상태 변수 선언: 사용자 정보 및 채팅 데이터 관리
  // const [token, setToken] = useState(""); // JWT 토큰 저장
  const [userId, setUserId] = useState(""); // 사용자 ID
  const [userType, setUserType] = useState("true"); // 사용자 유형 (고객/미용사)
  const [customerId, setCustomerId] = useState(""); // 고객 ID
  const [groomerId, setGroomerId] = useState(""); // 미용사 ID
  const [chatId, setChatId] = useState(""); // 채팅방 ID
  const [messages, setMessages] = useState([]); // 채팅 메시지 리스트
  const [messageContent, setMessageContent] = useState(""); // 입력한 메시지 내용
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지
  const [connectionStatus, setConnectionStatus] = useState("Disconnected"); // 연결 상태
  const token = localStorage.getItem("accessToken");

  // ref 선언: 외부 라이브러리 객체 및 DOM 요소 참조
  const stompClient = useRef(null); // Stomp 클라이언트 객체
  const currentSubscription = useRef(null); // 현재 채팅방 구독 정보
  const messagesEndRef = useRef(null); // 메시지 영역 끝 요소

  // 메시지 영역 자동 스크롤 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 메시지 리스트 변경 시 스크롤 이동
  useEffect(scrollToBottom, [messages]);

  // 이미지 선택 핸들러: 파일을 읽어 Base64로 변환
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 서버와 연결 설정
  const WEBSOCKET_URL = "wss://beautymeongdang.com/ws";

  const connect = () => {
    console.log("Connecting to:", WEBSOCKET_URL);
    console.log("token : ", token);
    const socket = new WebSocket(WEBSOCKET_URL); // WebSocket 연결
    stompClient.current = Stomp.over(socket); // Stomp 클라이언트 생성

    // 연결 시도
    stompClient.current.connect(
      {
        Authorization: `Bearer ${token}`,
        UserId: userId,
        CustomerYn: userType
      },
      (frame) => {
        setConnectionStatus("Connected"); // 연결 상태 업데이트
        console.log("Connected:", frame);
      },
      (error) => {
        setConnectionStatus(`Error: ${error}`); // 오류 처리
        console.error("Connection error:", error);
      }
    );
  };

  // 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe(); // 채팅방 구독 해제
      }
      stompClient.current.disconnect(); // 연결 해제
      stompClient.current = null;
      setConnectionStatus("Disconnected"); // 상태 업데이트
    }
  };

  // 채팅방 생성
  const createChatRoom = async () => {
    try {
      const response = await axiosInstance.post(
        "/chats",
        {
          customerId: parseInt(customerId), // 고객 ID
          groomerId: parseInt(groomerId) // 미용사 ID
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      );

      const result = response.data;
      alert(`Chat room created. ID: ${result.data.chatId}`); // 생성된 채팅방 ID 알림
    } catch (error) {
      console.error("Error creating chat room:", error);
      alert("Failed to create chat room.");
    }
  };

  // 채팅방 구독 및 이전 메시지 로드
  const subscribeToChat = async () => {
    try {
      const response = await fetch(`/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const chatMessages = await response.json();
      setMessages(chatMessages.data?.messages || []); // 이전 메시지 설정

      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe(); // 기존 구독 해제
      }

      // 새로운 메시지 구독
      currentSubscription.current = stompClient.current.subscribe(`/sub/chat/room/${chatId}`, (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });
    } catch (error) {
      console.error("Error subscribing to chat:", error);
      alert("Failed to enter chat room.");
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    const messageData = {
      chatId: parseInt(chatId), // 채팅방 ID
      senderId: parseInt(userId), // 메시지 발신자 ID
      content: messageContent, // 메시지 내용
      messageType: "TALK", // 메시지 유형
      customerYn: userType === "true", // 고객 여부
      base64Image: selectedImage // 선택된 이미지
    };

    stompClient.current.send("/pub/send", {}, JSON.stringify(messageData)); // 메시지 전송

    setMessageContent(""); // 입력 필드 초기화
    setSelectedImage(null); // 이미지 초기화
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-6 rounded border p-4">
        <h3 className="text-lg font-semibold">Connection Settings</h3>
        {/* <input
          type="text"
          className="p-2 mr-2 border"
          placeholder="JWT Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        /> */}
        <input
          type="number"
          className="mr-2 border p-2"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <select className="mr-2 border p-2" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="true">Customer</option>
          <option value="false">Groomer</option>
        </select>
        <button className="bg-blue-500 px-4 py-2 text-white" onClick={connect}>
          Connect
        </button>
        <button className="bg-red-500 px-4 py-2 text-white" onClick={disconnect}>
          Disconnect
        </button>
        <div className="mt-2">Status: {connectionStatus}</div>
      </div>

      <div className="mb-6 rounded border p-4">
        <h3 className="text-lg font-semibold">Create Chat Room</h3>
        <input
          type="number"
          className="mr-2 border p-2"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <input
          type="number"
          className="mr-2 border p-2"
          placeholder="Groomer ID"
          value={groomerId}
          onChange={(e) => setGroomerId(e.target.value)}
        />
        <button className="bg-green-500 px-4 py-2 text-white" onClick={createChatRoom}>
          Create
        </button>
      </div>

      <div className="mb-6 rounded border p-4">
        <h3 className="text-lg font-semibold">Chat</h3>
        <input
          type="number"
          className="mr-2 border p-2"
          placeholder="Chat Room ID"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <button className="mr-2 bg-blue-500 px-4 py-2 text-white" onClick={subscribeToChat}>
          Subscribe
        </button>

        <div className="mb-4 h-80 overflow-y-auto border p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 rounded p-2 ${msg.customerYn ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.content}
              {msg.imageUrl && <img src={msg.imageUrl} alt="" className="mt-2 max-w-full" />}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-grow border p-2"
            placeholder="Enter your message"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <input type="file" className="hidden" id="imageInput" accept="image/*" onChange={handleImageSelect} />
          <button
            className="bg-blue-500 px-4 py-2 text-white"
            onClick={() => document.getElementById("imageInput").click()}
          >
            Select Image
          </button>
          <button className="bg-green-500 px-4 py-2 text-white" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
