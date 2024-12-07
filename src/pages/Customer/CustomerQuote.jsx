import CustomerBottom from "@/components/common/CustomerBottom";
import SubHeader from "@/components/common/SubHeader";
import ShopQuoteRequestList from "@/components/QuoteRequest/Customer/ShopQuoteRequestList";
import TotalQuoteRequestList from "@/components/QuoteRequest/Customer/TotalQuoteRequestList";
import React, { useState } from "react";

const CustomerQuote = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const 보낸견적요청 = [
    {
      petImage: "https://picsum.photos/200",
      petName: "두부",
      beautyDate: "2024년 11월 24일 오후 3:00",
      shopName: "댕댕살롱",
      groomerName: "가영",
      requestContent: "목욕 + 식빵컷"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <TotalQuoteRequestList />;
      case "section2":
        return <ShopQuoteRequestList Infos={보낸견적요청} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SubHeader title="받은 견적서" navigate={-1} />
      {/* Menu Bar */}
      <div className="mt-[--header-height] flex h-[30px] border-b">
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} transition-colors`}
        >
          내 견적 공고
        </button>
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} transition-colors`}
        >
          1:1 맞춤 견적
        </button>
      </div>

      {/* Content Area */}
      <div>{renderContent()}</div>

      <CustomerBottom />
    </div>
  );
};

export default CustomerQuote;
