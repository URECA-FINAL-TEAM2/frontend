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
import { getPaymentDetail } from "@/queries/paymentQuery";

const CustomerReservationDetail = ({ selectedQuoteId = 128 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [detail, setDetail] = useState(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservationAndPayment = async () => {
      try {
        // 예약 정보 가져오기
        const detailResponse = await getReservationDetail(selectedQuoteId);
        if (detailResponse.code === 200) {
          setDetail(detailResponse.data);

          const paymentKey = detailResponse.data.paymentKey;
          if (paymentKey) {
            // 결제 정보 가져오기
            const paymentResponse = await getPaymentDetail(paymentKey);
            if (paymentResponse.code === 200) {
              setPaymentDetail(paymentResponse.data);
            } else {
              setError(paymentResponse.message);
            }
          } else {
            setError("유효한 paymentKey를 찾을 수 없습니다.");
          }
        } else {
          setError(detailResponse.message);
        }
      } catch (error) {
        setError("예약 정보를 가져오거나 결제 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchReservationAndPayment();
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
    <div>
      <SubHeader title="예약 정보 및 서비스" />
      <div className="max-w-lg p-6 mx-auto mt-10 bg-white">
        {/* 예약자 정보 */}
        <div className="flex items-center mt-6 mb-2 space-x-2">
          <BsPersonVcard size={24} color="black" />
          <h2 className="text-xl font-semibold">예약자 정보</h2>
        </div>

        <div className="p-4 mb-6 rounded-lg bg-main-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">이름</p>
              <p className="text-gray-600">{detail.customerName}</p>
            </div>
            <div>
              <p className="font-medium">전화번호</p>
              <p className="text-gray-600">{detail.phone}</p>
            </div>
          </div>
        </div>

        {/* 미용 일시 */}
        <div className="flex items-center mb-2 space-x-2">
          <RiCalendarScheduleLine size={24} color="black" />
          <h2 className="text-xl font-semibold">미용 일시</h2>
        </div>

        <div className="mb-6 rounded-lg">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center justify-center flex-1 px-4 py-2 text-sm text-center border rounded-lg border-main-400">
              <p>{new Date(detail.beautyDate).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-center flex-1 px-4 py-2 text-sm text-center border rounded-lg border-main-400">
              <p>{new Date(detail.beautyDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        </div>

        {/* 매장 및 디자이너 정보 */}
        <div className="flex items-center mb-2 space-x-2">
          <ImScissors size={24} color="black" />
          <h2 className="text-xl font-semibold">매장 · 디자이너 정보</h2>
        </div>

        <div className="p-4 mb-6 border rounded-lg border-main-400">
          <div className="flex items-center">
            <img src={detail.shopLogo} alt="매장 로고" className="w-24 h-24 mr-4 rounded-lg" />
            <div>
              <p className="text-lg font-bold">{detail.shopName}</p>
              <p className="text-gray-600">{detail.address}</p>
              <p className="text-lg font-bold">{detail.groomerName} 디자이너</p>
              <p className="text-gray-600">{detail.phone}</p>
            </div>
          </div>
        </div>

        {/* 반려견 정보 */}
        <div className="flex items-center mb-2 space-x-2">
          <BiSolidDog size={24} color="black" />
          <h2 className="text-xl font-semibold">반려견 정보</h2>
        </div>

        <div className="p-4 mb-6 border rounded-lg border-main-400">
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <img src={detail.profileImage} alt="반려견 사진" className="w-24 h-24 rounded-lg" />
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
        <div className="flex items-center mb-2 space-x-2">
          <GrDocumentUser size={24} color="black" />
          <h2 className="text-xl font-semibold">요청 내용</h2>
        </div>

        <div className="p-4 mb-6 border rounded-lg border-main-400">
          <p className="text-gray-600">{detail.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="flex items-center mb-2 space-x-2">
          <TbPhoto size={24} color="black" />
          <h2 className="text-xl font-semibold">첨부 사진</h2>
        </div>

        <div className="mb-6 rounded-lgp-4">
          <div className="grid grid-cols-3 gap-2">
            {detail.requestImage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`첨부 사진 ${index + 1}`}
                className="w-24 h-24 bg-gray-100 border rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* 견적 설명 */}
        <div className="flex items-center mb-2 space-x-2">
          <GrDocumentText size={24} color="black" />
          <h2 className="text-xl font-semibold">견적 설명</h2>
        </div>

        <div className="p-4 mb-6 border rounded-lg border-main-400">
          <p className="text-gray-600">{detail.quoteContent}</p>
        </div>

        {/* 결제 정보 */}
        <div className="flex items-center mb-2 space-x-2">
          <TbCreditCard size={24} color="black" />
          <h2 className="text-xl font-semibold">결제 정보</h2>
        </div>

        {paymentDetail && (
          <div className="p-4 mb-6 border rounded-lg border-main-400">
            <div>
              <p className="flex justify-between text-gray-600">
                결제 상태 : <span className="font-medium text-right">{paymentDetail.status}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                예약 번호 : <span className="font-medium text-right">{paymentDetail.orderId}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                결제 명 : <span className="font-medium text-right">{paymentDetail.paymentTitle}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                결제 금액 : <span className="font-medium text-right">{paymentDetail.amount}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                결제 수단 : <span className="font-medium text-right">{paymentDetail.method}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                결제 승인 일자 : <span className="text-sm font-medium text-right">{paymentDetail.approvedAt}</span>
              </p>
              {paymentDetail.cancelReason && (
                <p className="flex justify-between text-gray-600">
                  취소 사유 : <span className="font-medium text-right">{paymentDetail.cancelReason}</span>
                </p>
              )}
            </div>
          </div>
        )}
        <div className="mt-14">
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
              className="w-full p-2 text-sm border rounded-md"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerReservationDetail;
