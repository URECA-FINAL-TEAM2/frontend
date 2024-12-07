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
    
            const response = await axios.post(
                `/payments/confirm`,
                requestBody,
                {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    }
                }
            );
                console.log("결제 성공:", response.data);
                alert("결제가 성공적으로 완료되었습니다.");
            } 
            catch (error) {
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
