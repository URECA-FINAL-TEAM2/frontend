import SubHeader from "../../../components/common/SubHeader";
import ReviewBox from "../../../components/Mypage/Review/ReviewBox";
import { useEffect } from "react";
import { getCustomerReviewList } from "@/queries/reviewQuery";

const MyReviews = () => {
  useEffect(() => {
    const getList = async () => {
      const response = await getCustomerReviewList(1);
      console.log("리뷰목록조회", response);
    };
    getList();
  }, []);
  return (
    <>
      <SubHeader title={"리뷰관리"} />
      <div className="mx-auto mt-[75px] min-h-screen bg-main-100">
        <div className="mx-auto w-11/12 py-5 text-sm">작성한 리뷰 N건</div>
        <ReviewBox />
      </div>
    </>
  );
};

export default MyReviews;
