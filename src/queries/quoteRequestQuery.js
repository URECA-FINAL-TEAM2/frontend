const dogList = [
  {
    dogId: 1,
    dogName: "바우",
    profileImage: "https://picsum.photos/200"
  },
  {
    dogId: 2,
    dogName: "초코",
    profileImage: "https://picsum.photos/200"
  },
  {
    dogId: 3,
    dogName: "네모",
    profileImage: "https://picsum.photos/200"
  }
];

const dogInfo = {
  dogId: 1,
  dogBreed: "포메라니안",
  dogName: "두부",
  image: "https://picsum.photos/200",
  dogWeight: "2.1kg",
  dogAge: 5,
  dogGender: "MALE",
  neutering: false,
  experience: false,
  significant: "과하게 용맹해요"
};

const groomerDetail = {
  shopImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
  groomerName: "도리도림",
  shopName: "멍브라운",
  address: "서울특별시 강남구 선릉로 162길",
  phone: "010-2345-6789"
};

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
  requestImages: ["https://blog.kakaocdn.net/dn/bh3xaW/btrd04olbd6/HkQMeUpJsB6D3GcVdXfrc1/img.jpg"]
};

const getDogList = async () => {
  return dogList;
};

const getDogInfo = async (dogId) => {
  return dogInfo;
};

const getGroomerDetail = async (groomerId) => {
  return groomerDetail;
};

const getCustomerRequestDetail = async (requestId) => {
  return customerRequestDetails[requestId];
};

const getGroomerRequestDetail = async (requestId) => {
  // /requests/groomer/detail/{requestId}
  // 빈 body
  return groomerRequestDetail;
};

export { getDogList, getDogInfo, getGroomerDetail, getCustomerRequestDetail, getGroomerRequestDetail };
