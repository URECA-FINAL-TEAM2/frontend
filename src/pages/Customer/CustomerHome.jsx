import shopLogo from "/Main/customer.svg";
import BestReviewBox from "../../components/Main/BestReviewBox";
import ShopBox from "../../components/Main/ShopBox";

const CustomerHome = () => {
  return (
    <div className="mt-[75px] min-h-screen bg-main-100">
      <main className="mx-auto w-11/12">
        {/* 배너 */}
        <section className="">
          <div className="my-3 bg-[green] p-3">배너</div>
        </section>
        {/* BEST 미용후기 추천 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">BEST 미용 후기 추천</h2>
            <div className="text-xs">더보기</div>
          </div>

          <BestReviewBox
            shopLogo={shopLogo}
            shopName={"블레스펫살롱"}
            starScore={5}
            timestamp={"2024-11-19"}
            content={
              "입니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니니"
            }
            recommendCount={80}
          />
          <BestReviewBox
            shopLogo={shopLogo}
            shopName={"블레스펫살롱"}
            starScore={5}
            timestamp={"2024-11-19"}
            content={
              "입니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니다.내용입니다.내용입니다.니니니"
            }
            recommendCount={80}
          />
        </section>
        {/* 우리동네 디자이너 */}
        <section>
          <div className="flex items-center justify-between px-3">
            <h2 className="text-lg">우리동네 디자이너</h2>
            <div className="text-xs">더보기</div>
          </div>
          <ShopBox
            shopLogo={shopLogo}
            shopName={"위드두유"}
            starScore={4.5}
            address={"경기도 성남시"}
            skill={"소형견, 중형견 미용"}
            businessTime={"10:00-19:00"}
          />
          <ShopBox
            shopLogo={shopLogo}
            shopName={"위드두유"}
            starScore={4.5}
            address={"경기도 성남시"}
            skill={"소형견, 중형견 미용"}
            businessTime={"10:00-19:00"}
          />
        </section>
      </main>
    </div>
  );
};

export default CustomerHome;
