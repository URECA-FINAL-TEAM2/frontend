//GroomerQuote.jsx

import React, { useState } from "react";
import GroomerBottom from "@/components/common/GroomerBottom";
import SubHeader from "@/components/common/SubHeader";
import GroomerTotalRequests from "@/components/QuoteRequest/Groomer/GroomerTotalRequests";
import GroomerShopRequests from "@/components/QuoteRequest/Groomer/GroomerShopRequests";
import GroomerSentRequests from "@/components/QuoteRequest/Groomer/GroomerSentRequests";

const GroomerQuote = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const 보낸견적서 = [
    {
      profileImage: "https://picsum.photos/200",
      nickname: "ㅁㅁㅁㅅ",
      closingDate: "2042년 11월 19일 오전 1시 31분까지",
      beautyDate: "2024년 11월 24일 오후 3:00",
      breed: "웰시코기",
      dogGender: "남아",
      dogWeight: "12.3",
      requestContent: "목욕 + 식빵컷"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <GroomerShopRequests Infos={보낸견적서} />;
      case "section2":
        return <GroomerTotalRequests Infos={보낸견적서} />;
      case "section3":
        return <GroomerSentRequests Infos={보낸견적서} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SubHeader title="받은 견적 요청" navigate={-1} />
      {/* Menu Bar */}
      <div className="mt-[--header-height] flex h-[30px] border-b bg-white">
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} transition-colors`}
        >
          1:1 견적 요청
        </button>
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} transition-colors`}
        >
          견적 공고
        </button>
        <button
          onClick={() => setActiveSection("section3")}
          className={`flex-1 ${activeSection === "section3" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} transition-colors`}
        >
          보낸 견적서
        </button>
      </div>

      {/* Content Area */}
      <div>{renderContent()}</div>

      <GroomerBottom />
    </div>
  );
};

export default GroomerQuote;
