const customerQuoteDetail = {
  groomer: {
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/두루몽실.jpg",
    groomerName: "써윤기",
    shopName: "두루몽실",
    address: "서울특별시 강남구 언주로 123",
    phone: "010-4567-8901"
  },
  quoteRequest: {
    dogName: "닥스",
    dogImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/닥스훈트.jpg",
    dogWeight: "5.5",
    dogAge: "1",
    dogGender: "MALE",
    neutering: true,
    experience: false,
    significant: "산책을 좋아해요",
    requestContent: "전체 미용 부탁드립니다",
    dogBreed: "null",
    requestImage: ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"]
  },
  quote: {
    quoteId: 66,
    beautyDate: "2024-02-18T14:00:00",
    cost: 75000,
    quoteContent: "전체 미용 패키지"
  }
};

const groomerQuoteDetail = {
  customer: {
    profileImage:
      "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
    userName: "이도림"
  },
  dog: {
    dogProfileImage: "https://picsum.photos/200",
    dogName: "두부",
    dogBreed: "비숑",
    dogWeight: "5.6",
    dogAge: 2,
    dogGender: "FEMALE",
    neutering: true,
    experience: false,
    significant: "특이사항"
  },
  quote: {
    requestContent: "1:1 미용하고 싶어요1",
    beautyDate: "2024-12-03T15:00:00",
    quoteCost: 150000,
    quoteContent: "공지 미용 설명1",
    requestImageUrl: ["https://picsum.photos/200"]
  }
};

const getCustomerQuoteDetail = async (quotesId) => {
  // TODO GET 연결 : `https://beautymeongdang.com/quotes/detail/${quotesId}?customerId=16`
  return customerQuoteDetail;
};

const getGroomerQuoteDetail = async (requestId) => {
  // TODO GET 연결 : `https://beautymeongdang.com/quotes/groomer/detail?requestId=${requestId}&groomerId=1`
  return groomerQuoteDetail;
};

export { getCustomerQuoteDetail, getGroomerQuoteDetail };
