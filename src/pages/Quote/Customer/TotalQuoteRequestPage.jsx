import BottomButton from "@/components/common/button/BottomButton";
import SubHeader from "@/components/common/SubHeader";
import TotalQuoteRequestForm from "@/components/QuoteRequest/TotalQuoteRequestForm";
import React from "react";

function TotalQuoteRequestPage(props) {
  return (
    <div>
      <SubHeader title="새 견적 요청" navigate={-1} />
      <TotalQuoteRequestForm />
      <BottomButton>견적 요청 보내기</BottomButton>
    </div>
  );
}

export default TotalQuoteRequestPage;
