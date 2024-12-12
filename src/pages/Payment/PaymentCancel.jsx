import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./PaymentCancelAnimation.json";
import SubHeader from "@/components/common/SubHeader";
import { useNavigate } from "react-router-dom";
import CustomerBottom from "@/components/common/CustomerBottom";
import { getPaymentDetail } from "@/queries/paymentQuery";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { paymentKey } = location.state || {};

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        setIsLoading(true);
        if (paymentKey) {
          console.log("paymentKey:" + paymentKey);
          const paymentResponse = await getPaymentDetail(paymentKey);
          if (paymentResponse.code === 200) {
            setPaymentDetail(paymentResponse.data);
            console.log("paymentDetail: " + JSON.stringify(paymentDetail));
          } else {
            setError(paymentResponse.message);
          }
        } else {
          setError("유효한 paymentKey를 찾을 수 없습니다.");
        }
      } catch (error) {
        setError("결제 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetail();
  }, [paymentKey]);

  // Loading State Component
  const LoadingSpinner = () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  );

  // Error State Component
  const ErrorMessage = () => <div className="mt-2 text-center text-red-500">{error || "오류가 발생했습니다."}</div>;

  // Render payment details only when loaded
  const PaymentDetails = () => (
    <>
      <div className="mt-2 w-96 bg-white p-6">
        {/* Lottie */}
        <div className="mb-4 flex flex-col items-center">
          <div className="">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="h-full w-full"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <h2 className="text-lg font-bold text-gray-800">결제가 취소되었어요</h2>
          <p className="mt-1 text-sm text-gray-500">예약번호 {paymentDetail?.orderId || "알 수 없음"}</p>
        </div>

        {/* 세부 정보 */}
        <div className="mt-4 border-t border-gray-200 py-4">
          <div className="mb-2 mt-4 flex justify-between text-sm text-gray-700">
            <span>결제 상태</span>
            <span className="font-medium">{paymentDetail?.status || "알 수 없음"}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-gray-700">
            <span>주문 날짜</span>
            <span className="font-medium">
              {paymentDetail?.approvedAt ? new Date(paymentDetail.approvedAt).toLocaleString() : "알 수 없음"}
            </span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-gray-700">
            <span>예약 번호</span>
            <span className="font-medium">{paymentDetail?.orderId || "알 수 없음"}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-gray-700">
            <span>예약 샵</span>
            <span className="font-medium">{paymentDetail?.paymentTitle || "알 수 없음"}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-gray-700">
            <span>결제 수단</span>
            <span className="font-medium">{paymentDetail?.method || "알 수 없음"}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-gray-700">
            <span>취소된 금액</span>
            <span className="font-medium">{paymentDetail?.amount || "알 수 없음"}원</span>
          </div>
          {paymentDetail?.cancelReason && (
            <div className="flex justify-between text-sm text-gray-700">
              <span>취소 사유</span>
              <span className="font-medium">{paymentDetail.cancelReason}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            className="w-full rounded-lg bg-main-400 py-2 text-white shadow hover:bg-main-300"
            onClick={() => navigate("/customer/reservation")}
          >
            확인
          </button>
        </div>
      </div>
      <CustomerBottom />
    </>
  );

  return (
    <div className="mt-[--header-height] flex flex-col items-center">
      <SubHeader title="결제 취소" />
      {isLoading ? <LoadingSpinner /> : error ? <ErrorMessage /> : <PaymentDetails />}
      <div className="h-[55px]" />
    </div>
  );
};

export default PaymentCancel;
