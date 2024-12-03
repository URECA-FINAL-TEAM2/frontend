const customerData = [
  {
    message: "메인페이지 조회 성공",
    data: {
      bestReviews: [
        {
          reviewId: 1,
          shopName: "블레스펫살롱!",
          reviewImage: "/Main/customer.svg",
          content:
            "컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 들고 왈가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에  가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 ",
          starScore: 5.0,
          recommendCount: 5422
        },
        {
          reviewId: 2,
          shopName: "블레스펫살롱",
          reviewImage: "/Main/customer.svg",
          content:
            "컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 들고 왈가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에  가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 ",
          starScore: 2.3,
          recommendCount: 4125
        }
      ],
      localGroomers: [
        {
          groomerId: 1,
          shopId: 1,
          shopLogo: "/Main/customer.svg",
          shopName: "블레스펫살롱",
          starScoreAvg: 4.8,
          reviewCount: 30,
          address: "서울시 영등포구 여의대로 15-1",
          businessTime: "10:00-19:00",
          skills: "소형견, 중형견, 비숑"
        },
        {
          groomerId: 2,
          shopId: 2,
          shopLogo: "/Main/customer.svg",
          shopName: "핏드독",
          starScoreAvg: 4.2,
          reviewCount: 30,
          address: "서울시 영등포구 여의대로 15-1",
          businessTime: "10:00-19:00",
          skills: "소형견, 중형견, 비숑"
        }
      ]
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const groomerData = [
  // example
  {
    code: 200,
    message: "Get MainGroomer Success",
    data: {
      todayReservation: 1,
      totalDirectRequest: 5,
      todayRequest: 2,
      unsentQuote: 3,
      totalRequest: [
        {
          requestId: 7,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-12-03T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요4"
        },
        {
          requestId: 9,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-12-03T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요6"
        },
        {
          requestId: 6,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-11-28T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요3"
        }
      ]
    },
    timestamp: "2024-12-01T22:47:13.625586"
  }
];

export const getCustomerMain = async () => {
  try {
    return customerData;
  } catch (error) {
    throw new Error("Failed to fetch customer main data");
  }
};

export const getGroomerMain = async () => {
  try {
    return groomerData;
  } catch (error) {
    throw new Error("Failed to fetch customer main data");
  }
};
