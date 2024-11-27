import { Link } from "react-router-dom";
import line from "/Icons/groomerGrayVerticalLine.svg";
import GrommerTotalRequest from "../../components/Main/GrommerTotalRequest";
import mockJson from "../../utils/groomerHome.json";
import { useEffect, useState } from "react";
import { getRequest } from "../../api/axiosInstance";
import Summary from "../../components/common/Summary";

const GroomerHome = () => {
  const [preview, setPreview] = useState({
    todayReservation: 0, // 오늘의 예약
    totalDirectRequest: 0, // 전체
    todayRequest: 0, // 오늘 요청
    unsentQuote: 0 // 견적 미발송
  });

  const fetchUserData = async () => {
    try {
      const data = await getRequest("/main/groomer");
      console.log("User Data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    setPreview({
      todayReservation: mockJson.todayReservation,
      totalDirectRequest: mockJson.totalDirectRequest,
      todayRequest: mockJson.todayRequest,
      unsentQuote: mockJson.unsentQuote
    });
    fetchUserData();
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

          {mockJson.totalRequest.map((items) => {
            return (
              <GrommerTotalRequest
                key={items.customerId}
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
