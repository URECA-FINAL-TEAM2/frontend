//quoteQuery.js
import axiosInstance from "@/api/axiosInstance";

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

const insertQuote = async (quoteData) => {
  console.log(quoteData);
  try {
    const response = await axiosInstance.post(`/quotes`, quoteData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getQuotesAll = async (customerId) => {
  try {
    const response = await axiosInstance.get("/quotes/requests/my/all", {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }

  // return {
  //   quoteRequests: [
  //     {
  //       quoteRequestId: 1,
  //       requestStatus: "요청",
  //       region: "서울특별시 강남구",
  //       beautyDate: "2024-11-19 14:30:00",
  //       dogName: "두부",
  //       dogImage:
  //         "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%B0%98%EB%A0%A4%EA%B2%AC%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%9D%B4%EB%AF%B8%EC%A7%80/eea7a3b9-4604-4ec7-8b16-a4aed6c7c9a4.jpg",
  //       requestContent: "식빵컷",
  //       quotes: [
  //         {
  //           quoteId: 1,
  //           shopName: "댕댕몽",
  //           shopLogo: "https://picsum.photos/50",
  //           groomerName: "수민", //nickname
  //           quoteStatus: "제안",
  //           cost: 60000,
  //           quoteContent: "2.1kg 반려견 기준으로 미용 20,000원...",
  //           createAt: "2024-11-19 14:30:00"
  //         },
  //         {
  //           quoteId: 2,
  //           shopName: "댕몽",
  //           shopLogo: "https://picsum.photos/50",
  //           groomerName: "리우", //nickname
  //           quoteStatus: "마감",
  //           cost: 70000,
  //           quoteContent:
  //             "2.1kg 반려견 기준으로 미용 20,000원, 가위컷 40,000원 책정되었습니다. 소요 시간은 약2시간 입니다.",
  //           createAt: "2024-11-19 14:30:00"
  //         }
  //       ]
  //     },
  //     {
  //       quoteRequestId: 3,
  //       requestStatus: "제안 완료",
  //       region: "서울특별시 강남구",
  //       beautyDate: "2024-11-19 14:30:00",
  //       dogName: "두부",
  //       dogImage:
  //         "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%B0%98%EB%A0%A4%EA%B2%AC%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%9D%B4%EB%AF%B8%EC%A7%80/eea7a3b9-4604-4ec7-8b16-a4aed6c7c9a4.jpg",
  //       requestContent: "식빵컷",
  //       quotes: [
  //         {
  //           quoteId: 33,
  //           shopName: "댕댕몽",
  //           shopLogo: "https://picsum.photos/50",
  //           groomerName: "수민", //nickname
  //           quoteStatus: "마감",
  //           cost: 60000,
  //           quoteContent: "2.1kg 반려견 기준으로 미용 20,000원...",
  //           createAt: "2024-11-19 14:30:00"
  //         },
  //         {
  //           quoteId: 45,
  //           shopName: "댕몽",
  //           shopLogo: "https://picsum.photos/50",
  //           groomerName: "리우", //nickname
  //           quoteStatus: "수락",
  //           cost: 70000,
  //           quoteContent:
  //             "2.1kg 반려견 기준으로 미용 20,000원, 가위컷 40,000원 책정되었습니다. 소요 시간은 약2시간 입니다.",
  //           createAt: "2024-11-19 14:30:00"
  //         }
  //       ]
  //     },
  //     {
  //       quoteRequestId: 5,
  //       requestStatus: "마감",
  //       region: "서울특별시 강남구",
  //       beautyDate: "2024-11-19 14:30:00",
  //       dogName: "두부",
  //       dogImage:
  //         "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%B0%98%EB%A0%A4%EA%B2%AC%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%9D%B4%EB%AF%B8%EC%A7%80/eea7a3b9-4604-4ec7-8b16-a4aed6c7c9a4.jpg",
  //       requestContent: "식빵컷",
  //       quotes: []
  //     }
  //   ]
  // };
};

const getQuotesGroomer = async (customerId) => {
  // 고객 화면
  try {
    const response = await axiosInstance.get("/quotes/requests/my/groomer", {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getCustomerQuoteDetail = async (customerId, quotesId) => {
  try {
    const response = await axiosInstance.get(`/quotes/detail/${quotesId}`, {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
  // return customerQuoteDetail;
};

const getGroomerQuoteDetail = async (groomerId, requestId) => {
  try {
    const response = await axiosInstance.get(`/quotes/groomer/detail/${requestId}/${groomerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }

  // return groomerQuoteDetail;
};

export { getCustomerQuoteDetail, getGroomerQuoteDetail, getQuotesGroomer, insertQuote, getQuotesAll };
