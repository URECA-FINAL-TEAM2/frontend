import axiosInstance from "@/api/axiosInstance";
import Stomp from "stompjs";

// 서버와 연결 설정 함수
export const connect = (stompClientRef, token, userId, userType, setConnectionStatus) => {
  const socket = new WebSocket("wss://www.beautymeongdang.com/ws");
  stompClientRef.current = Stomp.over(socket);

  const header = {
    Authorization: `Bearer ${token}`,
    UserId: userId,
    CustomerYn: userType
  };

  stompClientRef.current.connect(
    header,
    (frame) => {
      setConnectionStatus("Connected");
      console.log("Connected:", frame);
    },
    (error) => {
      setConnectionStatus(`Error: ${error}`);
      console.error("Connection error:", error);
    }
  );
};

// 연결 해제 함수
export const disconnect = (stompClientRef, currentSubscriptionRef, setConnectionStatus) => {
  if (stompClientRef.current) {
    if (currentSubscriptionRef.current) {
      currentSubscriptionRef.current.unsubscribe();
    }
    stompClientRef.current.disconnect();
    stompClientRef.current = null;
    setConnectionStatus("Disconnected");
  }
};

// 채팅방 생성 함수
export const createChatRoom = async (customerId, groomerId) => {
  try {
    const response = await axiosInstance.post(
      "/chats",
      {
        customerId: parseInt(customerId),
        groomerId: parseInt(groomerId)
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw new Error("Failed to create chat room.");
  }
};

// 이전 메시지 + 프로필정보  반환 함수
export const fetchPreviousMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(`/messages/${chatId}`);
    if (!response || !response.data) {
      throw new Error("Failed to fetch messages");
    }
    return response.data; // 전체 데이터 반환 (messages, groomerInfo, customerInfo)
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch previous messages.");
  }
};

// 구독 함수
export const subscribeToChatRoom = (stompClientRef, currentSubscriptionRef, chatId, setMessages) => {
  if (currentSubscriptionRef.current) {
    currentSubscriptionRef.current.unsubscribe(); // 기존 구독 해제
    currentSubscriptionRef.current = null;
  }

  if (stompClientRef.current) {
    currentSubscriptionRef.current = stompClientRef.current.subscribe(`/sub/chat/room/${chatId}`, (message) => {
      const messageData = JSON.parse(message.body);
      console.log("구독", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
  } else {
    console.error("WebSocket client is not initialized.");
  }
};

// 메시지 전송 함수 - 원본
export const sendMessage = (stompClientRef, chatId, userId, messageContent, userType, imageFile) => {
  const messageData = {
    chatId: parseInt(chatId),
    senderId: parseInt(userId),
    content: messageContent,
    messageType: "TALK",
    customerYn: userType,
    base64Image: imageFile
  };

  stompClientRef.current.send("/pub/send", {}, JSON.stringify(messageData));
};

// 메세지 전송 함수 - 승희 수정
export const sendMessage1 = (stompClientRef, chatId, userId, messageContent, userType, selectedImage) => {
  const formData = new FormData();

  const messageData = {
    chatId: parseInt(chatId),
    senderId: parseInt(userId),
    content: messageContent,
    messageType: "TALK",
    customerYn: userType,
    base64Image: selectedImage
  };

  formData.append("messageData", JSON.stringify(messageData)); // 문자열들
  formData.append("base64Image", selectedImage); // 이미지 파일

  stompClientRef.current.send("/pub/send", {}, formData);
};

// 고객 채팅방 리스트
export const GetCustomerChatRoomList = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/chats/customer/${customerId}`, {
      headers: {
        Accept: "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw new Error("Failed to create chat room.");
  }
};

// 미용사 채팅방 리스트
export const GetGroomerChatRoomList = async (groomerId) => {
  try {
    const response = await axiosInstance.get(`/chats/customer/${groomerId}`, {
      headers: {
        Accept: "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw new Error("Failed to create chat room.");
  }
};
