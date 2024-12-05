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
export const getPetInfo = async (id) => {
  try {
    // const response = await axiosInstance.get(`/profile/customer/pets/${id}`);
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

  // FormData 생성
  const formData = new FormData();

  // profileImage를 dogData에서 추출
  const { profileImage, ...jsonData } = formatedData;

  // JSON 데이터 직렬화 후 FormData에 추가
  formData.append("requestDTO", JSON.stringify(jsonData));

  // 파일 데이터 추가
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
    // const response = await axiosInstance({
    //   method,
    //   url: endPoint,
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // });
    // return response.data;
    return successResponse;
  } catch (error) {
    console.error("반려견 정보 업데이트 요청 실패:", error);
    throw error;
  }
};

// 반려견 정보 삭제
export const deletePetInfo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/profile/customer/pets/${id}`);
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
