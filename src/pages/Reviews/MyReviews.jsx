import SubHeader from "../../components/common/SubHeader";
import ReviewBox from "../../components/Mypage/Review/ReviewBox";

const MyReviews = () => {
  return (
    <>
      <SubHeader title={"리뷰관리"} />
      <div className="mx-auto mt-[75px] min-h-screen bg-main-100">
        <div className="mx-auto w-11/12 py-5 text-sm">작성한 리뷰 N건</div>

        <ReviewBox />
        <ReviewBox />
      </div>
    </>
  );
};

export default MyReviews;
