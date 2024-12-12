import axiosInstance from "@/api/axiosInstance";

// 고객, 미용사 프로필 정보 조회
export const getUserInfo = async (role, id) => {
  const endpoint = role === "customer" ? `/profile/customer/${id.customerId}` : `/profile/groomer/${id.groomerId}`;

  try {
    const response = await axiosInstance.get(endpoint);
    console.log("정보조회", response);
    return response.data.data;
  } catch (error) {
    console.error("요청 실패:", error);
    throw error;
  }
};

// 고객, 미용사 프로필 정보 수정
export const updateUserInfo = async (role, preparedData, id) => {
  ["email", "username", "userName", "sidoId", "sigunguId", "sidoName", "sigunguName"].forEach((key) => {
    delete preparedData[key];
  });

  if (role === "customer") {
    preparedData.customerId = id.customerId;
  }

  const { profileImage, ...jsonData } = preparedData;
  const formData = new FormData();
  formData.append("requestDto", JSON.stringify(jsonData));
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const endpoint = role === "customer" ? `/profile/customer` : `/profile/groomer`;

  try {
    const response = await axiosInstance.put(endpoint, formData);
    console.log("프로필 정보 수정 완료", response);
    return response.data.data;
  } catch (error) {
    console.error("프로필 정보 수정 실패:", error);
    throw error;
  }
};

// 유저 프로필 삭제
export const deleteUserInfo = async (role, id) => {
  const endpoint =
    role === "customer" ? `/profile/customer/delete/${id.customerId}` : `/profile/groomer/delete/${id.groomerId}`;
  try {
    const response = await axiosInstance.put(endpoint);
    console.log("프로필 정보 삭제 완료", response);
    return response;
  } catch (error) {
    console.error("프로필 정보 수정 실패:", error);
    throw error;
  }
};

// 고객 프로필 주소 수정
export const updateAddress = async (data, id) => {
  const { sidoName, sigunguName } = data;

  const addressData = {
    sidoName: sidoName.sidoName,
    sigunguName: sigunguName.sigunguName
  };

  try {
    const response = await axiosInstance.put(`/profile/customer/${id.customerId}/address`, addressData);
    console.log("고객 주소 수정", response);
  } catch (error) {
    console.error("고객 주소 수정 실패:", error);
    throw error;
  }
};

// 단골샵 조회
export const getFavoriteShop = async (id) => {
  try {
    const customerId = id.customerId;
    const response = await axiosInstance.get(`/profile/${customerId}/favorites`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch favorite shop");
  }
};

// 고객 주소 조회
export const getUserAddress = async () => {
  const customerId = 47; // TODO: 이건 빼고 사용처에서 보낼것
  const response = await axiosInstance.get(`/profile/${customerId}/address`);
  return response.data.data;
};

// 미용사 찾기에서 고객 주소 수정
export const updateUserAddress = async (sidoName, sigunguName, customerId) => {
  const addressData = {
    sidoName: sidoName,
    sigunguName: sigunguName
  };

  try {
    const response = await axiosInstance.put(`/profile/customer/${customerId}/address`, addressData);
    console.log("고객 주소 수정", response);
  } catch (error) {
    console.error("고객 주소 수정 실패:", error);
    throw error;
  }
};
