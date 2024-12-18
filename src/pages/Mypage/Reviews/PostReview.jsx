import SubHeader from "../../../components/common/SubHeader";
import { useState } from "react";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import Modal from "../../../components/common/modal/modal";
import EditReviewImage from "@/components/Mypage/Review/EditReviewImage";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { insertReview } from "@/queries/reviewQuery";
import toast, { Toaster } from "react-hot-toast";
import { formatDateOnly } from "@/utils/formatDate";

const PostReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useAuthStore(); // id.customerId
  const { item } = location.state || {};
  const customerId = id.customerId;

  const [reviewData, setReviewData] = useState({
    groomerId: item.groomerId || null,
    customerId: customerId || id.customerId,
    selectedQuoteId: item.selectedQuoteId || null,
    starScore: 0,
    content: "",
    images: [], // 원본 파일
    previewImages: [] // 미리보기 URL
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 별점 변경
  const handleSelectChange = (e) => {
    const newRating = Number(e.target.value);
    setReviewData((prev) => ({ ...prev, starScore: newRating }));
  };

  // 리뷰 내용 변경
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setReviewData((prev) => ({ ...prev, content: newContent }));
  };

  // 이미지 추가
  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file)); // 미리보기 URL 생성
    setReviewData((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // 원본 파일 추가
      previewImages: [...prev.previewImages, ...newPreviewUrls] // 미리보기 URL 추가
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
    setIsModalOpen(false);

    try {
      const response = await insertReview(reviewData);
      // console.log(response);
      // toast.success("수정이 완료되었습니다.", { icon: "👏🏻" });
    } catch (error) {
      console.error("리뷰 수정 중 에러 발생:", error.message);
      toast.error(`리뷰 수정에 실패했습니다: ${error.message}`, { icon: "⚠️", position: "top-center", duration: 1000 });
    }

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
          <ImStarFull key={`full-${index}`} color="#F4B400" size={15} />
        ))}
        {hasHalfStar && <ImStarHalf key="half" color="#F4B400" size={15} />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <ImStarEmpty key={`empty-${index}`} color="#E0E0E0" size={15} />
        ))}
      </>
    );
  };

  return (
    <>
      <SubHeader title={"리뷰 작성"} />
      <div className="mx-auto min-h-screen bg-main-100 pt-[90px]">
        <div className="mx-auto mb-4 h-auto w-11/12 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between text-lg">
            <span>{item.shopName}</span>
            <div className="text-sm">formatDateOnly{item.beautyDate} 방문</div>
          </div>

          <div className="mb-2 flex items-center">
            <div className="mr-2 flex items-center space-x-1">{renderStars()}</div>
            <select
              value={reviewData.starScore}
              onChange={handleSelectChange}
              className="rounded-xl border border-gray-200 px-3"
            >
              {Array.from({ length: 11 }, (_, index) => index * 0.5).map((value) => (
                <option key={value} value={value}>
                  {value.toFixed(1)}
                </option>
              ))}
            </select>
          </div>

          <EditReviewImage
            images={reviewData.previewImages} // 미리보기 URL 전달
            handleImageDelete={handleImageDelete}
            handleImageAdd={handleImageAdd}
          />

          <textarea
            value={reviewData.content}
            onChange={handleContentChange}
            className="w-full rounded-md border border-gray-300 p-2"
            rows="4"
            placeholder="리뷰 내용을 입력하세요."
          ></textarea>
        </div>

        <button className="bottomButtonPink" onClick={handleOpenModal}>
          작성완료
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          closeText="닫기"
          confirmText="확인"
        >
          리뷰를 작성하시겠습니까?
        </Modal>
        <Toaster />
      </div>
    </>
  );
};

export default PostReview;
