import React from "react";

const ReservationInfo = () => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg border border-gray-300">
      {/* 예약자 정보 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">예약자 정보</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">이름</p>
            <p className="font-medium">노현석</p>
          </div>
          <div>
            <p className="text-gray-600">전화번호</p>
            <p className="font-medium">010-2937-2595</p>
          </div>
        </div>
      </div>

      {/* 미용 일시 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">미용 일시</h2>
        <div className="flex items-center space-x-4">
          <p className="bg-gray-100 px-4 py-2 rounded-lg">2024년 11월 24일</p>
          <p className="bg-gray-100 px-4 py-2 rounded-lg">오후 3:00</p>
        </div>
      </div>

      {/* 매장 및 디자이너 정보 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">매장 · 디자이너 정보</h2>
        <div className="border p-4 rounded-lg flex items-center">
          <img
            src="/path/to/logo.png"
            alt="매장 로고"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">명탐정볼롱</p>
            <p className="text-gray-600">경기 안양시 만안구 만안로 96 1층 140호</p>
            <p className="text-gray-600">010-1234-5678</p>
          </div>
        </div>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">반려견 정보</h2>
        <div className="flex items-center">
          <img
            src="/path/to/dog.png"
            alt="반려견 사진"
            className="w-24 h-24 rounded-lg mr-4"
          />
          <div>
            <p className="font-medium">두부</p>
            <p className="text-gray-600">견종: 포메라니안</p>
            <p className="text-gray-600">무게: 2.1kg</p>
            <p className="text-gray-600">나이: 5살</p>
            <p className="text-gray-600">성별: 남아</p>
            <p className="text-gray-600">중성화 여부: Y</p>
            <p className="text-gray-600">미용 신청 여부: N</p>
            <p className="text-gray-600">특이사항: 과하게 몽글해요</p>
          </div>
        </div>
      </div>

      {/* 요청 내용 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">요청 내용</h2>
        <p className="text-gray-600">
          목욕 + 삭발형 입니다. 첨부한 사진들처럼 밸런스가 잘 살게
          꾸며주셨으면 좋겠어요.
        </p>
      </div>

      {/* 첨부 사진 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">첨부 사진</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-24 h-24 bg-gray-100 border rounded-lg"></div>
          <div className="w-24 h-24 bg-gray-100 border rounded-lg"></div>
          <div className="w-24 h-24 bg-gray-100 border rounded-lg"></div>
        </div>
      </div>

      {/* 견적 설명 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">견적 설명</h2>
        <p className="text-gray-600">
          2.1kg 반려견 기준으로 기본요금 40,000원 책정되었습니다. 예상 소요
          시간은 1시간 30분입니다.
        </p>
      </div>

      {/* 결제 정보 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">결제 정보</h2>
        <div className="border p-4 rounded-lg">
          <p className="text-gray-600">결제 상태: <span className="font-medium">paid</span></p>
          <p className="text-gray-600">주문 번호: <span className="font-medium">merchantID</span></p>
          <p className="text-gray-600">결제 수단: <span className="font-medium">card</span></p>
          <p className="text-gray-600">결제 금액: <span className="font-medium">61,000원</span></p>
        </div>
      </div>
    </div> 
  );
};

export default ReservationInfo;
