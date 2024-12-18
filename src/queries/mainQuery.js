import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";

export const getCustomerMain = async (id) => {
  try {
    const customerId = id.customerId;
    const response = await axiosInstance.get("/main/customer", {
      params: { customerId }
    });
    return response.data.data;
  } catch (error) {
    console.error("고객 정보 등록 실패:", error);
    throw error;
  }
};

export const getGroomerMain = async (id) => {
  try {
    const response = await axiosInstance.get(`/main/groomer/${id}`);
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw { status: 404, message: "Groomer not found" }; // 상태 코드와 메시지를 포함한 에러 객체 던짐
    }
    throw new Error("Failed to fetch groomer main data"); // 기본 에러
  }
};

export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12; // 12시간제로 변환

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시`;
};
