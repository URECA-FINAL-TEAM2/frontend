import React, { useState, useEffect } from "react";
import { getReservationDetail } from "@/queries/reservationQuery";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { BiSolidDog } from "react-icons/bi";
import { GrDocumentText, GrDocumentUser } from "react-icons/gr";
import { TbPhoto, TbCreditCard } from "react-icons/tb";
import { BsPersonVcard } from "react-icons/bs";
import BottomButton from "@/components/common/button/BottomButton";
import Modal from "@/components/common/modal/modal";
import SubHeader from "@/components/common/SubHeader";
import { RequestCancel } from "@/queries/paymentQuery";
import { useLocation, useNavigate } from "react-router-dom";

const GroomerReservationDetail = () => {
  const location = useLocation();
  const { selectedQuoteId, status } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // 예약 취소 요청
  const handleConfirmModal = async () => {
    if (cancelReason.trim() === "") {
      alert("취소 사유를 입력해주세요."); // 안쓰면 팝업
      return;
    }
    if (!detail || !detail.paymentKey) {
      alert("유효한 결제 키가 없습니다. 예약을 취소할 수 없습니다.");
      return;
    }

    try {
      const cancelData = {
        paymentKey: detail.paymentKey,
        cancelReason: `[미용사] ${cancelReason}`
      };
      const result = await RequestCancel(cancelData);
      console.log("취소 성공:", result);
      alert("예약이 성공적으로 취소되었습니다.");
      setIsModalOpen(false);
      setCancelReason("");
      navigate("/groomer/reservation");
    } catch (error) {
      console.error("취소 실패:", error);
      alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!detail) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  const borderColor = status === "예약 취소" ? "" : "border-main-400";
  const bgColor = status === "예약 취소" ? "bg-gray-200" : "";

  return (
    <div>
      <SubHeader title="예약 정보 및 서비스" />
      <div className="mx-auto mt-10 max-w-lg bg-white p-6">
        {/* 예약자 정보 */}
        <div className="mb-2 mt-6 flex items-center space-x-2">
          <BsPersonVcard size={24} color="black" />
          <h2 className="text-xl font-semibold">예약자 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg p-4 ${status === "예약 취소" ? "bg-gray-200" : "bg-main-100"}`}>
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
            <div
              className={`${borderColor} ${bgColor} bgflex flex-1 items-center justify-center rounded-lg border px-4 py-2 text-center text-sm`}
            >
              <p>{new Date(detail.beautyDate).toLocaleDateString()}</p>
            </div>
            <div
              className={`${borderColor} ${bgColor} flex flex-1 items-center justify-center rounded-lg border px-4 py-2 text-center text-sm`}
            >
              <p>{new Date(detail.beautyDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        </div>

        {/* 매장 및 디자이너 정보 */}
        <div className="mb-2 flex items-center space-x-2">
          <ImScissors size={24} color="black" />
          <h2 className="text-xl font-semibold">매장 · 디자이너 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <div className="flex items-center">
            <img src={detail.shopLogo} alt="매장 로고" className="mr-4 h-24 w-24 rounded-lg" />
            <div>
              <p className="text-lg font-bold">{detail.shopName}</p>
              <p className="text-gray-600">{detail.address}</p>
              <p className="text-lg font-bold">{detail.groomerName} 디자이너</p>
              <p className="text-gray-600">{detail.phone}</p>
            </div>
          </div>
        </div>

        {/* 반려견 정보 */}
        <div className="mb-2 flex items-center space-x-2">
          <BiSolidDog size={24} color="black" />
          <h2 className="text-xl font-semibold">반려견 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <div className="flex items-start">
            <div className="mr-4 flex flex-col items-center">
              <img src={detail.profileImage} alt="반려견 사진" className="h-24 w-24 rounded-lg" />
              <p className="mt-4 font-bold">{detail.dogName}</p>
            </div>
            <div>
              <p className="text-gray-600">견종 : {detail.dogBreed}</p>
              <p className="text-gray-600">무게 : {detail.dogWeight}</p>
              <p className="text-gray-600">나이 : {detail.dogAge}살</p>
              <p className="text-gray-600">성별 : {detail.dogGender === "MALE" ? "남아" : "여아"}</p>
              <p className="text-gray-600">중성화 여부 : {detail.neutering ? "Y" : "N"}</p>
              <p className="text-gray-600">특이사항 : {detail.significant}</p>
            </div>
          </div>
        </div>

        {/* 요청 내용 */}
        <div className="mb-2 flex items-center space-x-2">
          <GrDocumentUser size={24} color="black" />
          <h2 className="text-xl font-semibold">요청 내용</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
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

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <p className="text-gray-600">{detail.quoteContent}</p>
        </div>

        {/* 결제 정보 */}
        <div className="mb-2 flex items-center space-x-2">
          <TbCreditCard size={24} color="black" />
          <h2 className="text-xl font-semibold">결제 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <div>
            {status === "예약 취소" ? (
              <p className="font-bold text-gray-600">
                예약금
                <span className="text-main-400"> {detail.amount * 0.2}원</span> 환불 완료되었습니다.
              </p>
            ) : (
              <p className="font-bold text-gray-600">
                예약금
                <span className="text-main-400"> {detail.amount * 0.2}원</span> 결제 완료되었습니다.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14">
          {status !== "미용 완료" && status !== "예약 취소" && (
            <BottomButton styleType="lightPink" onClick={() => setIsModalOpen(true)}>
              예약 취소하기
            </BottomButton>
          )}
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
    </div>
  );
};

export default GroomerReservationDetail;
