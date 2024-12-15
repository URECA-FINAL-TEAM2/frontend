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
  const [totalRequest, setTotalRequest] = useState([
    {
      requestId: 7,
      profileImage: "/profile-user.png",
      userName: "이도림",
      closingDate: "2024-12-03T15:00:00",
      beautyDate: "2024-12-03T15:00:00",
      breed: "비숑",
      dogWeight: "5.6",
      dogGender: "FEMALE",
      requestContent: "(공지) 미용하고 싶어요4"
    }
  ]);
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

  return (
    <main className="min-h-screen bg-main-100">
      <div className="mx-auto w-11/12 pb-24 pt-6">
        {/* 오늘의 예약 */}
        {isShop ? (
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
                <Link to="/groomer/quotes">
                  <div className="text-xs">더보기</div>
                </Link>
              </div>

              {totalRequest.map((request) => {
                return <GrommerTotalRequest key={request.requestId} request={request} />;
              })}
            </section>
          </>
        ) : (
          <EmptyPage
            content={
              <div className="pb-24 text-center">
                <span className="block text-lg">등록된 매장이 없습니다.</span>
                <button
                  onClick={() => navigate("/groomer/createstore", { state: { update: false } })}
                  className="mt-2 rounded-xl bg-main px-5 py-1 text-lg text-white hover:bg-main-300"
                >
                  매장 등록하기
                </button>
              </div>
            }
          />
        )}
      </div>
      <Toaster />
    </main>
  );
};

export default GroomerHome;
