import { Link } from "react-router-dom";
import line from "/Icons/groomerGrayVerticalLine.svg";
import GrommerTotalRequest from "../../components/Main/GrommerTotalRequest";
import mockJson from "../../utils/groomerHome.json";
import { useEffect, useState } from "react";
// import { getRequest } from "../../api/axiosInstance";
import Summary from "../../components/common/Summary";
import { getGroomerMain } from "@/queries/mainQuery";

const GroomerHome = () => {
  const [totalRequest, setTotalRequest] = useState([]);
  const [preview, setPreview] = useState({
    todayReservation: 0, // 오늘의 예약
    totalDirectRequest: 0, // 전체
    todayRequest: 0, // 오늘 요청
    unsentQuote: 0 // 견적 미발송
  });

  const updatePreview = (data) => {
    setPreview((prev) => ({
      ...prev,
      todayReservation: data.todayReservation || 0,
      totalDirectRequest: data.totalDirectRequest || 0,
      todayRequest: data.todayRequest || 0,
      unsentQuote: data.unsentQuote || 0
    }));
  };

  useEffect(() => {
    const getMain = async () => {
      try {
        const response = await getGroomerMain();
        setTotalRequest(response[0].data.totalRequest);
        updatePreview(response[0].data);
      } catch (error) {
        console.error("Error: Customer Main", error);
      }
    };

    getMain();
  }, []);

  return (
    <main className="min-h-screen bg-main-100">
      <div className="mx-auto w-11/12 bg-main-100 pb-24 pt-6">
        {/* 오늘의 예약 */}
        <section className="rounded-xl bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-lg">오늘의 예약</span>
            <span>{preview.todayReservation}</span>
          </div>
        </section>

        {/* 1:1 견적 요청 */}
        <section className="my-4 rounded-xl bg-white px-6 py-3">
          <div className="flex flex-col">
            <span className="text-lg">1:1 견적 요청</span>
            <span className="text-sm text-main">받은 요청을 확인하고, 견적을 보내보세요!</span>

            <Summary
              firstName={"전체"}
              firstValue={preview.totalDirectRequest}
              secondName={"오늘 요청"}
              secondValue={preview.todayRequest}
              thirdName={"견적 미발송"}
              thirdValue={preview.unsentQuote}
              navigate={"/groomer/docs"}
            />
          </div>
        </section>

        {/* 우리동네 견적공고 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">📋 우리동네 견적 공고</h2>
            <Link to="/groomer/docs">
              <div className="text-xs">더보기</div>
            </Link>
          </div>

          {totalRequest.map((items) => {
            return (
              <GrommerTotalRequest
                key={items.requestId}
                profileImage={items.profileImage}
                nickname={items.nickname}
                closingDate={items.closingDate}
                beautyDate={items.beautyDate}
                breed={items.breed}
                dogWeight={items.dogWeight}
                dogGender={items.dogGender}
                requestContent={items.requestContent}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default GroomerHome;
