import SubHeader from "@/components/common/SubHeader";
import TotalQuoteRequestForm from "@/components/QuoteRequest/Customer/TotalQuoteRequestForm";
import React from "react";

function TotalQuoteRequestPage(props) {
  return (
    <div>
      <SubHeader title="새 견적 요청" navigate={-1} />
      <TotalQuoteRequestForm />
    </div>
  );
}

export default TotalQuoteRequestPage;
