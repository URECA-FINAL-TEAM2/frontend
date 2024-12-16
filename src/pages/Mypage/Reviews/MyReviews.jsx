import SubHeader from "../../../components/common/SubHeader";
import ReviewBox from "../../../components/Mypage/Review/ReviewBox";
import { useEffect, useState } from "react";
import { getCustomerReviewList } from "@/queries/reviewQuery";
import useAuthStore from "@/store/authStore";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]); // 리뷰 리스트 상태const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useAuthStore();

  useEffect(() => {
    const getList = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getCustomerReviewList(id); // 사용자 ID를 매개변수로 전달
        console.log("리뷰목록조회", response);
        setReviews(response.data.data); // 리뷰 리스트 상태 업데이트
      } catch (error) {
        console.error("리뷰 목록 조회 실패:", error);
        setError("리뷰 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    getList();
  }, []);

  return (
    <div className="mx-auto mt-[75px] min-h-screen">
      <SubHeader title={"리뷰관리"} />

      {/* 리뷰 리스트 렌더링 */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewBox key={review.reviewId} review={review} /> // 각 리뷰 데이터를 전달
        ))
      ) : (
        <div className="text-center text-gray-500">작성된 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default MyReviews;
