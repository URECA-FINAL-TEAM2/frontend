import SubHeader from "@/components/common/SubHeader";
import React from "react";
import { useParams } from "react-router-dom";
import QuoteRequestDetail from "../../../components/QuoteRequest/Customer/QuoteRequestDetail";

function QuoteRequestDetailPage(props) {
  const requestId = useParams().requestId;
  return (
    <div>
      <SubHeader title="견적 요청 상세보기" navigate={-1} />
      <QuoteRequestDetail requestId={requestId} />
    </div>
  );
}

export default QuoteRequestDetailPage;
