const quoteDetail = {
  groomer: {
    shopLogo: "logo.jpg",
    groomerName: "가영",
    shopName: "멍멍댕댕",
    address: "서울시 영등포구 여의대로 1층 140호",
    phone: "010-1234-5678"
  },
  quoteRequest: {
    dogName: "두부",
    dogImage: "pet_image_url.jpg",
    dogWeight: "2.1kg",
    dogAge: 5,
    dogGender: "MALE",
    neutering: false,
    experience: false,
    significant: "과하게 용맹해요",
    requestContent: "목욕+식빵컷 원합니다. 첨부한 사진들처럼 빵실한 느낌을",
    requestImage: ["reference_image_1.jpg", "reference_image_2.jpg"]
  },
  quote: {
    quoteId: 1,
    beautyDate: "2023-11-24 15:00",
    cost: 60000,
    quoteContent: "2.1kg 반려견 기준으로 미용 20,000원, 가위컷 40,000원 책정되었습니다. 4세 소요 시간은 약2시간 입니다."
  }
};

const getQuoteDetail = async (quotesId) => {
  return quoteDetail;
};

export { getQuoteDetail };
