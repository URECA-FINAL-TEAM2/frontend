import React from "react";
import axios from "axios";
import Button from "../../components/common/button/button";

// 결제 요청 함수
const RequestPayment = () => {
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
      name: "테스트 결제", // 결제명
      amount: 1000, // 결제 금액
      buyer_email: "test@test.com", // 구매자 이메일
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "010-1234-5678", // 구매자 전화번호
      buyer_addr: "서울특별시 강남구 삼성동", // 구매자 주소
      buyer_postcode: "123-456", // 구매자 우편번호
    },
    async (rsp) => {
      if (rsp.success) {
        try {
          const response = await axios.post(
            `/v1/order/payment/${rsp.imp_uid}`
          );
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

const PaymentComponent = () => {
  const handlePaymentClick = () => {
    try {
      RequestPayment();
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <Button styleType="pink" onClick={handlePaymentClick}>
        테스트용
      </Button>
    </div>
  );
};

export default PaymentComponent;
