import SubHeader from "@/components/common/SubHeader";
import CustomerQuoteDetail from "@/components/Quote/CustomerQuoteDetail";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { RequestPayment } from "@/queries/paymentQuery";
import { ArrowDown } from "/public/Icons";
import useAuthStore from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";

function CustomerQuoteDetailPage(props) {
  const quotesId = Number(useParams().quotesId);
  const { id } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab } = location.state || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState(null);
  const [shopName, setShopName] = useState("");

  // Create a ref for the expandable div
  const expandableRef = useRef(null);

  const [agreements, setAgreements] = useState({
    all: false,
    noCancelRefund: false,
    orderConfirmation: false,
    personalInfoConsent: false,
    thirdPartyConsent: false
  });

  // Add an effect to handle clicks outside the expandable div
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the expandable div is open and the click is outside of it
      if (isExpanded && expandableRef.current && !expandableRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleDataLoad = (data) => {
    setAmount(Math.floor(data.amount * 0.2));
    setShopName(data.shopName);
  };

  const payHandle = async () => {
    if (
      !agreements.noCancelRefund ||
      !agreements.orderConfirmation ||
      !agreements.personalInfoConsent ||
      !agreements.thirdPartyConsent
    ) {
      return;
    }
    // console.log("결제 진행:", { amount, shopName });
    const requestData = {
      amount: amount,
      shopName: shopName,
      quoteId: quotesId,
      customerId: id.customerId
    };
    try {
      const result = await RequestPayment(requestData);
      // console.log("결제 요청 성공:", result);
      // console.log(requestData);
      toast.success("결제 완료!");
      setTimeout(() => {
        navigate("/customer/payment/complete", {
          state: { selectedQuoteId: result.data.selectedQuoteId }
        });
      }, 1000);
    } catch (error) {
      // console.error("결제 요청 실패:", error);
      toast("결제에 실패했습니다.", {
        icon: "❌"
      });
    }
  };

  const handleAgreementChange = (key) => {
    const updatedAgreements = {
      ...agreements,
      [key]: !agreements[key]
    };

    // Update "all" checkbox state
    updatedAgreements.all =
      updatedAgreements.noCancelRefund &&
      updatedAgreements.orderConfirmation &&
      updatedAgreements.personalInfoConsent &&
      updatedAgreements.thirdPartyConsent;

    setAgreements(updatedAgreements);
  };

  const handleAllAgreementChange = () => {
    const newState = !agreements.all;
    setAgreements({
      all: newState,
      noCancelRefund: newState,
      orderConfirmation: newState,
      personalInfoConsent: newState,
      thirdPartyConsent: newState
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <SubHeader
        title="견적서 상세보기"
        navigate={() => navigate("/customer/quotes", { state: { activeTab: activeTab } })} // [x]
      />
      <CustomerQuoteDetail quotesId={quotesId} onDataLoad={handleDataLoad} />
      <div
        ref={expandableRef}
        className={`fixed bottom-0 left-0 right-0 mx-auto flex max-w-[400px] transition-all duration-200 ease-in-out ${
          isExpanded ? "h-[300px] bg-main-200" : "h-[55px] bg-main-400 text-[20px] text-white"
        } w-full items-center justify-center rounded-t-[10px] shadow-md`}
      >
        {!isExpanded ? (
          <button
            onClick={toggleExpand}
            className="flex h-full w-full items-center justify-center rounded-t-[10px] hover:bg-main-300"
          >
            결제해서 예약하기
          </button>
        ) : (
          <div className="relative flex w-full flex-col items-center justify-center px-8">
            <div
              onClick={toggleExpand}
              className="absolute left-0 right-0 top-0 flex h-3 cursor-pointer items-center justify-center"
            >
              <img src={ArrowDown} className="h-3" />
            </div>

            <div className="mt-4 flex w-full justify-between text-lg font-bold">
              <p>최종 결제 금액</p>
              <p>{Number(amount).toLocaleString()} 원</p>
            </div>
            <div className="mt-4 w-full text-sm">
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.all}
                  onChange={handleAllAgreementChange}
                  className="mr-2 h-5 w-5"
                  id="agreement-all"
                />
                <label htmlFor="agreement-all">전체 동의</label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.noCancelRefund}
                  onChange={() => handleAgreementChange("noCancelRefund")}
                  className="mr-2 h-5 w-5"
                  id="agreement-noCancelRefund"
                />
                <label htmlFor="agreement-noCancelRefund">미방문시 환불이 불가함을 확인했습니다. (필수)</label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.orderConfirmation}
                  onChange={() => handleAgreementChange("orderConfirmation")}
                  className="mr-2 h-5 w-5"
                  id="agreement-orderConfirmation"
                />
                <label htmlFor="agreement-orderConfirmation">주문 내용을 확인했으며 결제에 동의합니다. (필수)</label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.personalInfoConsent}
                  onChange={() => handleAgreementChange("personalInfoConsent")}
                  className="mr-2 h-5 w-5"
                  id="agreement-personalInfoConsent"
                />
                <label htmlFor="agreement-personalInfoConsent" className="flex">
                  개인정보 수집 이용 동의(필수) <MdExpandMore className="mt-0.5 cursor-pointer text-lg" />
                </label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.thirdPartyConsent}
                  onChange={() => handleAgreementChange("thirdPartyConsent")}
                  className="mr-2 h-5 w-5"
                  id="agreement-thirdPartyConsent"
                />
                <label htmlFor="agreement-thirdPartyConsent" className="flex">
                  개인정보 제 3자 제공 동의(필수) <MdExpandMore className="mt-0.5 cursor-pointer text-lg" />
                </label>
              </div>
            </div>
            <button
              onClick={payHandle}
              disabled={
                !agreements.noCancelRefund ||
                !agreements.orderConfirmation ||
                !agreements.personalInfoConsent ||
                !agreements.thirdPartyConsent
              }
              className={`mt-2 w-full rounded p-2 text-lg font-semibold ${
                agreements.noCancelRefund &&
                agreements.orderConfirmation &&
                agreements.personalInfoConsent &&
                agreements.thirdPartyConsent
                  ? "cursor-pointer bg-white text-main hover:bg-main-100"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              결제 진행
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default CustomerQuoteDetailPage;
