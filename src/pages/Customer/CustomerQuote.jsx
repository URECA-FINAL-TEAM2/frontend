//CustomerQuote.jsx
import CustomerBottom from "@/components/common/CustomerBottom";
import SubHeader from "@/components/common/SubHeader";
import ShopQuoteRequestList from "@/components/QuoteRequest/Customer/ShopQuoteRequestList";
import TotalQuoteRequestList from "@/components/QuoteRequest/Customer/TotalQuoteRequestList";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerQuote = () => {
  const [activeSection, setActiveSection] = useState("section1");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <TotalQuoteRequestList />;
      case "section2":
        return <ShopQuoteRequestList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SubHeader title="받은 견적서" navigate={-1} />
      <button
        onClick={() => {
          navigate("/customer/quotes/request");
        }}
        className="fixed top-0 z-50 ml-[275px] mt-[24px] rounded-full border-2 border-main bg-main-100 px-2 py-1 text-sm font-semibold text-main hover:bg-main hover:text-white"
      >
        + 새 견적 요청
      </button>
      {/* Menu Bar */}
      <div className="fixed top-[--header-height] z-50 flex h-10 w-[400px] border-b bg-white">
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
        >
          1:1 맞춤 견적
        </button>
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
        >
          내 견적 공고
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[calc(100vh)] bg-gray-50 pb-[--bottom-bar-height] pt-[calc(var(--header-height)+40px)]">
        {renderContent()}
      </div>

      <CustomerBottom />
    </div>
  );
};

export default CustomerQuote;
