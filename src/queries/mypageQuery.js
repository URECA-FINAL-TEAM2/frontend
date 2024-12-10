import axiosInstance from "@/api/axiosInstance";

export const getCustomerMypage = async () => {
  try {
    const customerId = 1; // 수정 필요
    // const response = await axiosInstance.get(`/mypage/customer/${customerId}`);
    // console.log(response);
    // return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch customer mypage data");
  }
};

// 미용사 마이페이지 조회
export const getGroomerMypage = async (groomerId) => {
  try {
    const response = await axiosInstance.get(`/mypage/groomer/${groomerId}`);
    console.log("미용사 마이페이지 조회:", response);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch customer mypage data");
  }
};
