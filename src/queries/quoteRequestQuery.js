import axiosInstance from "@/api/axiosInstance";

const customerRequestDetails = [
  {
    requestId: 39,
    requestType: "010", // 공고
    region: "서울특별시 강남구",
    groomer: null,
    beautyDate: "2024-02-03T14:00:00",
    requestContent: "기본 미용 예약 문의드려요",
    dogId: 25,
    dogProfileImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/진돗개.jpg",
    dogName: "진도",
    dogBreed: "진돗개",
    dogWeight: "16.0",
    dogAge: 2,
    dogGender: "FEMALE",
    neutering: false,
    experience: true,
    significant: "충성심이 강해요",
    requestImages: [
      "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%B0%98%EB%A0%A4%EA%B2%AC+%ED%94%84%EB%A1%9C%ED%95%84+%EC%9D%B4%EB%AF%B8%EC%A7%80/%EC%A7%84%EB%8F%97%EA%B0%9C.jpg"
    ]
  },
  {
    requestId: 40,
    requestType: "020", // 1:1 요청
    region: null,
    groomer: {
      // 미용사/매장 정보 조회 API와 동일
      shopImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
      groomerName: "도리도림",
      shopName: "멍브라운",
      address: "서울특별시 강남구 선릉로 162길",
      phone: "010-2345-6789"
    },
    beautyDate: "2024-02-03T14:00:00",
    requestContent: "기본 미용 예약 문의드려요",
    dogId: 25,
    dogProfileImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/진돗개.jpg",
    dogName: "진도",
    dogBreed: "진돗개",
    dogWeight: "16.0",
    dogAge: 2,
    dogGender: "FEMALE",
    neutering: false,
    experience: true,
    significant: "충성심이 강해요",
    requestImages: []
  }
];

const groomerRequestDetail = {
  requestId: 1,
  expiryDate: "2024-11-28T15:00:00",
  beautyDate: "2024-12-03T15:00:00",
  requestContent: "1:1 미용하고 싶어요1",
  userProfileImage:
    "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
  userName: "이도림",
  dogId: 1,
  dogProfileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI_EHf6yrhSiMbQrU2FnkrRqtqtz25saAIvZfpZ1PnnFtf9yKre7SJSdXakdMyTlBVU5t25uc0B0VlrvdA6eJQigTcS1BV6uXMbc_MXg",
  dogName: "두부",
  dogBreed: "비숑",
  dogWeight: "5.6",
  dogAge: 2,
  dogGender: "FEMALE",
  neutering: true,
  experience: false,
  significant: "특이사항",
  requestImages: []
};

const getQuotePetList = async (customerId) => {
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

const getGroomerDetail = async (groomerId) => {
  const response = await axiosInstance.get(`/requests/groomer/${groomerId}/shop`);
  return response.data.data;
  // return groomerDetail;
};

const sendCustomerQuote = async (customerId, requestDto, images) => {
  const formData = new FormData();

  // requestDto를 JSON 문자열로 변환하여 추가
  formData.append("requestDto", JSON.stringify(requestDto));

  // 이미지 추가 (여러 이미지인 경우)
  images.forEach((image, index) => {
    formData.append("images", image, `image_${index}.jpg`);
  });

  console.log("form", formData);

  const response = await axiosInstance.post(`/requests/all`, formData, {
    params: { customerId },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response;
};

const sendGroomerQuote = async (customerId, requestDto, images) => {
  const formData = new FormData();

  // requestDto를 JSON 문자열로 변환하여 추가
  formData.append("requestDto", JSON.stringify(requestDto));

  // 이미지 추가 (여러 이미지인 경우)
  images.forEach((image, index) => {
    formData.append("images", image, `image_${index}.jpg`);
  });

  console.log("form", formData);

  const response = await axiosInstance.post(`/requests/groomer`, formData, {
    params: { customerId },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response;
};

const getCustomerRequestDetail = async (requestId) => {
  return customerRequestDetails[requestId];
};

const getGroomerRequestDetail = async (requestId) => {
  // /requests/groomer/detail/{requestId}
  // 빈 body
  return groomerRequestDetail;
};

export {
  getQuotePetList,
  getGroomerDetail,
  getCustomerRequestDetail,
  getGroomerRequestDetail,
  sendCustomerQuote,
  sendGroomerQuote
};
