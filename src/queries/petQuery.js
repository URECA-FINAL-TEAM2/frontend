import axiosInstance from "@/api/axiosInstance";

const successResponse = [
  {
    message: "반려견 정보 수정 성공",
    data: {
      dogId: 123,
      dogName: "멍당이",
      breed: "말티즈",
      dogWeight: "5.0",
      dogBirth: "2024-02-29",
      dogGender: "MALE",
      neutering: true,
      experience: true,
      significant: "목 쪽 피부병 치료 완료."
    },
    timestamp: "2024-12-04 00:00:00"
  }
];

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
export const getPetInfo = async (dogId) => {
  try {
    const dogId = 1;
    const customerId = 1;

    const response = await axiosInstance.get(`/profile/customer/dogs/${dogId}`, {
      params: { customerId }
    });
    console.log(response);
    // const res = response.data;
    const res = petInfo[0].data;

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
  const endPoint = id ? `/profile/customer/dogs/${id}` : `/profile/customer/dogs`;
  console.log(id, method, endPoint);

  const formatedData = {
    ...dogData,
    dogBirth: reformatDogBirth(dogData.dogBirth) // "2024-11-11"
  };

  const formData = new FormData();

  const { profileImage, ...jsonData } = formatedData;

  formData.append("requestDTO", JSON.stringify(jsonData));

  if (profileImage) {
    formData.append("profileImage", profileImage);
  } else {
    console.warn("profileImage가 null입니다. 기본값으로 처리됩니다.");
  }

  // FormData 확인 (디버깅용)
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const customerId = 1;
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
export const deletePetInfo = async (dogId) => {
  try {
    const dogId = 1;
    const customerId = 1;
    const response = await axiosInstance.delete(`/profile/customer/dogs/${dogId}/delete`, { params: { customerId } });
    return response.data;
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
