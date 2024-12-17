import React, { useEffect, useState } from "react";
import GroomerBottom from "@/components/common/GroomerBottom";
import SubHeader from "@/components/common/SubHeader";
import GroomerTotalRequests from "@/components/QuoteRequest/Groomer/GroomerTotalRequests";
import GroomerShopRequests from "@/components/QuoteRequest/Groomer/GroomerShopRequests";
import GroomerSentRequests from "@/components/QuoteRequest/Groomer/GroomerSentRequests";
import useAuthStore from "@/store/authStore";
import { getGroomerQuoteDirect, getGroomerQuoteSend, getGroomerQuoteTotal } from "@/queries/quoteRequestQuery";
import EmptyPage from "@/components/common/EmptyPage";
import { useNavigate } from "react-router-dom";

const GroomerQuote = () => {
  const { id } = useAuthStore();
  const [activeSection, setActiveSection] = useState("section1");
  const [shopRequests, setShopRequests] = useState(null);
  const [totalRequests, setTotalRequests] = useState(null);
  const [sentQuotes, setSentQuotes] = useState(null);
  const navigate = useNavigate();

  // Fetch shopRequests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteDirect(id.groomerId);
        setShopRequests(requests);
      } catch (error) {
        console.error("Failed to fetch direct requests:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch totalRequests on mount
  // 404 error (매장 없을 경우) 예외처리 필요
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteTotal(id.groomerId);
        if (requests.is404) {
          setTotalRequests("404");
        } else {
          setTotalRequests(requests);
        }
      } catch (error) {
        console.error("Failed to fetch total requests:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch sentRequests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getGroomerQuoteSend(id.groomerId);
        console.log("requests", requests);
        setSentQuotes(requests);
      } catch (error) {
        console.error("Failed to fetch sent requests:", error);
      }
    };

    fetchData();
  }, []);

  const handleRejectRequest = (requestId) => {
    setShopRequests((prevRequests) => prevRequests.filter((request) => request.requestId !== requestId));
  };

  if (totalRequests === "404")
    return (
      <div>
        <div className="fixed top-0 z-30 grid h-[var(--header-height)] w-[400px] items-center bg-white px-5 text-center">
          <span className="text-lg">받은 견적 요청</span>
        </div>
        <div className="h-[--header-height]"></div>
        <EmptyPage
          content={
            <div className="text-center">
              <span className="block text-lg">등록된 매장이 없습니다.</span>
              <button
                onClick={() => navigate("/groomer/createstore", { state: { update: false } })}
                className="mt-2 rounded-lg bg-main px-4 py-[3px] text-white hover:bg-main-300"
              >
                매장 등록하기
              </button>
            </div>
          }
        />
        <GroomerBottom />
      </div>
    );

  const renderContent = () => {
    switch (activeSection) {
      case "section1":
        return <GroomerShopRequests Infos={shopRequests} onRequestReject={handleRejectRequest} />; // GetRequestGroomer : 1:1 견적 요청
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
      <div className="fixed top-0 z-30 grid h-[var(--header-height)] w-[400px] items-center bg-white px-5 text-center">
        <span className="text-lg">받은 견적 요청</span>
      </div>
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
