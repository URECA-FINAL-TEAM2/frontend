import axiosInstance from "@/api/axiosInstance";

const successCustomer = [
  {
    code: 201,
    message: "고객 회원가입 성공",
    data: {
      access_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyIiwibmlja25hbWUiOiLrp57slYTsmqkiLCJyb2xlcyI6IuuvuOyaqeyCrCzqs6DqsJ0iLCJpYXQiOjE3MzI3NTkyNzYsImV4cCI6MTczMjc3NzI3Nn0.oJhW1xC-g0X6HQoKT_KG9wnjuxjP5jpCFMFUyW0H1ek",
      roles: ["customer"],
      nickname: "맞아용",
      userId: 2
    },
    timestamp: "2024-11-28T11:01:16.2661044"
  }
];

// 유저 정보 등록(고객, 미용사)
export const registerUser = async (userData, role) => {
  const endPoint = role === "customer" ? "/api/users/register/customer" : "/api/users/register/groomer";
  const formData = new FormData();

  const { profileImage, ...jsonData } = userData;

  delete jsonData.email;
  if (role === "customer") {
    delete jsonData.skills;
  } else {
    delete jsonData.sido;
    delete jsonData.sigungu;
  }

  // JSON 데이터 직렬화 후 FormData에 추가
  formData.append("requestDTO", JSON.stringify(jsonData));

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
    console.log(endPoint, formData);
    const response = await axiosInstance.post(endPoint, formData);
    return response.data;
    // return successCustomer;
  } catch (error) {
    console.error("고객 정보 등록 실패:", error);
    throw error;
  }
};

// 닉네임 중복 확인
export const nicknameCheck = async (nickname) => {
  try {
    const response = await axiosInstance.get(`api/users/nickname/${nickname}/check`);
    return response.data;
  } catch (error) {
    console.error("닉네임 중복 체크 실패:", error);
    throw error;
  }
};
