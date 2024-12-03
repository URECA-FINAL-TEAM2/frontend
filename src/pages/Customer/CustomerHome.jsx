import { Link } from "react-router-dom";
import BestReviewBox from "../../components/Main/BestReviewBox";
import ShopBox from "../../components/Main/ShopBox";
import mockJson from "../../utils/customerHome.json";
import { useEffect, useState } from "react";
import { getCustomerMain } from "@/queries/mainQuery";

const CustomerHome = () => {
  const [bestReviews, setBestReviews] = useState([]);
  const [localGroomers, setLocalGroomers] = useState([]);

  useEffect(() => {
    const getMain = async () => {
      try {
        const response = await getCustomerMain();
        setBestReviews(response[0].data.bestReviews);
        setLocalGroomers(response[0].data.localGroomers);
      } catch (error) {
        console.error("Error: Customer Main", error);
      }
    };

    getMain();
  }, []);

  return (
    <main className="min-h-screen bg-main-100">
      <div className="mx-auto w-11/12 bg-main-100 pb-24 pt-6">
        {/* 배너 */}
        <section className="mb-6">
          <div className="h-[200px] rounded-xl bg-white p-3">배너</div>
        </section>
        {/* BEST 미용후기 추천 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">🩷 BEST 미용 후기 추천</h2>
            <Link to="/bestReviews">
              <div className="text-xs">더보기</div>
            </Link>
          </div>

          {bestReviews.map((items) => {
            return (
              <BestReviewBox
                key={items.reviewId}
                reviewImage={items.reviewImage}
                shopName={items.shopName}
                starScore={items.starScore}
                timestamp={items.timestamp}
                content={items.content}
                recommendCount={items.recommendCount}
              />
            );
          })}
        </section>

        {/* 우리동네 디자이너 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">🐾 우리동네 디자이너</h2>
            <Link to="/customer/search">
              <div className="text-xs">더보기</div>
            </Link>
          </div>

          {localGroomers.map((items) => {
            return (
              <ShopBox
                key={items.shopId}
                shopLogo={items.shopLogo}
                shopName={items.shopName}
                starScoreAvg={items.starScoreAvg}
                reviewCount={items.reviewCount}
                address={items.address}
                skills={items.skills}
                businessTime={items.businessTime}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default CustomerHome;
