import React, { useState, useEffect } from "react";
import { getReservationDetail } from "@/queries/reservationQuery";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { BiSolidDog } from "react-icons/bi";
import { GrDocumentText, GrDocumentUser } from "react-icons/gr";
import { TbPhoto, TbCreditCard } from "react-icons/tb";
import BottomButton from "@/components/common/button/BottomButton";
import Modal from "@/components/common/modal/modal";

const CustomerReservationDetail = ({ selectedQuoteId = 1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getReservationDetail(selectedQuoteId);
        if (response.code === 200) {
          setDetail(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("예약 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchDetail();
  }, [selectedQuoteId]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCancelReason("");
  };

  const handleConfirmModal = () => {
    if (cancelReason.trim() === "") {
      alert("취소 사유를 입력해주세요."); // 안쓰면 팝업
      return;
    }
    console.log("취소 사유:", cancelReason); // API 연동 필요
    setIsModalOpen(false);
    setCancelReason("");
    alert("예약이 취소되었습니다.");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!detail) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="mx-auto max-w-lg bg-white p-6">
      {/* 예약자 정보 */}
      <h2 className="mb-2 text-xl font-semibold">예약자 정보</h2>
      <div className="mb-6 rounded-lg bg-main-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600">이름</p>
            <p className="text-xs font-medium">{detail.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">전화번호</p>
            <p className="text-xs font-medium">{detail.phone}</p>
          </div>
        </div>
      </div>

      {/* 미용 일시 */}
      <div className="mb-2 flex items-center space-x-2">
        <RiCalendarScheduleLine size={24} color="black" />
        <h2 className="text-xl font-semibold">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>{new Date(detail.beautyDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>{new Date(detail.beautyDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        </div>
      </div>

      {/* 매장 및 디자이너 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <ImScissors size={24} color="black" />
        <h2 className="text-xl font-semibold">매장 · 디자이너 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div className="flex items-center">
          <img src={detail.profileImage} alt="매장 로고" className="mr-4 h-16 w-16 rounded-lg" />
          <div>
            <p className="font-bold">{detail.shopName}</p>
            <p className="text-gray-600">{detail.address}</p>
            <p className="font-bold">{detail.groomerName}</p>
            <p className="text-gray-600">{detail.phone}</p>
          </div>
        </div>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <BiSolidDog size={24} color="black" />
        <h2 className="text-xl font-semibold">반려견 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div className="flex items-start">
          <div className="mr-4 flex flex-col items-center">
            <img src="/path/to/dog.png" alt="반려견 사진" className="h-24 w-24 rounded-lg" />
            <p className="mt-2 font-medium">{detail.dogName}</p>
          </div>
          <div>
            <p className="text-gray-600">견종: {detail.dogBreed}</p>
            <p className="text-gray-600">무게: {detail.dogWeight}</p>
            <p className="text-gray-600">나이: {detail.dogAge}살</p>
            <p className="text-gray-600">성별: {detail.dogGender === "MALE" ? "남아" : "여아"}</p>
            <p className="text-gray-600">중성화 여부: {detail.neutering ? "Y" : "N"}</p>
            <p className="text-gray-600">특이사항: {detail.significant}</p>
          </div>
        </div>
      </div>

      {/* 요청 내용 */}
      <div className="mb-2 flex items-center space-x-2">
        <GrDocumentUser size={24} color="black" />
        <h2 className="text-xl font-semibold">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p className="text-gray-600">{detail.requestContent}</p>
      </div>

      {/* 첨부 사진 */}
      <div className="mb-2 flex items-center space-x-2">
        <TbPhoto size={24} color="black" />
        <h2 className="text-xl font-semibold">첨부 사진</h2>
      </div>

      <div className="rounded-lgp-4 mb-6">
        <div className="grid grid-cols-3 gap-2">
          {detail.requestImage.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`첨부 사진 ${index + 1}`}
              className="h-24 w-24 rounded-lg border bg-gray-100"
            />
          ))}
        </div>
      </div>

      {/* 견적 설명 */}
      <div className="mb-2 flex items-center space-x-2">
        <GrDocumentText size={24} color="black" />
        <h2 className="text-xl font-semibold">견적 설명</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p className="text-gray-600">{detail.quoteContent}</p>
      </div>

      {/* 결제 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <TbCreditCard size={24} color="black" />
        <h2 className="text-xl font-semibold">결제 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div>
          <p className="text-gray-600">
            결제 상태: <span className="font-medium">paid</span>
          </p>
          <p className="text-gray-600">
            주문 번호: <span className="font-medium">merchantID</span>
          </p>
          <p className="text-gray-600">
            결제 수단: <span className="font-medium">card</span>
          </p>
          <p className="text-gray-600">
            결제 금액: <span className="font-medium">61,000원</span>
          </p>
        </div>
      </div>

      <div>
        <BottomButton styleType="lightPink" onClick={() => setIsModalOpen(true)}>
          예약 취소하기
        </BottomButton>
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        <div>
          <p className="mb-4 text-sm font-medium">취소 사유를 입력해주세요.</p>
          <input
            type="text"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="취소 사유 입력"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomerReservationDetail;
