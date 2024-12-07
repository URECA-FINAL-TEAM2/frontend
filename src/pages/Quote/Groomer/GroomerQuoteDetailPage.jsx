import SubHeader from "@/components/common/SubHeader";
import GroomerQuoteDetail from "@/components/Quote/GroomerQuoteDetail";
import React from "react";

function GroomerQuoteDetailPage(props) {
  return (
    <div>
      <SubHeader title="보낸 견적서 상세" navigate={-1} />
      <GroomerQuoteDetail quotesId={quotesId} />
    </div>
  );
}

export default GroomerQuoteDetailPage;
