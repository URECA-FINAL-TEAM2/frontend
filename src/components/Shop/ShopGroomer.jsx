import React from "react";
import { useNavigate } from "react-router-dom";
import { GetCustomerChatRoomList, createChatRoom } from "@/queries/chatQuery";

function ShopGroomer({ shopDetail, isCustomer }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const authStorage = JSON.parse(localStorage.getItem("auth-storage"));
  const customerId = authStorage?.state?.id?.customerId;
  const groomerId = shopDetail?.groomerId;

  const handleStartChat = async () => {
    try {
      // 1. 고객 채팅방 리스트 가져오기
      const chatRoomListResponse = await GetCustomerChatRoomList(customerId);
      const chatRoomList = chatRoomListResponse?.data;

      console.log("Chat Room List:", chatRoomList);
      console.log("Groomer ID:", groomerId);

      // 2. 기존 채팅방 여부 확인
      const existingChatRoom = chatRoomList?.find((room) => room.groomerId === groomerId);

      let roomId;
      if (existingChatRoom) {
        // 기존 채팅방이 존재할 경우
        roomId = existingChatRoom.roomId;
        console.log(`Existing chat room found: ${roomId}`);
      } else {
        // 기존 채팅방이 없을 경우 새로 생성
        const chatRoom = await createChatRoom(customerId, groomerId);
        roomId = chatRoom?.data?.roomId;
        console.log(`New chat room created: ${roomId}`);
      }

      // 3. 채팅 페이지로 이동 +미용사정보들 추가
      navigate(`/chat/${roomId}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const baseButtonClasses = `
    flex h-[28px]
    items-center justify-center 
    rounded-[10px] 
    bg-main-400 
    text-white 
    transition-all duration-300 ease-in-out 
    hover:bg-main-300
  `;

  return (
    <div className="m-5">
      <p className="mb-1 text-lg font-semibold">미용사</p>
      <div className="flex w-full items-center rounded-lg p-3">
        <img
          className="mb-1 h-[100px] w-[100px] rounded-full bg-white object-cover"
          src={shopDetail?.groomerProfileImage}
        ></img>
        <div className="ml-5 flex flex-col">
          <p className="text-[18px] font-bold">{shopDetail?.groomerUsername} 디자이너</p>
          <p className="mb-3 text-[12px] text-gray-600">{shopDetail?.skills}</p>
          <button
            onClick={isCustomer ? handleStartChat : undefined}
            className={`text-sm ${baseButtonClasses} ${!isCustomer ? "cursor-not-allowed" : ""}`}
            disabled={!isCustomer}
          >
            채팅 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopGroomer;
