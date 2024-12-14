import axiosInstance from "@/api/axiosInstance";

// 반려견 정보 조회
export const getPetInfo = async (dogId, id) => {
  try {
    const customerId = id.customerId;

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

// 견적서에서 반려견 정보 조회
export const getQuotePetInfo = async (dogId) => {
  try {
    const customerId = 47; // TODO

    const response = await axiosInstance.get(`/profile/customer/dogs/${dogId}`, {
      params: { customerId }
    });
    console.log(response);
    const res = response.data.data;
    // const res = petInfo[0].data;

    const transformedData = {
      ...res, // 기존 데이터 유지
      dogAge: calculateDogAge(res.dogBirth) // dogBirth 변환
    };

    return transformedData;
  } catch (error) {
    console.error("반려견 정보 조회 요청 실패:", error);
    throw error;
  }
};

// requestQuery하 api긴 한데 내용이 너무 pet이라 여기 추가함
export const getQuotePetList = async (customerId) => {
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

// 반려견 정보 업데이트(등록, 수정)
export const updatePetInfo = async (id, dogId, dogData, state) => {
  const method = state === "update" ? "put" : "post";
  const endPoint = state === "update" ? `/profile/customer/dogs/${dogId}` : `/profile/customer/dogs`;
  const formatedData = {
    ...dogData,
    dogBirth: reformatDogBirth(dogData.dogBirth)
  };
  const { profileImage, ...jsonData } = formatedData;

  const formData = new FormData();
  formData.append("requestDto", JSON.stringify(jsonData));

  if (profileImage) {
    formData.append("dogProfile", profileImage);
  }

  const customerId = id.customerId;
  try {
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
export const deletePetInfo = async (dogId, id) => {
  try {
    const customerId = id.customerId;
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

const calculateDogAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  // Adjust the age if the dog's birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};
