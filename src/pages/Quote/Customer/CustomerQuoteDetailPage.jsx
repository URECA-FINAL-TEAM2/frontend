import SubHeader from "@/components/common/SubHeader";
import CustomerQuoteDetail from "@/components/Quote/CustomerQuoteDetail";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { RequestPayment } from "@/queries/paymentQuery";

function CustomerQuoteDetailPage(props) {
  const quotesId = useParams().quotesId;
  const [isHovered, setIsHovered] = useState(false);
  const [amount, setAmount] = useState(null);
  const [shopName, setShopName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [agreements, setAgreements] = useState({
    all: false,
    noCancelRefund: false,
    orderConfirmation: false,
    personalInfoConsent: false,
    thirdPartyConsent: false
  });

  const handleDataLoad = (data) => {
    setAmount(Math.floor(data.amount * 0.2));
    setShopName(data.shopName);
  };

  const payHandle = () => {
    if (
      !agreements.noCancelRefund ||
      !agreements.orderConfirmation ||
      !agreements.personalInfoConsent ||
      !agreements.thirdPartyConsent
    ) {
      setErrorMessage("모든 사항에 동의해야 결제를 진행할 수 있습니다");
      return;
    }
    setErrorMessage("");
    console.log("결제 진행:", { amount, shopName });

    try {
      const result = RequestPayment({
        amount: amount,
        shopName: shopName,
        quoteId: quotesId,
        customerId: 1 // TODO: localStorage에서 clientId 가져오기
      });
      console.log("결제 성공:", result);
      alert("결제가 성공적으로 완료되었습니다.");
    } catch (error) {
      console.error("결제 실패:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
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

  return (
    <div>
      <SubHeader title="견적서 상세보기" navigate={-1} />
      <CustomerQuoteDetail quotesId={quotesId} onDataLoad={handleDataLoad} />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-0 left-0 right-0 mx-auto flex max-w-[400px] transition-all duration-300 ease-in-out ${
          isHovered ? "h-[300px] bg-main-200" : "h-[55px] bg-main-400 text-[20px] text-white"
        } w-full items-center justify-center rounded-t-[10px] shadow-md`}
      >
        {!isHovered ? (
          <button onClick={payHandle} className="flex h-full w-full items-center justify-center hover:bg-main-300">
            결제해서 예약하기
          </button>
        ) : (
          <div className="flex w-full flex-col items-center justify-center px-8">
            <div className="flex w-full justify-between text-lg font-bold">
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
            {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
            <button
              onClick={payHandle}
              className="mt-2 w-full rounded bg-white p-2 text-lg font-semibold text-main-400 hover:bg-gray-100"
            >
              결제 진행
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerQuoteDetailPage;
