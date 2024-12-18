import SubHeader from "@/components/common/SubHeader";
import GroomerQuoteDetail from "@/components/Quote/GroomerQuoteDetail";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function GroomerQuoteDetailPage(props) {
  const requestId = useParams().requestId;
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab } = location.state || {};

  return (
    <div>
      <SubHeader
        title="견적서 상세보기"
        navigate={() => navigate("/groomer/quotes", { state: { activeTab: activeTab } })}
      />{" "}
      <GroomerQuoteDetail requestId={requestId} />
    </div>
  );
}

export default GroomerQuoteDetailPage;
