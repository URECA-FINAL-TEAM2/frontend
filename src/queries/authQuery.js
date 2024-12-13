import axiosInstance from "@/api/axiosInstance";

export const getUserId = async (role, userId) => {
  const endpoint = role === "customer" ? `/mypage/customer/toggle/${userId}` : `/mypage/groomer/toggle/${userId}`;
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("고객 정보 등록 실패:", error);
    throw error;
  }
};

// 유저 정보 등록(고객, 미용사)
export const registerUser = async (userData, role) => {
  const endPoint = role === "customer" ? "/api/users/register/customer" : "/api/users/register/groomer";
  const formData = new FormData();

  const { profileImage, ...jsonData } = userData;

  delete jsonData.email;
  delete jsonData.username;
  delete jsonData.role;
  delete jsonData.sidoName;
  delete jsonData.sigunguName;
  if (role === "customer") {
    delete jsonData.skill;
  } else {
    delete jsonData.sidoId;
    delete jsonData.sigunguId;
  }

  console.log(jsonData, "보내는 데이터");
  formData.append("requestDto", JSON.stringify(jsonData));
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  try {
    const response = await axiosInstance.post(endPoint, formData);
    return response.data.data;
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

export const handleNicknameCheck = async (nickname, setNickname) => {
  const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9_-]{2,10}$/;

  if (!nickname) {
    return setNickname("required");
  }

  if (!nicknameRegex.test(nickname)) {
    return setNickname("impossible");
  }

  const response = await nicknameCheck(nickname);
  setNickname(response.data ? "possible" : "duplication");
};

export const handlePhoneChange = (e, setFormData, setValidPhone) => {
  const input = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
  let formatted = "";

  if (input.length < 4) {
    formatted = input;
  } else if (input.length < 7) {
    formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
  } else if (input.length < 11) {
    formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6)}`;
  } else {
    formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
  }

  setFormData((prev) => ({ ...prev, phone: formatted }));

  // 유효성 검사 업데이트
  if (!formatted.trim()) {
    setValidPhone("required");
  } else if (validatePhoneNumber(formatted)) {
    setValidPhone("possible");
  } else {
    setValidPhone("impossible");
  }
};
