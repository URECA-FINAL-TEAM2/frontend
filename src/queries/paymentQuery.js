import axiosInstance from "@/api/axiosInstance";

// 결제 요청 함수
export const RequestPayment = async (paymentData) => {
  const { amount, shopName, quoteId, customerId } = paymentData;

  try {
    // Toss Payments JavaScript SDK 로드
    if (!window.TossPayments) {
      const script = document.createElement("script");
      script.src = "https://js.tosspayments.com/v1";
      script.async = true;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }

    const tossPayments = window.TossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);

    // 결제 요청
    const result = await tossPayments.requestPayment("카드", {
      amount, // 결제 금액
      orderId: `${new Date().getTime()}`, // 고유 주문 ID (현재 시간 기반)
      orderName: shopName // 상점 이름
      // successUrl: `http://localhost:5173/payment/complete`, // 성공 URL
      // failUrl: `http://localhost:5173/payment/fail` // 실패 URL
    });

    // 결제 성공 후 서버에 결제 승인 요청 보내기
    const response = await axiosInstance.post(
      `/payments/confirm`,
      {
        paymentKey: result.paymentKey,
        orderId: result.orderId,
        amount,
        quoteId,
        customerId
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    if (!response.data) {
      console.error("결제 승인 요청 실패", response);
      throw new Error("결제 승인 요청 실패");
    }

    console.log("결제 승인 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("결제 처리 중 오류", error);
    throw error;
  }
};

// 결제 내역 조회
export const getPaymentDetail = async (paymentKey) => {
  try {
    const pKey = paymentKey.paymentKey;

    const response = await axiosInstance.get(`/payments/${paymentKey}`, {
      params: {
        selectedQuoteId: pKey
      },
      headers: {
        Accept: "application/json"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reservation data");
  }
};

//더미
// export const examplePaymentDetails = {
//   paymentTitle: "댕댕살롱",
//   paymentKey: "tviva20241126165731QzZY2",
//   message: "결제 내역 조회 성공",
//   status: "결제 완료",
//   method: "간편결제",
//   approvedAt: "2024-11-26T16:59:06+09:00",
//   amount: 10000,
//   selectedQuoteId: 1,
//   orderId: "18_XR8395y-HtJQb7dsds55hwfqjuefew",
//   cancelReason: "단순변심"
// };

// export const exampleFailedPayment = {
//   code: "PAYMENT-001",
//   message: "유효하지 않은 결제 키입니다."
// };

// export const exampleNotFoundPayment = {
//   code: "PAYMENT-002",
//   message: "요청한 결제 내역을 찾을 수 없습니다.",
//   details: "paymentKey: 5EnNZRJGvaBX7zk2"
// };

// export const exampleUnauthorized = {
//   code: "AUTH-001",
//   message: "인증이 필요합니다. 로그인 후 다시 시도하세요."
// };

// export const exampleForbidden = {
//   code: "AUTH-002",
//   message: "해당 결제 내역에 접근할 권한이 없습니다."
// };

// export const fetchPaymentDetails = async (paymentKey = "tviva20241126165731QzZY2") => {
//   try {
//     console.log(`Requested paymentKey: ${paymentKey}`);
//     return examplePaymentDetails;
//   } catch (error) {
//     throw new Error("결제 내역 조회 실패");
//   }
// };
