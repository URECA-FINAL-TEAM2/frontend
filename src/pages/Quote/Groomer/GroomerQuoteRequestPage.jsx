// 미용사가 고객의 견적 요청 상세를 확인하고,
// 해당 견적 요청에 대해 견적서를 보낼 수 있는 페이지

import SubHeader from "@/components/common/SubHeader";
import GroomerQuoteForm from "@/components/Quote/GroomerQuoteForm";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function GroomerQuoteRequestPage(props) {
  const requestId = useParams().requestId;
  const location = useLocation();
  const { activeTab } = location.state || {};
  const navigate = useNavigate();

  return (
    <div>
      <SubHeader
        title="견적서 보내기"
        navigate={() => navigate("/groomer/quotes", { state: { activeTab: activeTab } })} // [x]
      />
      <GroomerQuoteForm requestId={requestId} />
    </div>
  );
}

export default GroomerQuoteRequestPage;
