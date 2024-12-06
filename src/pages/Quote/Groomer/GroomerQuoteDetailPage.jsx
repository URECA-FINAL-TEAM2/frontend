import SubHeader from "@/components/common/SubHeader";
import GroomerQuoteDetail from "@/components/Quote/GroomerQuoteDetail";
import React from "react";
import { useParams } from "react-router-dom";

function GroomerQuoteDetailPage(props) {
  const requestId = useParams().requestId;

  return (
    <div>
      <SubHeader title="보낸 견적서 상세" navigate={-1} />
      <div className="h-[--header-height]"></div>
      <GroomerQuoteDetail requestId={requestId} />
    </div>
  );
}

export default GroomerQuoteDetailPage;
