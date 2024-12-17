import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { GetCustomerChatRoomList, GetGroomerChatRoomList } from "@/queries/chatQuery";
import dayjs from "dayjs";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format("YY.MM.DD HH:mm");
};

const ChatRoomList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [chatRooms, setChatRooms] = useState([]); // 채팅 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 로컬 스토리지에서 사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  const authStorage = JSON.parse(localStorage.getItem("auth-storage"));
  const customerId = authStorage?.state?.id?.customerId;
  const groomerId = authStorage?.state?.id?.groomerId;
  const userType = authStorage?.state?.DefaultRole === "customer"; // 사용자 타입 확인 (고객이면 true)

  // API 호출: userType에 따라 적절한 API 호출
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        setLoading(true);
        let response;
        if (userType) {
          response = await GetCustomerChatRoomList(customerId);
        } else {
          response = await GetGroomerChatRoomList(groomerId);
        }

        console.log("API Response:", response); // 전체 응답 데이터 확인
        const chatRoomData = response.data || [];

        // 데이터 정리
        const sanitizedChatRooms = chatRoomData.map((room) => ({
          id: room.roomId || "unknown",
          name: room.name || "",
          store: room.store || "",
          lastMessage: room.lastMessage || "",
          lastMessageTime: room.lastMessageTime || "",
          groomerName: room.groomerName || "",
          shopName: room.shopName || "",
          shopAddress: room.shopAddress || "주소",
          profileImage: room.profileImage || "/default-profile.png" // 기본 프로필 이미지 설정
        }));
        setChatRooms(sanitizedChatRooms);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
        setError("채팅방 데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, [userType, customerId, groomerId]);

  // 검색어로 채팅 목록 필터링
  const filteredChatRooms = chatRooms.filter((chatRoomData) => {
    const groomerName = chatRoomData.groomerName || ""; // undefined 방지
    const shopName = chatRoomData.shopName || ""; // undefined 방지
    const lastMessage = chatRoomData.lastMessage || ""; // undefined 방지

    return (
      groomerName.includes(searchTerm) || // 이름 검색
      shopName.includes(searchTerm) || // 매장 검색
      lastMessage.includes(searchTerm) // 메시지 내용 검색
    );
  });

  // 필터된 결과를 콘솔에 출력
  console.log("Filtered Chat Rooms:", filteredChatRooms);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* 검색 바 */}
      <div className="bg-white px-4 py-2">
        <div className="flex items-center rounded-2xl border border-main-300 bg-white px-3 py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
            placeholder="이름이나 매장을 검색해 주세요"
            className="h-8 flex-grow bg-transparent text-sm placeholder-gray-300 outline-none"
          />
          <button>
            <IoSearchOutline size={20} />
          </button>
        </div>
      </div>

      <div className="my-2 border-t-4 border-gray-200"></div>

      {/* 채팅 목록 */}
      <div className="flex-grow bg-white">
        {loading ? ( // 로딩 상태 표시
          <div className="mt-4 text-center text-gray-500">로딩 중...</div>
        ) : error ? ( // 에러 상태 표시
          <div className="mt-4 text-center text-red-500">{error}</div>
        ) : filteredChatRooms.length > 0 ? (
          filteredChatRooms.map((chatRoomData) => (
            <Link
              to={`/chat/${chatRoomData.id}`}
              key={chatRoomData.id}
              className="flex items-center border-b-4 border-gray-200 px-6 py-4"
            >
              {/* 채팅방 프로필 이미지 */}
              <img src={chatRoomData.profileImage} className="h-16 w-16 rounded-full" />
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  {/* 고객 or 미용사 */}
                  <div className="text-base font-semibold">
                    {userType ? chatRoomData.groomerName : chatRoomData.customerName}
                  </div>
                  {/* 마지막 메시지 시간 */}
                  <div className="text-xs text-gray-500">{formatDate(chatRoomData.lastMessageTime)}</div>
                </div>
                {/* 매장 정보 */}
                <div className="text-xs text-main-500">
                  {chatRoomData.shopName} · {chatRoomData.shopAddress}
                </div>
                {/* 마지막 메시지 */}
                <div className="text-xs">{chatRoomData.lastMessage}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="mt-4 text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
        <div className="mb-[80px]" />
      </div>
    </div>
  );
};

export default ChatRoomList;
