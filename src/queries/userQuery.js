import axiosInstance from "@/api/axiosInstance";

// 고객, 미용사 정보 조회
export const getUserInfo = async (role, id) => {
  const endpoint = role === "customer" ? `/profile/customer/${id}` : `/profile/groomer/${id}`;

  try {
    const response = await axiosInstance.get(endpoint);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("요청 실패:", error);
    throw error;
  }
};

// 고객, 미용사 정보 수정
export const updateUserInfo = async (role, preparedData, id) => {
  const data = prepareDataForBackend(role, preparedData);
  const { profileImage, sidoName, sigunguName, ...jsonData } = data;
  const addressData = {
    sidoName: sidoName.sidoName,
    sigunguName: sigunguName.sigunguName
  };
  const formData = new FormData();

  if (role === "customer") {
    // jsonData.customerId = id.customerId
    jsonData.customerId = 3; // test code
    try {
      // const response = await axiosInstance.put(`/profile/customer/${id.customerId}/address`, addressData);
      const response = await axiosInstance.put(`/profile/customer/3/address`, addressData);
      console.log("고객 주소 수정", response);
    } catch (error) {
      console.error("고객 주소 수정 실패:", error);
      throw error;
    }
  } else {
    // jsonData.groomerId = id.customerId;
    jsonData.groomerId = 3;
  }

  formData.append("requestDto", JSON.stringify(jsonData));

  if (preparedData.profileImage) {
    formData.append("profileImage", profileImage);
  }

  const endpoint = role === "customer" ? `/profile/customer` : `/profile/groomer`; // testcode

  try {
    const response = await axiosInstance.put(endpoint, formData);
    console.log("프로필 정보수정", response);
    return response.data;
  } catch (error) {
    console.error("요청 실패:", error);
    throw error; // 에러 발생 시 호출한 곳에서 처리
  }
};

export const getFavoriteShop = async (customerId) => {
  try {
    const customerId = 1;
    const response = await axiosInstance.get(`/profile/${customerId}/favorites`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch favorite shop");
  }
};

// 필요없는 데이터 삭제
const prepareDataForBackend = (role, data) => {
  const filteredData = { ...data };
  delete filteredData.userName; // 백엔드 변경되면 지우기
  delete filteredData.username;
  delete filteredData.email;
  delete filteredData.sidoId;
  delete filteredData.sigunguId;

  if (role === "customer") {
    delete filteredData.skills;
  }

  return filteredData;
};
