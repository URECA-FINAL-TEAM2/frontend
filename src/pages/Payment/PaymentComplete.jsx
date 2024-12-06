import { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import PaymentCompleteAnimation from "./PaymentCompleteAnimation.json";
import Button from "../../components/common/button/Button";

function PaymentComplete() {
  // 서버에서 데이터를 받아오기 위한 state
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // 예제용 GET 요청
    axios
      .get("/api/payment-details")
      .then((response) => {
        setPaymentData(response.data); // 서버에서 받은 데이터를 state에 저장
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      헤더
      <div className="my-6 flex flex-col items-center">
        <Lottie animationData={PaymentCompleteAnimation} loop={true} style={{ height: "180px", width: "180px" }} />
        <p className="mt-4 text-center text-sm">
          예약 완료! <br />
          <span className="font-bold text-red-500">사랑스러운 반려견</span>이 더욱 아름다워질 거예요!
        </p>
      </div>
      {/* 정보 섹션 */}
      <div className="p-4">
        {/* 고객정보 */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">펫 주인</span>
            <span className="text-gray-500">{paymentData?.ownerName || "주인 이름"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">번호</span>
            <span className="text-gray-500">{paymentData?.phone || "번호"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">마이 펫</span>
            <span className="text-gray-500">{paymentData?.petName || "댕댕이"}</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-400"></div>

        {/* 견적서 내용 */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">예약 날짜</span>
            <span className="text-gray-500">{paymentData?.reservationDate || "언젠가"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">매장 이름</span>
            <span className="text-gray-500">{paymentData?.storeName || "마릴린펫"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">매장 주소</span>
            <span className="text-gray-500">{paymentData?.storeAddress || "서울시 엘지구"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">디자이너</span>
            <span className="text-gray-500">{paymentData?.designer || "문정"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">견적 내용</span>
            <span className="text-gray-500">{paymentData?.estimateDetails || "빡빡이컷"}</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-400"></div>

        {/* 결제금액 */}
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">결제된 금액</span>
          <span className="text-red-500">{paymentData?.price || "12,345원"}</span>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="mt-8 flex justify-center">
        <Button styleType="lightPink">예약 내역 확인</Button>
      </div>
      <div>푸터</div>
    </div>
  );
}

export default PaymentComplete;
