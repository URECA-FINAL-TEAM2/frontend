import CustomerBottom from "@/components/common/CustomerBottom";
import ShopQuoteRequestList from "@/components/QuoteRequest/Customer/ShopQuoteRequestList";
import TotalQuoteRequestList from "@/components/QuoteRequest/Customer/TotalQuoteRequestList";
import { getQuotesAll, getQuotesGroomer } from "@/queries/quoteQuery";
import useAuthStore from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerQuote = () => {
  const { id } = useAuthStore();
  const location = useLocation();
  const { activeTab } = location.state || {};
  const [activeSection, setActiveSection] = useState("section1");
  const [shopRequests, setShopRequests] = useState(null);
  const [totalRequests, setTotalRequests] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 2) {
      setActiveSection("section2");
    } else {
      setActiveSection("section1");
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchShopRequests = async () => {
      try {
        const requests = await getQuotesGroomer(id.customerId);
        setShopRequests(requests.quoteRequests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchShopRequests();
  }, []);

  useEffect(() => {
    const fetchTotalRequests = async () => {
      try {
        const requests = await getQuotesAll(id.customerId);
        console.log("requests", requests);
        setTotalRequests(requests.quoteRequests);
      } catch (error) {
        console.error("Failed to fetch shop requests:", error);
      }
    };

    fetchTotalRequests();
  }, []);

  const renderContent = () => {
    if (!shopRequests || !totalRequests) return null;
    switch (activeSection) {
      case "section1":
        return <ShopQuoteRequestList Infos={shopRequests} />;
      case "section2":
        return <TotalQuoteRequestList Infos={totalRequests} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="fixed top-0 z-30 grid h-[var(--header-height)] w-[400px] items-center bg-white px-5 text-center">
        <span className="text-lg">받은 견적서</span>
      </div>
      <button
        onClick={() => {
          navigate("/customer/quotes/request");
        }}
        className="fixed top-0 z-50 ml-[275px] mt-[24px] rounded-lg bg-main px-2 py-1 text-sm font-semibold text-white hover:bg-main-300"
      >
        견적 공고 등록
      </button>
      {/* Menu Bar */}
      <div className="fixed top-[--header-height] z-50 flex h-10 w-[400px] border-b bg-white">
        <button
          onClick={() => setActiveSection("section1")}
          className={`flex-1 ${activeSection === "section1" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
        >
          1:1 맞춤 견적
        </button>
        <button
          onClick={() => setActiveSection("section2")}
          className={`flex-1 ${activeSection === "section2" ? "border-b-2 border-solid border-black font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
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
