import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import PaymentCompleteAnimation from "./PaymentCompleteAnimation.json";
import SubHeader from "@/components/common/SubHeader";
import CustomerBottom from "@/components/common/CustomerBottom";
import { useLocation, useNavigate } from "react-router-dom";
import { getReservationDetail } from "@/queries/reservationQuery";

function PaymentComplete() {
  const location = useLocation();
  const { selectedQuoteId } = location.state || {};
  const [reservationDetail, setReservationDetail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationDetail = async () => {
      try {
        console.log(selectedQuoteId);
        const response = await getReservationDetail(selectedQuoteId);
        if (response.code === 200) {
          setReservationDetail(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReservationDetail();
  }, [selectedQuoteId]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!reservationDetail) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  return (
    <div>
      <div className="fixed top-0 z-30 grid h-[75px] w-[400px] items-center bg-white px-5 text-center">
        <span className="text-xl">결제 완료</span>
      </div>

      <div className="my-6 mt-20 flex flex-col items-center">
        <Lottie animationData={PaymentCompleteAnimation} loop style={{ height: "180px", width: "180px" }} />
        <p className="mt-4 text-center font-bold">
          예약 완료! <br />
          <span className="font-bold text-red-500">{reservationDetail.dogName}</span>이(가) 더욱 아름다워질 거예요!
        </p>
      </div>
      {/* 정보 섹션 */}
      <div className="mx-6 p-4">
        {/* 고객정보 */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">펫 주인</span>
            <span className="text-gray-500">{reservationDetail.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">번호</span>
            <span className="text-gray-500">{reservationDetail.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">마이 펫</span>
            <span className="text-gray-500">{reservationDetail.dogName}</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-400"></div>

        {/* 견적서 내용 */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">예약 날짜</span>
            <span className="text-gray-500">{new Date(reservationDetail.beautyDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">매장 이름</span>
            <span className="text-gray-500">{reservationDetail.shopName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">매장 주소</span>
            <span className="text-sm text-gray-500">{reservationDetail.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">디자이너</span>
            <span className="text-gray-500">{reservationDetail.groomerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">견적 내용</span>
            <span className="text-gray-500">{reservationDetail.quoteContent}</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-400"></div>

        {/* 결제금액 */}
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">결제 번호</span>
          <span className="text-gray-500">{reservationDetail.paymentKey}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="font-bold text-gray-700">결제된 금액</span>
          <span className="font-bold text-red-500">{(reservationDetail.amount * 0.2)?.toLocaleString()}원</span>
        </div>
      </div>

      <div className="mb-[80px] mt-5 flex justify-center">
        <button
          className="w-[80%] rounded-lg bg-main-400 py-2 text-white shadow hover:bg-main-300"
          onClick={() => navigate("/customer/reservation")}
        >
          예약 내역 확인
        </button>
      </div>
      <CustomerBottom />
    </div>
  );
}

export default PaymentComplete;
