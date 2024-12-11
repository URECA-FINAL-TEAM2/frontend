const customerQuoteDetail = {
  groomer: {
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/언니네강아지.jpg",
    groomerName: "반장핑",
    shopName: "언니네 강아지",
    address: "부산광역시 해운대구 마린시티3로 456",
    phone: "010-5678-9012"
  },
  quoteRequest: {
    dogName: "비숑이",
    dogImage: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/반려견+프로필+이미지/비숑.jpg",
    dogWeight: "4.0",
    dogAge: "2",
    dogGender: "FEMALE",
    dogBreed: "비숑프리제",
    neutering: false,
    experience: true,
    significant: "털이 잘 엉켜요",
    requestContent: "기본 미용 예약 원해요",
    requestImage: []
  },
  quote: {
    quoteId: 75,
    beautyDate: "2024-02-25T15:00:00",
    cost: 1000,
    quoteContent: "프리미엄 케어"
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
    requestImageUrl: []
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
