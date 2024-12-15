import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const ChatRoomList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const chatRooms = [
    { id: 1, name: "문경", store: "마릴펫 서울시 엘지구", lastMessage: "사진을 보냈습니다.", time: "오후 04:56" },
    { id: 2, name: "혜진", store: "멍멍숍 강남구", lastMessage: "안녕하세요!", time: "오전 10:23" },
    { id: 3, name: "준호", store: "반려샵 서초구", lastMessage: "오늘 약속 가능할까요?", time: "오후 01:12" }
  ];

  // 검색어로 채팅 목록 필터링
  const filteredChatRooms = chatRooms.filter(
    (room) =>
      room.name.includes(searchTerm) || // 이름 검색
      room.store.includes(searchTerm) || // 매장 검색
      room.lastMessage.includes(searchTerm) // 메시지 내용 검색
  );

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
            className="h-8 flex-grow bg-transparent text-sm placeholder-black outline-none"
          />
          <button>
            <IoSearchOutline className="" size={20} />
          </button>
        </div>
      </div>

      <div className="my-2 border-t-4 border-gray-200"></div>

      {/* 채팅 목록 */}
      <div className="flex-grow bg-white">
        {filteredChatRooms.length > 0 ? (
          filteredChatRooms.map((room) => (
            <Link to="/inChat" key={room.id} className="flex items-center border-b-4 border-gray-200 px-6 py-4">
              <img src="https://via.placeholder.com/60" alt="Profile" className="h-16 w-16 rounded-full" />
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold">{room.name}</div>
                  <div className="text-xs text-gray-500">{room.time}</div>
                </div>
                <div className="text-xs text-main-500">{room.store}</div>
                <div className="text-xs">{room.lastMessage}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="mt-4 text-center text-gray-500">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomList;
