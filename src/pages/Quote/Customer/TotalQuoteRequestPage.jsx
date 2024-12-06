import BottomButton from "@/components/common/button/BottomButton";
import SubHeader from "@/components/common/SubHeader";
import TotalQuoteRequest from "@/components/QuoteRequest/TotalQuoteRequest";
import React from "react";

function TotalQuoteRequestPage(props) {
  return (
    <div>
      <SubHeader title="새 견적 요청" navigate={-1} />
      <TotalQuoteRequest />
      <BottomButton>견적 요청 보내기</BottomButton>
    </div>
  );
}

export default TotalQuoteRequestPage;
