import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";

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
    toast.success("리뷰등록이 완료되었습니다.", { icon: "👏🏻" });
    return response;
  } catch (error) {
    toast.success("리뷰 작성을 실패하였습니다.", { icon: "❌" });
    console.error("리뷰 작성 실패:", error);
    return error;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  const formData = new FormData();
  const { images, previewImages, ...jsonData } = reviewData;

  const imageUrls = images.filter((image) => typeof image === "string");

  const requestDto = {
    ...jsonData,
    images: imageUrls // 이미지 URL 추가
  };

  const jsonBlob = new Blob([JSON.stringify(requestDto)], { type: "application/json" });
  formData.append("requestDto", jsonBlob);

  images
    .filter((image) => image instanceof File) // 파일 객체만 필터링
    .forEach((file) => {
      formData.append("images", file);
    });

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
    return response.status;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return 400; // 400 상태 반환 - 본인 리뷰인 경우 추천 불가
    }
    console.error("요청 실패:", error);
    return null; // 다른 오류
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
    return response.status;
  } catch (error) {
    console.error("요청 실패:", error);
    return null; // 실패 시 null 반환
  }
};
