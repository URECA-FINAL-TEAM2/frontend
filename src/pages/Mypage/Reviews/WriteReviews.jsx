import SubHeader from "../../../components/common/SubHeader";
import { useEffect, useState } from "react";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im"; // 아이콘 변경
import testImg from "/Test/dog.jpg";
import Modal from "../../../components/common/modal/modal";
import EditReviewImage from "@/components/Mypage/Review/EditReviewImage";
import { getCustomerReviewList } from "@/queries/reviewQuery";

const WriteReviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [reviewContent, setReviewContent] = useState("리뷰 내용입니다.");
  const [images, setImages] = useState([testImg, testImg, testImg]); // 초기 이미지 배열

  const handleSelectChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    console.log("리뷰 수정완료");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getReview = async () => {
      const response = await getCustomerReviewList();
      console.log(response);
    };
    getReview();
  }, []);

  // 별 렌더링 함수
  const renderStars = () => {
    const fullStars = Math.floor(rating); // 꽉 찬 별 개수
    const hasHalfStar = rating % 1 >= 0.5; // 반 별 여부
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
      <SubHeader title={"리뷰 수정"} />
      <div className="mx-auto min-h-screen bg-main-100 pt-[90px]">
        <div className="mx-auto mb-4 h-auto w-11/12 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between text-lg">
            <span>매장명</span>
            <div className="text-sm">2024.11.14</div>
          </div>

          <div className="mb-2 flex items-center">
            {/* 별 아이콘 렌더링 */}
            <div className="mr-2 flex items-center space-x-1">{renderStars()}</div>
            {/* Select Box */}
            <select value={rating} onChange={handleSelectChange} className="rounded-xl border border-gray-200 px-3">
              {Array.from({ length: 11 }, (_, index) => index * 0.5).map((value) => (
                <option key={value} value={value}>
                  {value.toFixed(1)}
                </option>
              ))}
            </select>
          </div>

          <EditReviewImage images={images} handleImageDelete={handleImageDelete} handleImageAdd={handleImageAdd} />

          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
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
      </div>
    </>
  );
};

export default WriteReviews;
