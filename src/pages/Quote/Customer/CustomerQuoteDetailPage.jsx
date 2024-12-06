import BottomButton from "@/components/common/button/BottomButton";
import SubHeader from "@/components/common/SubHeader";
import CustomerQuote from "@/components/Quote/CustomerQuote";
import React from "react";
import { useParams } from "react-router-dom";

function CustomerQuoteDetailPage(props) {
  const quotesId = useParams().quotesId;

  return (
    <div>
      <SubHeader title="견적서 상세보기" navigate={-1} />
      <CustomerQuote quotesId={quotesId} />
      <BottomButton>결제해서 예약하기</BottomButton>
    </div>
  );
}

export default CustomerQuoteDetailPage;
