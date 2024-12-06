import axiosInstance from "@/api/axiosInstance";

const getCustomerData = [
  {
    message: "get Customer Success",
    data: {
      profileImage: "이미지",
      name: "노승희",
      nickname: "수정된닉네임",
      phoneNumber: "010-2222-2222",
      sido: "", // 고객 필드
      sigungu: "" // 고객 필드
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const getGroomerData = [
  {
    message: "get Groomer Success",
    data: {
      profileImage: "이미지",
      name: "노승희",
      nickname: "받아온닉네임",
      phoneNumber: "010-2222-2222",
      skills: "특수견/소형견 미용"
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const updateCustomerData = [
  {
    message: "Update Customer Success",
    data: {
      profileImage: "이미지",
      nickname: "수정된닉네임",
      phoneNumber: "010-2222-2222",
      sido: "", // 고객 필드
      sigungu: "" // 고객 필드
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const updateGroomerData = [
  {
    message: "Update groomer Success",
    data: {
      profileImage: "이미지",
      nickname: "수정된닉네임",
      phoneNumber: "010-2222-2222",
      skills: "소형견/대형견 특수 미용"
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

// 고객, 미용사 정보 조회
export const getUserInfo = async (role, id) => {
  const endpoint = role === "customer" ? `/profile/customer/${id}` : `/profile/groomer/${id}`;

  try {
    // const response = await axiosInstance.get(endpoint);
    // return response.data; // 요청 성공 시 데이터 반환

    if (role === "customer") {
      return getCustomerData;
    } else {
      return getGroomerData;
    }
  } catch (error) {
    console.error("요청 실패:", error);
    throw error;
  }
};

// 고객, 미용사 정보 수정
export const updateUserInfo = async (role, preparedData, id) => {
  const data = prepareDataForBackend(role, preparedData);

  // FormData 생성
  const formData = new FormData();

  // profileImage를 dogData에서 추출
  const { profileImage, ...jsonData } = data;

  // JSON 데이터 직렬화 후 FormData에 추가
  formData.append("requestDTO", JSON.stringify(jsonData));

  // 파일 추가
  if (preparedData.profileImage) {
    formData.append("profileImage", profileImage);
  }

  const endpoint = role === "customer" ? `/profile/customer/${id}` : `/profile/groomer/${id}`;

  try {
    // const response = await axiosInstance.put(endpoint, formDataToSend, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // });
    // return response.data; // 요청 성공 시 데이터 반환

    if (role === "customer") {
      return updateCustomerData;
    } else {
      return updateGroomerData;
    }
  } catch (error) {
    console.error("요청 실패:", error);
    throw error; // 에러 발생 시 호출한 곳에서 처리
  }
};

const prepareDataForBackend = (role, data) => {
  const filteredData = { ...data };
  delete filteredData.name;
  delete filteredData.email;

  if (role === "customer") {
    delete filteredData.skills; // 고객은 skills 필드 제거
  } else if (role === "groomer") {
    delete filteredData.sido; // 미용사는 sido 필드 제거
    delete filteredData.sigungu; // 미용사는 sigungu 필드 제거
  }

  return filteredData;
};
