import axiosInstance from "@/api/axiosInstance";

// 유저 정보 등록(고객, 미용사)
export const registerUser = async (userData, role) => {
  const endPoint = role === "customer" ? "/api/users/register/customer" : "/api/users/register/groomer";
  const formData = new FormData();

  const { profileImage, ...jsonData } = userData;

  delete jsonData.email;
  delete jsonData.username;
  delete jsonData.role;
  if (role === "customer") {
    delete jsonData.skills;
    jsonData.latitude = 0;
    jsonData.longitude = 0;
  } else {
    delete jsonData.sidoId;
    delete jsonData.sigunguId;
  }

  console.log(jsonData);

  // JSON 데이터 직렬화 후 FormData에 추가
  formData.append("requestDto", JSON.stringify(jsonData));

  // 파일 데이터 추가
  if (profileImage) {
    formData.append("profileImage", profileImage);
  } else {
    console.warn("profileImage: null");
  }

  // FormData 확인 (디버깅용)
  for (let [key, value] of formData.entries()) {
    console.log(`테스트콘솔 ${key}:`, value);
  }

  try {
    const response = await axiosInstance.post(endPoint, formData);
    console.log("제발 ㅜ", response);
    return response.data;
  } catch (error) {
    console.error("고객 정보 등록 실패:", error);
    throw error;
  }
};

// 로그아웃
export const authLogout = async () => {
  try {
    const response = await axiosInstance.post("/api/users/logout");
    return response.data.code;
  } catch (error) {
    console.error("로그아웃 실패");
  }
};

// 닉네임 중복 확인
export const nicknameCheck = async (nickname) => {
  try {
    const response = await axiosInstance.get(`api/users/nickname/${nickname}/check`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      return false;
    } else {
      console.error("닉네임 중복 체크 실패:", error);
      throw error;
    }
  }
};

// 전화번호 유효성 검사
export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
};
