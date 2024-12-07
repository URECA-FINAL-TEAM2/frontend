import axiosInstance from "@/api/axiosInstance";
import axios from "axios";

// 결제 요청 함수
export const RequestPayment = (paymentData) => {
  const { IMP } = window; // 포트원 SDK 로드 확인
  if (!IMP) {
    console.error("포트원 SDK 로드 실패");
    return;
  }
  IMP.init("imp02101050");

  // 결제 요청
  IMP.request_pay(
    {
      pg: "uplus", // PG사명
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      name: paymentData.name, // 결제명(매장명)
      amount: paymentData.amount, // 결제 금액(견적서금액*0.2)
      buyer_email: paymentData.buyer_email, // 구매자 이메일
      buyer_name: paymentData.buyer_name, // 구매자 이름
      buyer_tel: paymentData.buyer_tel, // 구매자 전화번호
      buyer_addr: paymentData.buyer_addr, // 구매자 주소
      buyer_postcode: "000-000" // 구매자 우편번호
    },
    async (rsp) => {
      if (rsp.success) {
        try {
          const requestBody = {
            paymentKey: rsp.imp_uid,
            orderId: rsp.merchant_uid,
            amount: paymentData.amount,
            selectedQuoteId: paymentData.selectedQuoteId // 선택한 견적 ID
          };

          const response = await axios.post(`/payments/confirm`, requestBody, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          });
          console.log("결제 성공:", response.data);
          alert("결제가 성공적으로 완료되었습니다.");
        } catch (error) {
          console.error("결제 성공 후 서버 통신 중 오류 발생:", error);
          alert("결제 후 서버 통신 중 오류가 발생했습니다.");
        }
      } else {
        console.error("결제 실패:", rsp.error_msg);
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    }
  );
};

// // 결제 내역 조회 함수
// export const fetchPaymentDetails = async (paymentKey) => {
//   try {
//     const response = await axiosInstance.get(`/payments/details/${paymentKey}`, {
//       headers: {
//         Accept: "application/json",
//       }
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("결제 내역 조회 오류:", error.response.data.message);
//       throw new Error(error.response.data.message);
//     }
//     console.error("결제 내역 조회 실패:", error.message);
//     throw new Error("결제 내역 조회에 실패했습니다.");
//   }
// };

//더미
export const examplePaymentDetails = {
  paymentTitle: "댕댕살롱",
  paymentKey: "tviva20241126165731QzZY2",
  message: "결제 내역 조회 성공",
  status: "결제 완료",
  method: "간편결제",
  approvedAt: "2024-11-26T16:59:06+09:00",
  amount: 10000,
  selectedQuoteId: 1,
  orderId: "18_XR8395y-HtJQb7dsds55hwfqjuefew",
  cancelReason: "단순변심"
};

export const exampleFailedPayment = {
  code: "PAYMENT-001",
  message: "유효하지 않은 결제 키입니다."
};

export const exampleNotFoundPayment = {
  code: "PAYMENT-002",
  message: "요청한 결제 내역을 찾을 수 없습니다.",
  details: "paymentKey: 5EnNZRJGvaBX7zk2"
};

export const exampleUnauthorized = {
  code: "AUTH-001",
  message: "인증이 필요합니다. 로그인 후 다시 시도하세요."
};

export const exampleForbidden = {
  code: "AUTH-002",
  message: "해당 결제 내역에 접근할 권한이 없습니다."
};

export const fetchPaymentDetails = async (paymentKey = "tviva20241126165731QzZY2") => {
  try {
    console.log(`Requested paymentKey: ${paymentKey}`);
    return examplePaymentDetails;
  } catch (error) {
    throw new Error("결제 내역 조회 실패");
  }
};
