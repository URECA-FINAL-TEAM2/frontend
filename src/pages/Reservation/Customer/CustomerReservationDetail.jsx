import React, { useState, useEffect } from "react";
import { getReservationDetail } from "@/queries/reservationQuery";
import { TbCreditCard } from "react-icons/tb";
import BottomButton from "@/components/common/button/BottomButton";
import Modal from "@/components/common/modal/modal";
import SubHeader from "@/components/common/SubHeader";
import { getPaymentDetail } from "@/queries/paymentQuery";
import { RequestCancel } from "@/queries/paymentQuery";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Designer, Schedule, Corgi, Note, Photos, Description } from "/public/Icons";
import StaticMap from "@/components/Map/StaticMap";
import toast, { Toaster } from "react-hot-toast";

const CustomerReservationDetail = () => {
  const location = useLocation();
  const { selectedQuoteId, status } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [detail, setDetail] = useState(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationAndPayment = async () => {
      try {
        const detailResponse = await getReservationDetail(selectedQuoteId);
        if (detailResponse.code === 200) {
          setDetail(detailResponse.data);

          const paymentKey = detailResponse.data.paymentKey;
          if (paymentKey) {
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

  const handleConfirmModal = async () => {
    if (cancelReason.trim() === "") {
      toast.error("취소 사유를 입력해주세요.");
      return;
    }
    if (!detail || !detail.paymentKey) {
      toast.error("유효한 결제 키가 없습니다. 예약을 취소할 수 없습니다.");
      return;
    }

    try {
      const cancelData = {
        paymentKey: detail.paymentKey,
        cancelReason: `[고객] ${cancelReason}`
      };
      const result = await RequestCancel(cancelData);
      console.log("취소 성공:", result);
      toast.success("예약이 취소되었습니다.");
      setIsModalOpen(false);
      setCancelReason("");
      setTimeout(() => {
        navigate("/customer/payment/cancel", {
          state: { paymentKey: cancelData.paymentKey }
        });
      }, 1000);
    } catch (error) {
      console.error("취소 실패:", error);
      toast("예약 취소에 실패했습니다. 다시 시도해주세요.", {
        icon: "❌"
      });
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
      <div className="mx-auto mt-14 max-w-lg bg-white p-6">
        {/* 예약자 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={User} alt="Description" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">예약자 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg p-4 ${status === "예약 취소" ? "bg-gray-200" : "bg-main-100"}`}>
          <div className="w-full flex-col items-center">
            <div className="flex justify-between leading-snug">
              <p className="">이름</p>
              <p className="">{detail.customerName}</p>
            </div>
            <div className="flex justify-between leading-snug">
              <p className="">전화번호</p>
              <p className="">{detail.phone}</p>
            </div>
          </div>
        </div>

        {/* 미용 일시 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Schedule} alt="Schedule Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">미용 일시</h2>
        </div>

        <div className={`mb-6 rounded-lg border p-4 ${borderColor} ${bgColor}`}>
          <p>
            {new Date(detail.beautyDate).toLocaleDateString()}
            {new Date(detail.beautyDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        {/* 매장 및 디자이너 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Designer} alt="Description" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">매장 · 디자이너 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <div className="flex items-center">
            <img src={detail.shopLogo} alt="매장 로고" className="mr-3 h-20 w-20 rounded-lg" />
            <div>
              <p className="font-semibold leading-[18px]">{detail.shopName}</p>
              <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">{detail.address}</p>
              <p className="font-semibold leading-[18px]">{detail.groomerName} 디자이너</p>
              <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">{detail.phone}</p>
            </div>
          </div>
          <div className="mt-2 h-[170px] w-full">
            {detail.latitude && detail.longitude ? (
              <StaticMap location={{ lat: detail.latitude, lng: detail.longitude }} shopName={detail.shopName} />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">지도를 표시할 수 없습니다</p>
              </div>
            )}
          </div>
        </div>

        {/* 반려견 정보 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Corgi} alt="Dog Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">반려견 정보</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4`}>
          <div className="flex items-center">
            <div className="mr-4 self-center">
              <img
                src={detail.profileImage}
                alt="반려견 사진"
                className="h-28 w-28 max-w-28 rounded-lg object-cover pt-0.5"
              />
              <p className="mt-1 text-center font-semibold">{detail.dogName}</p>
            </div>
            <div className="self-center text-sm leading-snug">
              <p>
                <span className="mr-2 font-semibold">견종</span>
                <span>{detail.dogBreed}</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">무게</span>
                <span>{detail.dogWeight}</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">나이</span>
                <span>{detail.dogAge}살</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">성별</span>
                <span>{detail.dogGender === "MALE" ? "남아" : "여아"}</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">중성화 여부</span>
                <span>{detail.neutering ? "Y" : "N"}</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">특이사항</span>
                <span>{detail.significant}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 요청 내용 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Note} alt="Note Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">요청 내용</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} leading-tight ${borderColor} p-4`}>
          <p>{detail.requestContent}</p>
        </div>

        {/* 첨부 사진 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Photos} alt="Photos Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
        </div>

        <div className="mb-6 rounded-lg">
          {detail.requestImage.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {detail.requestImage.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`첨부 사진 ${index + 1}`} className="h-28 w-28 rounded-lg object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-28 w-full items-center justify-center">
              <p className="text-center text-gray-500">첨부된 사진이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 견적 설명 */}
        <div className="mb-1.5 flex items-center space-x-1">
          <img src={Description} alt="Description Icon" className="h-5 w-5" />
          <h2 className="text-lg font-semibold leading-none">견적 설명</h2>
        </div>

        <div className={`mb-6 rounded-lg border ${bgColor} ${borderColor} p-4 leading-tight`}>
          <p>{detail.quoteContent}</p>
        </div>

        {/* 결제 정보 */}
        <div className="mb-2 flex items-center space-x-1">
          <TbCreditCard size={20} color="black" />
          <h2 className="text-lg font-semibold leading-none">결제 정보</h2>
        </div>

        {paymentDetail && (
          <div className={`rounded-lg border ${bgColor} ${borderColor} p-4`}>
            <div>
              <p className="flex justify-between">
                <span className="font-semibold">결제 상태</span>
                <span className="text-right font-medium">{paymentDetail.status}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">예약 번호</span>
                <span className="text-right font-medium">{paymentDetail.orderId}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">결제명</span>
                <span className="text-right font-medium">{paymentDetail.paymentTitle}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">결제 금액</span>
                <span className="text-right font-medium">{paymentDetail.amount}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">결제 수단</span>
                <span className="text-right font-medium">{paymentDetail.method}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">결제 승인 일자</span>
                <span className="text-right text-sm font-medium">{paymentDetail.approvedAt}</span>
              </p>
              {paymentDetail.cancelReason && (
                <p className="flex justify-between">
                  <span className="font-semibold">취소 사유</span>
                  <span className="text-right font-medium">{paymentDetail.cancelReason}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {status !== "미용 완료" && status !== "예약 취소" && (
          <div className="mt-14">
            <BottomButton styleType="lightPink" onClick={() => setIsModalOpen(true)}>
              예약 취소하기
            </BottomButton>
          </div>
        )}

        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          closeText="닫기"
          confirmText="확인"
        >
          <div className="w-full">
            <p className="text mb-4 font-medium">취소 사유를 입력해주세요.</p>
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
      <Toaster />
    </div>
  );
};

export default CustomerReservationDetail;
