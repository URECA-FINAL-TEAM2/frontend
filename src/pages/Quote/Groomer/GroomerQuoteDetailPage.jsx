import SubHeader from "@/components/common/SubHeader";
import GroomerQuote from "@/components/Quote/GroomerQuote";
import React from "react";

function GroomerQuoteDetailPage(props) {
  return (
    <div>
      <SubHeader title="보낸 견적서 상세" navigate={-1} />
      <GroomerQuote quotesId={quotesId} />
    </div>
  );
}

export default GroomerQuoteDetailPage;
