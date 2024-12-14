//GroomerQuote.jsx

import React, { useEffect, useState } from "react";
import GroomerBottom from "@/components/common/GroomerBottom";
import SubHeader from "@/components/common/SubHeader";
import GroomerTotalRequests from "@/components/QuoteRequest/Groomer/GroomerTotalRequests";
import GroomerShopRequests from "@/components/QuoteRequest/Groomer/GroomerShopRequests";
import GroomerSentRequests from "@/components/QuoteRequest/Groomer/GroomerSentRequests";
import { getQuotesAll, getQuotesGroomer } from "@/queries/quoteQuery";

const GroomerQuote = () => {
  const [activeSection, setActiveSection] = useState("section1");
  const [shopRequests, setShopRequests] = useState(null);
  const [totalRequests, setTotalRequests] = useState(null);

  // Fetch shopRequests on mount
  useEffect(() => {
    const fetchShopRequests = async () => {
      try {
        const requests = await getQuotesGroomer();
        setShopRequests(requests.quoteRequests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchShopRequests();
  }, []); // Empty dependency array, only run once on mount

  // Fetch totalRequests on mount
  useEffect(() => {
    const fetchShopRequests = async () => {
      try {
        const requests = await getQuotesAll();
        console.log("requests", requests);
        setTotalRequests(requests.quoteRequests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchShopRequests();
  }, []); // Empty dependency array, only run once on mount

  // Show loading message until both shopRequests and totalRequests are fetched
  if (!shopRequests || !totalRequests) return "데이터 가져오는중...";

  const sentQuotes = [
    {
      requestId: 2,
      userName: "이도림",
      userProfileImage:
        "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
      beautyDate: "2024-12-03T15:00:00",
      dogBreed: "비숑",
      dogGender: "FEMALE",
      dogWeight: "5.6",
      requestContent: "1:1 미용하고 싶어요2",
      requestType: "020",
      status: "제안"
    },
    {
      requestId: 5,
      userName: "이도림",
      userProfileImage:
        "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
      beautyDate: "2024-12-03T15:30:20",
      dogBreed: "비숑",
      dogGender: "FEMALE",
      dogWeight: "5.6",
      requestContent: "(공지) 미용하고 싶어요2",
      requestType: "010",
      status: "수락"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <GroomerShopRequests Infos={shopRequests} />;
      case "section2":
        return <GroomerTotalRequests Infos={totalRequests} />;
      case "section3":
        return <GroomerSentRequests Infos={sentQuotes} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SubHeader title="받은 견적 요청" navigate={-1} />
      {/* Menu Bar */}
      <div className="fixed top-[--header-height] flex h-10 w-[400px] border-b bg-white">
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
        >
          1:1 견적 요청
        </button>
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
        >
          견적 공고
        </button>
        <button
          onClick={() => setActiveSection("section3")}
          className={`flex-1 ${activeSection === "section3" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"}} text-[15px] transition-colors`}
        >
          보낸 견적서
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[calc(100vh)] bg-gray-50 pb-[--bottom-bar-height] pt-[calc(var(--header-height)+40px)]">
        {renderContent()}
      </div>

      <GroomerBottom />
    </div>
  );
};

export default GroomerQuote;
