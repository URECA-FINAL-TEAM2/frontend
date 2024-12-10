import axiosInstance from "@/api/axiosInstance";

export const getCustomerReviewList = async () => {
  try {
    const customerId = 1;
    const response = await axiosInstance.get(`/reviews/customer/${customerId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch favorite shop");
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const reviewId = 1;
    const response = await axiosInstance.put(`/reviews/delete/${reviewId}`);
    console.log(response);
  } catch (error) {
    if (error.response?.status === 404) {
      console.log("찾으시는 리뷰가 없습니다.");
    } else {
      console.error("리뷰 삭제 실패", error);
      throw error;
    }
  }
};

export const insertReview = async (reviewData) => {
  console.log(reviewData, "review");
  const { images, previewImages, ...jsonData } = reviewData;

  const formData = new FormData();
  formData.append("requestDto", JSON.stringify(jsonData));
  if (images) {
    formData.append("images", images);
  }
  try {
    const response = await axiosInstance.post("/reviews", formData);
    console.log("리뷰 작성 성공:", response.data);
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
  }
};
