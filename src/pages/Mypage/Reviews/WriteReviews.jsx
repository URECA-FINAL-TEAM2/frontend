import SubHeader from "../../../components/common/SubHeader";
import { useState } from "react";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import Modal from "../../../components/common/modal/modal";
import EditReviewImage from "@/components/Mypage/Review/EditReviewImage";
import { useLocation, useNavigate } from "react-router-dom";
import { insertReview, updateReview } from "@/queries/reviewQuery";
import toast, { Toaster } from "react-hot-toast";
import { formatDateOnly } from "@/utils/formatDate";

const WriteReviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { review } = location.state || {}; // location.state에서 리뷰 데이터 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 리뷰 상태 변수
  const [reviewData, setReviewData] = useState({
    starScore: review?.starScore || 4.5,
    content: review?.content || "",
    images: review?.reviewImages || [], // 이미지 파일 객체
    previewImages:
      review?.reviewImages?.map((image) => (typeof image === "string" ? image : URL.createObjectURL(image))) || [] // 미리보기용 URL
  });

  // 별점 변경
  const handleStarScoreChange = (e) => {
    const newScore = Number(e.target.value);
    setReviewData((prev) => ({ ...prev, starScore: newScore }));
  };

  // 리뷰 내용 변경
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setReviewData((prev) => ({ ...prev, content: newContent }));
  };

  // 이미지 추가
  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = files;
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file)); // 미리보기 URL 생성

    setReviewData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageFiles], // 원본 파일 저장
      previewImages: [...prev.previewImages, ...newPreviewUrls] // 미리보기 URL 저장
    }));
  };

  // 이미지 삭제
  const handleImageDelete = (index) => {
    setReviewData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // 원본 파일 삭제
      previewImages: prev.previewImages.filter((_, i) => i !== index) // 미리보기 URL 삭제
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = async () => {
    console.log("수정 완료 데이터:", reviewData);
    setIsModalOpen(false);

    await updateReview(review?.reviewId, reviewData);
    toast("수정이 완료되었습니다.", { icon: "👏🏻", position: "top-center", duration: 1000 });

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  // 별 렌더링 함수
  const renderStars = () => {
    const fullStars = Math.floor(reviewData.starScore); // 꽉 찬 별 개수
    const hasHalfStar = reviewData.starScore % 1 >= 0.5; // 반 별 여부
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 빈 별 개수

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <ImStarFull key={`full-${index}`} color="#F4B400" size={12} />
        ))}
        {hasHalfStar && <ImStarHalf key="half" color="#F4B400" size={12} />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <ImStarEmpty key={`empty-${index}`} color="#E0E0E0" size={12} />
        ))}
      </>
    );
  };

  return (
    <>
      <SubHeader title={"리뷰 수정"} />
      <div className="mx-auto min-h-screen bg-main-100 pt-[90px]">
        <div className="mx-auto mb-4 h-auto w-11/12 rounded-xl bg-white p-4">
          <div className="text-md flex items-center justify-between">
            <span>{review.shopName}</span>
            <span className="text-xs text-gray-400">{review.groomerName} 디자이너</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 flex items-center space-x-1">{renderStars()}</div>
              <select
                value={reviewData.starScore}
                onChange={handleStarScoreChange}
                className="rounded-xl border border-gray-200 px-3 text-sm"
              >
                {Array.from({ length: 11 }, (_, index) => index * 0.5).map((value) => (
                  <option key={value} value={value}>
                    {value.toFixed(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-3 text-xs text-gray-400">{formatDateOnly(review.reviewDate)} 방문</div>
          </div>

          <EditReviewImage
            images={reviewData.previewImages} // 미리보기 URL
            handleImageDelete={handleImageDelete}
            handleImageAdd={handleImageAdd}
          />

          <textarea
            value={reviewData.content}
            onChange={handleContentChange}
            className="w-full rounded-md border border-gray-200 p-2"
            rows="4"
            placeholder="리뷰 내용을 입력하세요."
          ></textarea>
        </div>

        <button className="bottomButtonPink" onClick={handleOpenModal}>
          수정완료
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          closeText="닫기"
          confirmText="확인"
        >
          리뷰를 수정하시겠습니까?
        </Modal>
        <Toaster />
      </div>
    </>
  );
};

export default WriteReviews;
