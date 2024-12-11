import BottomButton from "@/components/common/button/BottomButton";
import SubHeader from "@/components/common/SubHeader";
import ShopQuoteRequestForm from "@/components/QuoteRequest/Customer/ShopQuoteRequestForm";
import React from "react";
import { useParams } from "react-router-dom";

function ShopQuoteRequestPage(props) {
  const groomerId = useParams.groomerId;
  return (
    <div>
      <SubHeader title="견적서 요청하기" navigate={-1} />
      <ShopQuoteRequestForm groomerId={groomerId} />
      <BottomButton>견적서 요청하기</BottomButton>
    </div>
  );
}

export default ShopQuoteRequestPage;
