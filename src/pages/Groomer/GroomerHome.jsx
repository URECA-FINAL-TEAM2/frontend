import { Link, useNavigate } from "react-router-dom";
import GrommerTotalRequest from "../../components/Main/GrommerTotalRequest";
import { useEffect, useState } from "react";
import Summary from "../../components/common/Summary";
import { getGroomerMain } from "@/queries/mainQuery";
import useAuthStore from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import toast, { Toaster } from "react-hot-toast";
import logo from "/Logo/logoBtn.png";
import EmptyPage from "@/components/common/EmptyPage";

const GroomerHome = () => {
  const navigate = useNavigate();
  const { toastMessage, toastIcon, clearToast } = useToastStore();
  const { id } = useAuthStore();
  const [isShop, setIsShop] = useState(true);
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
        console.error("Error: groomer Main", error);
        if (error.status === 404) {
          setIsShop(false);
        }
      }
    };

    getMain();
  }, []);

  if (!isShop)
    return (
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
    );

  return (
    <main className="min-h-screen bg-main-100">
      <div className="mx-auto w-11/12 pb-24 pt-6">
        {/* 오늘의 예약 */}
        <>
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
                  navigate={"/groomer/quotes"}
                />
              </div>
            </Link>
          </section>

          <section>
            <div className="flex items-center justify-between px-3">
              <h2 className="text-lg">우리동네 견적 공고</h2>
              <div
                className="text-xs"
                onClick={() => {
                  navigate("/groomer/quotes", { state: { activeTab: 2 } }); // [x]
                }}
              >
                더보기
              </div>
            </div>

            {totalRequest.map((request) => {
              return <GrommerTotalRequest key={request.requestId} request={request} />;
            })}
          </section>
        </>
      </div>
      <Toaster />
    </main>
  );
};

export default GroomerHome;
