import axiosInstance from "@/api/axiosInstance";

const updateCustomerData = [
  {
    message: "Update Customer Success",
    data: {
      profileImage: "이미지",
      nickname: "수정된닉네임",
      phoneNumber: "010-2222-2222",
      address: "경기도 안양시 만안구"
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

export const updateUserInfo = async (role, preparedData, id) => {
  const formDataToSend = new FormData();

  // 파일 추가
  if (preparedData.profileImage) {
    formDataToSend.append("profileImage", preparedData.profileImage);
  }

  // 나머지 데이터 추가
  Object.keys(preparedData).forEach((key) => {
    if (key !== "profileImage") {
      formDataToSend.append(key, preparedData[key]);
    }
  });

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
