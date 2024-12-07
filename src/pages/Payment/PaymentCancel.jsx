import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./PaymentCancelAnimation.json";
import SubHeader from "@/components/common/SubHeader";
import { useNavigate } from "react-router-dom";
import CustomerBottom from "@/components/common/CustomerBottom";
import { fetchPaymentDetails } from "@/queries/paymentQuery";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const details = await fetchPaymentDetails(); // 기본값 사용
        setPaymentDetails(details);
      } catch (err) {
        setError(err.message);
      }
    };

    getPaymentDetails();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!paymentDetails) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="flex flex-col items-center my-6">
      <SubHeader title="결제 취소" />
      <div className="p-6 mt-8 bg-white w-96">
        {/* Lottie */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-full h-full"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800">결제가 취소되었어요</h2>
          <p className="mt-2 text-sm text-gray-500">예약번호 {paymentDetails.orderId || "알 수 없음"}</p>
        </div>

        {/* 세부 정보 */}
        <div className="py-4 border-t border-gray-200 mt-7">
          <div className="flex justify-between mt-4 mb-2 text-sm text-gray-700">
            <span>결제 상태</span>
            <span className="font-medium">{paymentDetails.status || "알 수 없음"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>주문 날짜</span>
            <span className="font-medium">{new Date(paymentDetails.approvedAt).toLocaleString() || "알 수 없음"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>예약 번호</span>
            <span className="font-medium">{paymentDetails.orderId || "알 수 없음"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>예약 샵</span>
            <span className="font-medium">{paymentDetails.paymentTitle || "알 수 없음"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>결제 수단</span>
            <span className="font-medium">{paymentDetails.method || "알 수 없음"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>취소된 금액</span>
            <span className="font-medium">{paymentDetails.amount || "알 수 없음"}원</span>
          </div>
          {paymentDetails.cancelReason && ( // 취소사유 부분이 null 이면 출력X
            <div className="flex justify-between text-sm text-gray-700">
              <span>취소 사유</span>
              <span className="font-medium">{paymentDetails.cancelReason}</span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <button
            className="w-full py-2 text-white rounded-lg shadow bg-main-400 hover:bg-main-300"
            onClick={() => navigate("/customer/reservation")}
          >
            확인
          </button>
        </div>
      </div>
      <CustomerBottom />
    </div>
  );
};

export default PaymentCancel;
