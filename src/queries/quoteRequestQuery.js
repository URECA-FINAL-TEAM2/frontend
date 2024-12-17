import axiosInstance from "@/api/axiosInstance";

const getQuotePetList = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/requests/dog`, {
      params: { customerId }
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("반려견 목록 조회 요청 실패:", error);
    throw error;
  }
};

const getGroomerDetail = async (groomerId) => {
  const response = await axiosInstance.get(`/requests/groomer/${groomerId}/shop`);
  return response.data.data;
};

const sendCustomerQuote = async (customerId, requestDto, images) => {
  const formData = new FormData();

  // requestDto를 JSON 문자열로 변환하여 추가
  formData.append("requestDto", JSON.stringify(requestDto));

  // 이미지 추가 (여러 이미지인 경우)
  images.forEach((image, index) => {
    formData.append("images", image, `image_${index}.jpg`);
  });

  console.log("form", formData);

  const response = await axiosInstance.post(`/requests/all`, formData, {
    params: { customerId },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response;
};

const sendGroomerQuote = async (customerId, requestDto, images) => {
  const formData = new FormData();

  // requestDto를 JSON 문자열로 변환하여 추가
  formData.append("requestDto", JSON.stringify(requestDto));

  // 이미지 추가 (여러 이미지인 경우)
  images.forEach((image, index) => {
    formData.append("images", image, `image_${index}.jpg`);
  });

  console.log("form", formData);

  const response = await axiosInstance.post(`/requests/groomer`, formData, {
    params: { customerId },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response;
};

const getCustomerRequestDetail = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/requests/customer/detail/${requestId}`, {});
    return response.data.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

const getGroomerRequestDetail = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/requests/groomer/detail/${requestId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const RequestReject = async (rejectData) => {
  try {
    const response = await axiosInstance.put("/requests/groomer", {
      requestId: rejectData.requestId,
      groomerId: rejectData.groomerId,
      rejectionReason: rejectData.rejectReason
    });

    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

const getGroomerQuoteDirect = async (groomerId) => {
  console.log("groomerId: ", groomerId);
  try {
    const response = await axiosInstance.get(`/requests/groomer/direct/${groomerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getGroomerQuoteTotal = async (groomerId) => {
  try {
    const response = await axiosInstance.get(`/requests/groomer/total/${groomerId}`);
    // 매장 등록 안 된 경우 404 -> 예외처리 필요
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("Data not found (404). Returning placeholder.");
      return { is404: true }; // 404임을 표시하는 객체 반환
    }
    throw error;
  }
};

const getGroomerQuoteSend = async (groomerId) => {
  try {
    const response = await axiosInstance.get(`/requests/groomer/send/${groomerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

export {
  getQuotePetList,
  getGroomerDetail,
  getCustomerRequestDetail,
  getGroomerRequestDetail,
  sendCustomerQuote,
  sendGroomerQuote,
  RequestReject,
  getGroomerQuoteDirect,
  getGroomerQuoteTotal,
  getGroomerQuoteSend
};
