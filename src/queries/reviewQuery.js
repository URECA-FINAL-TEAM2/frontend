import axiosInstance from "@/api/axiosInstance";

export const getCustomerReviewList = async (id) => {
  try {
    const customerId = id.customerId;
    const response = await axiosInstance.get(`/reviews/customer/${customerId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch favorite shop");
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const reviewId = reviewId;
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
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  try {
    const response = await axiosInstance.post("/reviews", formData);
    console.log("리뷰 작성 성공:", response.data);
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
  }
};

export const updateReview = async (reviewId, reviewData) => {
  console.log(reviewData, "update review");
  const { images, previewImages, ...jsonData } = reviewData;

  const formData = new FormData();
  formData.append("requestDto", JSON.stringify(jsonData));
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image); // 키를 동일하게 추가하여 배열처럼 전송
    });
  }

  try {
    const response = await axiosInstance.put(`/reviews/${reviewId}`, formData);
    console.log("리뷰 수정 성공:", response.data);
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
  }
};

export const postReviewRecommend = async (customerId, reviewId) => {
  try {
    const response = await axiosInstance.post("/recommend", null, {
      params: {
        customerId,
        reviewId
      }
    });

    console.log(response.status === 200 ? "요청 성공" : `요청 실패: ${response.status}`);
  } catch (error) {
    console.error("요청 실패:", error);
  }
};

export const deleteReviewRecommend = async (customerId, reviewId) => {
  try {
    const response = await axiosInstance.delete("/recommend", {
      params: {
        customerId,
        reviewId
      }
    });

    console.log(response.status === 200 ? "요청 성공" : `요청 실패: ${response.status}`);
  } catch (error) {
    console.error("요청 실패:", error);
  }
};
