import { Link } from "react-router-dom";
import GrommerTotalRequest from "../../components/Main/GrommerTotalRequest";
import { useEffect, useState } from "react";
import Summary from "../../components/common/Summary";
import { getGroomerMain } from "@/queries/mainQuery";
import useAuthStore from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import toast, { Toaster } from "react-hot-toast";

const GroomerHome = () => {
  const { toastMessage, toastIcon, clearToast } = useToastStore();
  const { id } = useAuthStore();
  const [totalRequest, setTotalRequest] = useState([]);
  const [preview, setPreview] = useState({
    todayReservation: 0, // 오늘의 예약
    totalDirectRequest: 0, // 전체
    todayRequest: 0, // 오늘 요청
    unsentQuote: 0 // 견적 미발송
  });

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage, { icon: toastIcon });
      clearToast();
    }
  }, [toastMessage, toastIcon]);

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
        const response = await getGroomerMain(id.groomerId);
        setTotalRequest(response.totalRequest);
        updatePreview(response);
      } catch (error) {
        console.error("Error: Customer Main", error);
      }
    };

    getMain();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-11/12 pb-24 pt-6">
        {/* 오늘의 예약 */}

        <section className="rounded-xl bg-white px-6 py-3 shadow-md">
          <Link to="/groomer/reservation">
            <div className="flex items-center justify-between">
              <span className="text-lg">오늘의 예약</span>
              <span>{preview.todayReservation}</span>
            </div>
          </Link>
        </section>
        {/* 1:1 견적 요청 */}
        <section className="my-4 rounded-xl bg-white px-6 py-3 shadow-md">
          <Link to="/groomer/quotes">
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
              />
            </div>
          </Link>
        </section>
        {/* 우리동네 견적공고 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">우리동네 견적 공고</h2>
            <Link to="/groomer/docs">
              <div className="text-xs">더보기</div>
            </Link>
          </div>

          {totalRequest.map((request) => {
            return <GrommerTotalRequest key={request.requestId} request={request} />;
          })}
        </section>
      </div>
      <Toaster />
    </main>
  );
};

export default GroomerHome;
