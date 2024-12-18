import SubHeader from "@/components/common/SubHeader";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuoteRequestDetail from "../../../components/QuoteRequest/Customer/QuoteRequestDetail";

function QuoteRequestDetailPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab } = location.state || {};
  const requestId = useParams().requestId;
  return (
    <div>
      <SubHeader
        title="견적 요청 상세보기"
        navigate={() => navigate("/customer/quotes", { state: { activeTab: activeTab } })}
      />
      <QuoteRequestDetail requestId={requestId} />
    </div>
  );
}

export default QuoteRequestDetailPage;
