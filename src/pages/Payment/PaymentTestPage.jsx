import React, { useState } from "react";
import { RequestPayment } from "@/queries/paymentQuery";

const PaymentTestPage = () => {
  const [paymentData, setPaymentData] = useState({
    // 들어가는 내용이 실제 더미데이터랑 맞춰야 결제가 됨
    amount: 1000,
    shopName: "언니네 강아지",
    quoteId: 75,
    customerId: 7
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePaymentRequest = async () => {
    try {
      const result = await RequestPayment(paymentData);
      console.log("결제 성공:", result);
      alert("결제가 성공적으로 완료되었습니다.");
    } catch (error) {
      console.error("결제 실패:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>결제 요청 테스트 페이지</h1>

      <label>
        결제 금액:
        <input type="number" name="amount" value={paymentData.amount} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        상점 이름:
        <input type="text" name="shopName" value={paymentData.shopName} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        견적 ID:
        <input type="number" name="quoteId" value={paymentData.quoteId} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        고객 ID:
        <input type="number" name="customerId" value={paymentData.customerId} onChange={handleInputChange} />
      </label>
      <br />

      <button onClick={handlePaymentRequest}>결제 요청</button>
    </div>
  );
};

export default PaymentTestPage;
