import React from "react";

const ChatRoomList = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <h1 className="ml-5 mt-5 text-xl font-bold">채팅</h1>
      {/* 검색 바 */}
      <div className="bg-white px-4 py-2">
        <div className="flex items-center rounded-md bg-main-400 px-3 py-2">
          <input
            type="text"
            placeholder="이름이나 매장을 검색해 주세요"
            className="h-8 flex-grow bg-transparent text-sm text-gray-100 placeholder-white outline-none"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="white"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="my-2 border-t-4 border-gray-200"></div>

      {/* 채팅 목록 */}
      <div className="flex-grow bg-white">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center border-b-4 border-gray-200 px-6 py-4">
              <img src="https://via.placeholder.com/60" alt="Profile" className="h-16 w-16 rounded-full" />
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold">문경</div>
                  <div className="text-sm text-gray-500">오후 04:56</div>
                </div>
                <div className="mt-1 text-sm text-gray-500">마릴펫 서울시 엘지구</div>
                <div className="mt-1 text-base">사진을 보냈습니다.</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
