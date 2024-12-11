import axiosInstance from "@/api/axiosInstance";

const petInfo = [
  {
    message: "Get Pet Success",
    data: {
      dogId: "1",
      dogName: "고양이",
      breed: "시바견",
      dogWeight: "4.8",
      dogBirth: "2020-02-29",
      dogGender: "남아",
      neutering: "O",
      experience: "X",
      significant: "특이함",
      profileImage: null
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

// 반려견 정보 조회
export const getPetInfo = async (dogId, customerId) => {
  try {
    const dogId = 28;
    const customerId = 14;

    const response = await axiosInstance.get(`/profile/customer/dogs/${dogId}`, {
      params: { customerId }
    });
    console.log(response.data.data);
    const res = response.data.data;

    const transformedData = {
      ...res, // 기존 데이터 유지
      dogBirth: formatDogBirth(res.dogBirth) // dogBirth 변환
    };

    return transformedData;
  } catch (error) {
    console.error("반려견 정보 조회 요청 실패:", error);
    throw error;
  }
};

// 반려견 정보 업데이트(등록, 수정)
export const updatePetInfo = async (id, dogData) => {
  const method = id ? "put" : "post";
  const endPoint = id ? `/profile/customer/dogs/${28}` : `/profile/customer/dogs`;
  const formatedData = {
    ...dogData,
    dogBirth: reformatDogBirth(dogData.dogBirth) // "2024-11-11"
  };
  const { profileImage, ...jsonData } = formatedData;

  console.log(jsonData);

  const formData = new FormData();
  formData.append("requestDto", JSON.stringify(jsonData));

  if (profileImage) {
    formData.append("dogProfile", profileImage);
  }

  try {
    const customerId = 14;
    const response = await axiosInstance({
      method,
      url: endPoint,
      data: formData,
      params: { customerId }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("반려견 정보 업데이트 요청 실패:", error);
    throw error;
  }
};

// 반려견 정보 삭제
export const deletePetInfo = async (dogId, customerId) => {
  try {
    const dogId = 27;
    const customerId = 14;
    const response = await axiosInstance.put(
      `/profile/customer/dogs/${dogId}/delete`,
      {},
      {
        params: { customerId }
      }
    );
    return response.data;
  } catch (error) {
    console.error("반려견 정보 삭제 요청 실패:", error);
    throw error;
  }
};

// 견종 조회
export const getDogBreed = async () => {
  try {
    const response = await axiosInstance.get(`/profile/customer/dogs/breed`);
    return response.data.data;
  } catch (error) {
    console.error("반려견 정보 삭제 요청 실패:", error);
    throw error;
  }
};

// 2024-12-02 > year, month, day 분리
function formatDogBirth(dateString) {
  const [year, month, day] = dateString.split("-");
  return {
    year: `${year}`,
    month: `${parseInt(month)}`, // 월 앞의 0 제거
    day: `${parseInt(day)}` // 일 앞의 0 제거
  };
}

// year, month, day > 2024-12-02 형태로 연결
function reformatDogBirth(dogBirth) {
  const year = dogBirth.year; // "2024"
  const month = String(dogBirth.month).padStart(2, "0"); // "11" (앞에 0 추가)
  const day = String(dogBirth.day).padStart(2, "0"); // "11" (앞에 0 추가)
  return `${year}-${month}-${day}`; // "2024-11-11"
}
