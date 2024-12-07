import { Link } from "react-router-dom";
import BestReviewBox from "../../components/Main/BestReviewBox";
import { useEffect, useState } from "react";
import { getCustomerMain } from "@/queries/mainQuery";
import ShopItem from "@/components/CustomerSearch/ShopItem";

const CustomerHome = () => {
  const [bestReviews, setBestReviews] = useState([]);
  const [localGroomers, setLocalGroomers] = useState([]);

  useEffect(() => {
    const getMain = async () => {
      try {
        const response = await getCustomerMain();
        console.log(response);
        setBestReviews(response.bestReviews);
        setLocalGroomers(response.localGroomers);
      } catch (error) {
        console.error("Error: Customer Main", error);
      }
    };

    getMain();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-11/12 pb-24 pt-6">
        {/* 배너 */}
        <section className="mb-6">
          <div className="h-[200px] rounded-xl bg-white p-3">배너</div>
        </section>
        {/* BEST 미용후기 추천 */}
        <section className="mb-8">
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">BEST 미용 후기 추천</h2>
          </div>

          {bestReviews.map((bestReview) => {
            return <BestReviewBox key={bestReview.reviewId} bestReview={bestReview} />;
          })}
        </section>

        {/* 우리동네 디자이너 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">우리동네 디자이너</h2>
            <Link to="/customer/search">
              <div className="text-xs">더보기</div>
            </Link>
          </div>

          {localGroomers.map((shopInfo) => {
            return <ShopItem key={shopInfo.shopId} shopInfo={shopInfo} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default CustomerHome;
