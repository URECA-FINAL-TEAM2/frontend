// 미용사가 고객의 견적 요청 상세를 확인하고,
// 해당 견적 요청에 대해 견적서를 보낼 수 있는 페이지

import BottomButton from "@/components/common/button/BottomButton";
import SubHeader from "@/components/common/SubHeader";
import GroomerQuoteForm from "@/components/Quote/GroomerQuoteForm";
import React from "react";
import { useParams } from "react-router-dom";

function GroomerQuoteRequestPage(props) {
  const requestId = useParams().requestId;
  return (
    <div>
      <SubHeader title="견적서 보내기" navigate={-1} />
      <GroomerQuoteForm requestId={requestId} />
      <BottomButton>견적서 보내기</BottomButton>
    </div>
  );
}

export default GroomerQuoteRequestPage;
