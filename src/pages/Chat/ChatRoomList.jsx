import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const ChatRoomList = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* 검색 바 */}
      <div className="bg-white px-4 py-2">
        <div className="flex items-center rounded-2xl border border-main-300 bg-white px-3 py-2">
          <input
            type="text"
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
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Link to="/inChat" key={index} className="flex items-center border-b-4 border-gray-200 px-6 py-4">
              <img src="https://via.placeholder.com/60" alt="Profile" className="h-16 w-16 rounded-full" />
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold">문경</div>
                  <div className="text-xs text-gray-500">오후 04:56</div>
                </div>
                <div className="text-xs text-main-500">마릴펫 서울시 엘지구</div>
                <div className="text-xs">사진을 보냈습니다.</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
