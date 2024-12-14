import axiosInstance from "@/api/axiosInstance";

// 고객 예약 리스트
export const getCustomerList = async (customerId) => {
  try {
    const cId = customerId.customerId;

    const response = await axiosInstance.get(`/api/selected-quotes/customer`, {
      params: {
        customerId: cId
      },
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reservation data");
  }
};

// 미용사 예약 리스트
export const getGroomerList = async (groomerId) => {
  try {
    const gId = groomerId.groomerId;

    const response = await axiosInstance.get(`/api/selected-quotes/groomer`, {
      params: {
        groomerId: gId
      },
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reservation data");
  }
};

// 예약 상세 조회
// TODO : lat, lan 받아야 함 (API 수정요청)
export const getReservationDetail = async (selectedQuoteId) => {
  try {
    const sId = selectedQuoteId.selectedQuoteId;

    const response = await axiosInstance.get(`/api/selected-quotes/${selectedQuoteId}`, {
      params: {
        selectedQuoteId: sId
      },
      headers: {
        Accept: "application/json"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reservation data");
  }
};
