import axiosInstance from "@/api/axiosInstance";

// 고객, 미용사 프로필 정보 조회
export const getUserInfo = async (role, id) => {
  const endpoint = role === "customer" ? `/profile/customer/14` : `/profile/groomer/${id.groomerId}`;

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
    preparedData.customerId = 14;
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
  const endpoint = role === "customer" ? `/profile/customer/delete/14` : `/profile/groomer/delete/${id.groomerId}`;
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
    const id = { customerId: 14 }; // testcode
    const response = await axiosInstance.put(`/profile/customer/${id.customerId}/address`, addressData);
    console.log("고객 주소 수정", response);
  } catch (error) {
    console.error("고객 주소 수정 실패:", error);
    throw error;
  }
};

// 단골샵 조회
export const getFavoriteShop = async (customerId) => {
  try {
    const customerId = 1;
    const response = await axiosInstance.get(`/profile/${customerId}/favorites`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch favorite shop");
  }
};
