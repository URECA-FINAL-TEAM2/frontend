import { Link } from "react-router-dom";
import BestReviewBox from "../../components/Main/BestReviewBox";
import ShopBox from "../../components/Main/ShopBox";
import mockJson from "../../utils/customerHome.json";

const CustomerHome = () => {
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

          {mockJson.data.bestReviews.map((items) => {
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

          {mockJson.data.localGroomers.map((items) => {
            return (
              <ShopBox
                key={items.shopId}
                shopLogo={items.shopLogo}
                shopName={items.shopName}
                starScore={items.starScore}
                starCount={items.starCount}
                address={items.address}
                skill={items.skill}
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
