import React, { useEffect, useState } from "react";
import GroomerBottom from "@/components/common/GroomerBottom";
import SubHeader from "@/components/common/SubHeader";
import GroomerTotalRequests from "@/components/QuoteRequest/Groomer/GroomerTotalRequests";
import GroomerShopRequests from "@/components/QuoteRequest/Groomer/GroomerShopRequests";
import GroomerSentRequests from "@/components/QuoteRequest/Groomer/GroomerSentRequests";
import useAuthStore from "@/store/authStore";
import { getGroomerQuoteDirect, getGroomerQuoteSend, getGroomerQuoteTotal } from "@/queries/quoteRequestQuery";

const GroomerQuote = () => {
  const { id } = useAuthStore(); // id.groomerId 사용예정
  const [activeSection, setActiveSection] = useState("section1");
  const [shopRequests, setShopRequests] = useState(null);
  const [totalRequests, setTotalRequests] = useState(null);
  const [sentQuotes, setSentQuotes] = useState(null);

  // Fetch shopRequests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteDirect();
        setShopRequests(requests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, only run once on mount

  // Fetch shopRequests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteTotal();
        setTotalRequests(requests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, only run once on mount

  // Fetch shopRequests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteSend();
        console.log("requests", requests);
        setSentQuotes(requests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, only run once on mount

  // Show loading message until both shopRequests and totalRequests are fetched
  if (!shopRequests) return "1:1 맞춤 견적 데이터를 가져오는중...";
  if (!totalRequests) return "견적 공고 데이터를 가져오는중...";
  if (!sentQuotes) return "보낸 견적서 데이터를 가져오는중...";

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <GroomerShopRequests Infos={shopRequests} />; // GetRequestGroomer : 1:1 견적 요청
      case "section2":
        return <GroomerTotalRequests Infos={totalRequests} />; // GetTotalRequestGroomer : 견적 공고
      case "section3":
        return <GroomerSentRequests Infos={sentQuotes} />; // GetRequestGroomerSend : 보낸 견적서
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
